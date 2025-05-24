// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Hypeswipe is FunctionsClient, Ownable, ReentrancyGuard {
    using FunctionsRequest for FunctionsRequest.Request;

    // ARENA token contract on Avalanche C-chain
    IERC20 public constant ARENA_TOKEN = IERC20(0xB8d7710f7d8349A506b75dD184F05777c82dAd0C);//IERC20(0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846);//
    
    // Entry fee in ARENA tokens
    uint256 public entryFee = 1 * 10**18;
    
    // Chainlink Functions configuration
    bytes32 public donId;
    uint64 public subscriptionId;
    uint32 public gasLimit = 300000;
    
    // Challenge structure
    struct Challenge {
        uint256 id;
        uint256 startTimestamp; // When the challenge was created
        uint256 targetDate; // Unix timestamp
        string[6] spotifyIds; // 6 artist Spotify IDs
        bool isResolved;
        bool[6] outcomes; // True for UP, False for DOWN
        uint256 totalPool; // Total ARENA tokens in prize pool
        uint256 participantCount;
        uint256 perfectPredictionsCount; // Number of users with 6/6 correct predictions
    }
    
    // User prediction structure
    struct Prediction {
        bool[6] predictions; // True for UP, False for DOWN
        bool hasParticipated;
        bool hasClaimed;
        bool isPerfect; // Whether the prediction was perfect (6/6)
    }
    
    // Storage
    mapping(uint256 => Challenge) public challenges;
    mapping(uint256 => mapping(address => Prediction)) public userPredictions; // challengeId => user => prediction
    mapping(uint256 => mapping(uint256 => address)) private participants;
    mapping(bytes32 => uint256) public requestIdToChallenge; // Chainlink request ID to challenge ID
    mapping(address => uint256[]) private userChallenges; // user => array of challenge IDs they participated in
    
    uint256 public nextChallengeId = 1;
    
    // Events
    event ChallengeCreated(uint256 indexed challengeId, uint256 targetDate, string[6] spotifyIds);
    event PredictionMade(uint256 indexed challengeId, address indexed user, bool[6] predictions);
    event ChallengeResolved(uint256 indexed challengeId, bool[6] outcomes, uint256 perfectPredictionsCount);
    event RewardClaimed(uint256 indexed challengeId, address indexed user, uint256 amount);
    event ChainlinkResponse(bytes32 indexed requestId, bytes response, bytes err);
    
    constructor(
        address functionsRouter,
        bytes32 _donId,
        uint64 _subscriptionId
    ) FunctionsClient(functionsRouter) Ownable(msg.sender) {
        donId = _donId;
        subscriptionId = _subscriptionId;
    }
    
    // Admin function to create a new challenge
    function createChallenge(
        uint256 targetDate,
        string[6] memory spotifyIds
    ) external onlyOwner {
        require(targetDate > block.timestamp, "Target date must be in the future");
        
        Challenge storage newChallenge = challenges[nextChallengeId];
        newChallenge.id = nextChallengeId;
        newChallenge.startTimestamp = block.timestamp;
        newChallenge.targetDate = targetDate;
        newChallenge.spotifyIds = spotifyIds;
        newChallenge.isResolved = false;
        newChallenge.totalPool = 0;
        newChallenge.participantCount = 0;
        newChallenge.perfectPredictionsCount = 0;
        
        emit ChallengeCreated(nextChallengeId, targetDate, spotifyIds);
        nextChallengeId++;
    }
    
    // User function to make predictions
    function makePrediction(
        uint256 challengeId,
        bool[6] memory predictions
    ) external nonReentrant {
        Challenge storage challenge = challenges[challengeId];
        require(challenge.id != 0, "Challenge does not exist");
        require(block.timestamp < challenge.targetDate, "Challenge has ended");
        require(!challenge.isResolved, "Challenge already resolved");
        require(!userPredictions[challengeId][msg.sender].hasParticipated, "Already participated");
        
        // Transfer ARENA tokens from user
        require(
            ARENA_TOKEN.transferFrom(msg.sender, address(this), entryFee),
            "Failed to transfer ARENA tokens"
        );
        
        // Store user prediction
        Prediction storage userPrediction = userPredictions[challengeId][msg.sender];
        userPrediction.predictions = predictions;
        userPrediction.hasParticipated = true;
        userPrediction.hasClaimed = false;
        
        // Store participant
        participants[challengeId][challenge.participantCount] = msg.sender;
        
        // Add challenge to user's list
        userChallenges[msg.sender].push(challengeId);
        
        // Update challenge stats
        challenge.totalPool += entryFee;
        challenge.participantCount++;
        
        emit PredictionMade(challengeId, msg.sender, predictions);
    }
    
    // Function to resolve challenge using Chainlink Functions
    function resolveChallenge(uint256 challengeId) external {
        Challenge storage challenge = challenges[challengeId];
        require(challenge.id != 0, "Challenge does not exist");
        require(block.timestamp >= challenge.targetDate, "Challenge has not ended yet");
        require(!challenge.isResolved, "Challenge already resolved");
        
        // Build Chainlink Functions request
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(
            "const response = await Functions.makeHttpRequest({ url: `https://dripit.io/api/hypeswipe/resolve/${args[0]}` }); return Functions.encodeString(response.data);"
        );
        
        // Add challengeId as an argument
        string[] memory args = new string[](1);
        args[0] = uintToString(challengeId);
        req.setArgs(args);
        
        bytes32 requestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donId
        );
        
        requestIdToChallenge[requestId] = challengeId;
    }
    
    // Chainlink Functions callback
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        emit ChainlinkResponse(requestId, response, err);
        
        uint256 challengeId = requestIdToChallenge[requestId];
        require(challengeId != 0, "Invalid request ID");
        
        if (err.length > 0) {
            // TODO: Handle error case (could implement retry logic here)
            return;
        }
        
        // Decode response (expecting string of 0s and 1s)
        string memory responseString = abi.decode(response, (string));
        bool[6] memory outcomes = decodeOutcomes(responseString);
        
        _resolveChallenge(challengeId, outcomes);
    }
    
    // Internal function to resolve challenge and calculate correct counts
    function _resolveChallenge(uint256 challengeId, bool[6] memory outcomes) internal {
        Challenge storage challenge = challenges[challengeId];
        challenge.isResolved = true;
        challenge.outcomes = outcomes;
        
        // Calculate correct counts for all participants
        for (uint256 i = 0; i < challenge.participantCount; i++) {
            address participant = participants[challengeId][i];
            Prediction storage prediction = userPredictions[challengeId][participant];
            
            // Check if prediction is perfect
            bool isPerfect = true;
            for (uint256 j = 0; j < 6; j++) {
                if (prediction.predictions[j] != outcomes[j]) {
                    isPerfect = false;
                    break;
                }
            }
            
            // Update prediction state
            prediction.isPerfect = isPerfect;
            
            // Update challenge state
            if (isPerfect) {
                challenge.perfectPredictionsCount++;
            }
        }
        
        emit ChallengeResolved(challengeId, outcomes, challenge.perfectPredictionsCount);
    }
    
    // Function for users to claim rewards
    function claimReward(uint256 challengeId) external nonReentrant {
        Challenge storage challenge = challenges[challengeId];
        require(challenge.isResolved, "Challenge not resolved yet");
        
        Prediction storage userPrediction = userPredictions[challengeId][msg.sender];
        require(userPrediction.hasParticipated, "Did not participate in challenge");
        require(!userPrediction.hasClaimed, "Already claimed reward");
        require(userPrediction.isPerfect, "Not eligible for reward");
        
        // Calculate reward (equal split among perfect predictions)
        uint256 reward = challenge.totalPool / challenge.perfectPredictionsCount;
        
        userPrediction.hasClaimed = true;
        require(ARENA_TOKEN.transfer(msg.sender, reward), "Failed to transfer reward");
        emit RewardClaimed(challengeId, msg.sender, reward);
    }
    
    // Helper function to decode outcome string to boolean array
    function decodeOutcomes(string memory outcomeString) internal pure returns (bool[6] memory) {
        bytes memory outcomeBytes = bytes(outcomeString);
        require(outcomeBytes.length >= 6, "Invalid outcome string length");
        
        bool[6] memory outcomes;
        for (uint256 i = 0; i < 6; i++) {
            outcomes[i] = outcomeBytes[i] == "1";
        }
        
        return outcomes;
    }
    
    // Helper function to convert uint to string for Chainlink Functions
    function uintToString(uint256 v) internal pure returns (string memory) {
        if (v == 0) {
            return "0";
        }
        uint256 j = v;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        while (v != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(v - v / 10 * 10));
            bytes1 bmem = bytes1(temp);
            bstr[k] = bmem;
            v /= 10;
        }
        return string(bstr);
    }
    
    // Admin functions
    function updateChainlinkConfig(
        bytes32 _donId,
        uint64 _subscriptionId,
        uint32 _gasLimit
    ) external onlyOwner {
        donId = _donId;
        subscriptionId = _subscriptionId;
        gasLimit = _gasLimit;
    }

    function setEntryFee(uint256 _entryFee) external onlyOwner {
        require(_entryFee > 0, "Entry fee must be greater than 0");
        entryFee = _entryFee;
    }
    
    // Emergency function to withdraw tokens (only owner)
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = ARENA_TOKEN.balanceOf(address(this));
        require(ARENA_TOKEN.transfer(owner(), balance), "Failed to withdraw");
    }
    
    // View functions
    function getChallengeDetails(uint256 challengeId) external view returns (
        uint256 id,
        uint256 startTimestamp,
        uint256 targetDate,
        string[6] memory spotifyIds,
        bool isResolved,
        uint256 totalPool,
        uint256 participantCount
    ) {
        Challenge storage challenge = challenges[challengeId];
        return (
            challenge.id,
            challenge.startTimestamp,
            challenge.targetDate,
            challenge.spotifyIds,
            challenge.isResolved,
            challenge.totalPool,
            challenge.participantCount
        );
    }
    
    function getUserPrediction(uint256 challengeId, address user) external view returns (
        bool[6] memory predictions,
        bool hasParticipated,
        bool hasClaimed,
        bool isPerfect
    ) {
        Prediction storage prediction = userPredictions[challengeId][user];
        return (
            prediction.predictions,
            prediction.hasParticipated,
            prediction.hasClaimed,
            prediction.isPerfect
        );
    }
    
    function getChallengeOutcomes(uint256 challengeId) external view returns (bool[6] memory) {
        require(challenges[challengeId].isResolved, "Challenge not resolved");
        return challenges[challengeId].outcomes;
    }
    
    // Function to get all challenge IDs a user has participated in
    function getUserChallenges(address user) external view returns (uint256[] memory) {
        return userChallenges[user];
    }
    
    // Function to get total claimable rewards for a user
    function getTotalClaimableRewards(address user) external view returns (uint256 totalRewards) {
        uint256[] storage userChallengeIds = userChallenges[user];
        
        for (uint256 i = 0; i < userChallengeIds.length; i++) {
            uint256 challengeId = userChallengeIds[i];
            Challenge storage challenge = challenges[challengeId];
            
            // Skip if challenge not resolved or user already claimed
            if (!challenge.isResolved || userPredictions[challengeId][user].hasClaimed) {
                continue;
            }
            
            Prediction storage userPrediction = userPredictions[challengeId][user];
            if (userPrediction.isPerfect) {
                totalRewards += challenge.totalPool / challenge.perfectPredictionsCount;
            }
        }
        
        return totalRewards;
    }
    
    // Function to claim all available rewards for a user
    function claimAllRewards() external nonReentrant returns (uint256 totalClaimed) {
        uint256[] storage userChallengeIds = userChallenges[msg.sender];
        
        for (uint256 i = 0; i < userChallengeIds.length; i++) {
            uint256 challengeId = userChallengeIds[i];
            Challenge storage challenge = challenges[challengeId];
            
            // Skip if challenge not resolved or user already claimed
            if (!challenge.isResolved || userPredictions[challengeId][msg.sender].hasClaimed) {
                continue;
            }
            
            Prediction storage userPrediction = userPredictions[challengeId][msg.sender];
            if (userPrediction.isPerfect) {
                uint256 reward = challenge.totalPool / challenge.perfectPredictionsCount;
                userPrediction.hasClaimed = true;
                require(ARENA_TOKEN.transfer(msg.sender, reward), "Failed to transfer reward");
                totalClaimed += reward;
                emit RewardClaimed(challengeId, msg.sender, reward);
            }
        }
        
        return totalClaimed;
    }
}
export const HYPESWIPE_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "functionsRouter",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_donId",
        type: "bytes32",
      },
      {
        internalType: "uint64",
        name: "_subscriptionId",
        type: "uint64",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "EmptyArgs",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptySource",
    type: "error",
  },
  {
    inputs: [],
    name: "NoInlineSecrets",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyRouterCanFulfill",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "err",
        type: "bytes",
      },
    ],
    name: "ChainlinkResponse",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "targetDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string[6]",
        name: "spotifyIds",
        type: "string[6]",
      },
    ],
    name: "ChallengeCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool[6]",
        name: "outcomes",
        type: "bool[6]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "perfectPredictionsCount",
        type: "uint256",
      },
    ],
    name: "ChallengeResolved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool[6]",
        name: "predictions",
        type: "bool[6]",
      },
    ],
    name: "PredictionMade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "RequestFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "RequestSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardClaimed",
    type: "event",
  },
  {
    inputs: [],
    name: "ARENA_TOKEN",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "challenges",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "targetDate",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isResolved",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "totalPool",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "participantCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "perfectPredictionsCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claimAllRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "totalClaimed",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
    ],
    name: "claimReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "targetDate",
        type: "uint256",
      },
      {
        internalType: "string[6]",
        name: "spotifyIds",
        type: "string[6]",
      },
    ],
    name: "createChallenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "donId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "entryFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gasLimit",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
    ],
    name: "getChallengeDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "targetDate",
        type: "uint256",
      },
      {
        internalType: "string[6]",
        name: "spotifyIds",
        type: "string[6]",
      },
      {
        internalType: "bool",
        name: "isResolved",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "totalPool",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "participantCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
    ],
    name: "getChallengeOutcomes",
    outputs: [
      {
        internalType: "bool[6]",
        name: "",
        type: "bool[6]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getTotalClaimableRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "totalRewards",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUserChallenges",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUserPrediction",
    outputs: [
      {
        internalType: "bool[6]",
        name: "predictions",
        type: "bool[6]",
      },
      {
        internalType: "bool",
        name: "hasParticipated",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "hasClaimed",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isPerfect",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "err",
        type: "bytes",
      },
    ],
    name: "handleOracleFulfillment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        internalType: "bool[6]",
        name: "predictions",
        type: "bool[6]",
      },
    ],
    name: "makePrediction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        internalType: "bool[6]",
        name: "outcomes",
        type: "bool[6]",
      },
    ],
    name: "manualResolveChallenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nextChallengeId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "requestIdToChallenge",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
    ],
    name: "resolveChallenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_entryFee",
        type: "uint256",
      },
    ],
    name: "setEntryFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionId",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_donId",
        type: "bytes32",
      },
      {
        internalType: "uint64",
        name: "_subscriptionId",
        type: "uint64",
      },
      {
        internalType: "uint32",
        name: "_gasLimit",
        type: "uint32",
      },
    ],
    name: "updateChainlinkConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userPredictions",
    outputs: [
      {
        internalType: "bool",
        name: "hasParticipated",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "hasClaimed",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isPerfect",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

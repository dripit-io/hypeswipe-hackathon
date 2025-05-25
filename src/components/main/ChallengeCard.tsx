import React from "react";
import { useGetChallengeDetails } from "@/hooks/useGetChallengeDetails";
import { useGetChallengeOutcomes } from "@/hooks/useGetChallengeOutcomes";
import { useSpotifyArtists } from "@/hooks/useSpotifyArtists";
import { GameCard } from "./GameCard";
import { useGetUserPrediction } from "@/hooks/useGetUserPrediction";

interface ChallengeCardProps {
  challengeId: string;
  hasClaimed: boolean;
  totalClaimableRewards?: string;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challengeId,
  hasClaimed,
  totalClaimableRewards,
}) => {
  const { data: challengeDetails } = useGetChallengeDetails(
    Number(challengeId)
  );
  const { data: outcomes } = useGetChallengeOutcomes();
  const { data: artists } = useSpotifyArtists({
    spotifyIds: challengeDetails?.spotifyIds ?? [],
  });
  const { data: userPrediction } = useGetUserPrediction(
    true,
    Number(challengeId)
  );

  if (!challengeDetails || !artists) return null;

  console.log({ challengeDetails, outcomes });

  const enhancedArtists = artists.map((artist, index) => ({
    ...artist,
    side: userPrediction?.hasParticipated
      ? userPrediction?.predictions?.[index]
        ? "right"
        : "left"
      : "left",
    sideWon: challengeDetails.isResolved
      ? outcomes?.[index]
        ? "right"
        : "left"
      : "left",
  }));

  console.log({ enhancedArtists });

  return (
    <GameCard
      key={challengeId}
      selection={enhancedArtists}
      challenge={challengeDetails}
      hasClaimed={hasClaimed}
      totalClaimableRewards={totalClaimableRewards}
    />
  );
};

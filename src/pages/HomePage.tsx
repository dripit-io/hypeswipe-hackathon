import React from "react";

import { Header, RadialGradient } from "@/components/main";
import {
  ParticipateContainer,
  PendingResultsContainer,
  SwipeContainer,
} from "@/components/containers";
import { useEntryFee, useGetChallenge, useSpotifyArtists } from "@/hooks";
import type { EnhancedArtist } from "@/types";

enum Step {
  Swipe = "swipe",
  Participate = "participate",
  PendingResults = "pending-results",
  Results = "results",
}

const HomePage: React.FC = () => {
  const [step, setStep] = React.useState<Step>(Step.Swipe);
  const [selection, setSelection] = React.useState<EnhancedArtist[]>([]);
  const { data: challengeDetails } = useGetChallenge();
  const { data: artists } = useSpotifyArtists({
    spotifyIds: challengeDetails?.spotifyIds ?? [],
  });
  const { data: entryFee } = useEntryFee();

  React.useEffect(() => {
    console.log({ challengeDetails });
    if (
      typeof challengeDetails?.targetDate === "number" &&
      Date.now() > (challengeDetails?.targetDate ?? 0) * 1000
    ) {
      setStep(Step.PendingResults);
    }
  }, [challengeDetails]);

  return (
    <>
      <RadialGradient />
      <main className="relative container mx-auto flex min-h-[100vh] flex-col">
        <Header battleId={challengeDetails?.id} />
        {step === Step.Swipe && (
          <SwipeContainer
            artists={
              artists?.map((v) => ({
                ...v,
                side: undefined,
                sideWon: undefined,
              })) ?? []
            }
            onComplete={(userSelection) => {
              setSelection([...userSelection]);
              setStep(Step.Participate);
            }}
          />
        )}
        {step === Step.Participate && (
          <ParticipateContainer
            challengeDetails={challengeDetails}
            prediction={selection}
            entryFee={entryFee}
          />
        )}
        {step === Step.PendingResults && (
          <PendingResultsContainer
            challengeDetails={challengeDetails}
            prediction={selection}
          />
        )}
        {/* <ResultsContainer
            challengeDetails={challengeDetails}
          prediction={mockArtists.map((v) => ({
            ...v,
            side: Math.random() > 0.4 ? "left" : "right",
            sideWon: Math.random() > 0.4 ? "left" : "right",
          }))}
        /> */}
      </main>
    </>
  );
};

export default HomePage;

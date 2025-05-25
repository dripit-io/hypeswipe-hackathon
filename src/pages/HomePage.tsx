import React from "react";

import { Header, RadialGradient } from "@/components/main";
import {
  ParticipateContainer,
  PendingResultsContainer,
  ResultsContainer,
  SwipeContainer,
} from "@/components/containers";
import {
  useEntryFee,
  useGetChallenge,
  useGetChallengeOutcomes,
  useGetUserPrediction,
  useSpotifyArtists,
} from "@/hooks";
import type { EnhancedArtist } from "@/types";
import { isEmpty } from "lodash";

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
  const { data: userPrediction } = useGetUserPrediction();
  const { data: challengeOutcomes } = useGetChallengeOutcomes();

  React.useEffect(() => {
    console.log({ challengeDetails });
    if (
      typeof challengeDetails?.targetDate === "number" &&
      Date.now() > (challengeDetails?.targetDate ?? 0) * 1000
    ) {
      if (challengeDetails?.isResolved) {
        setStep(Step.Results);
      } else {
        setStep(Step.PendingResults);
      }
    }
  }, [challengeDetails]);

  React.useEffect(() => {
    console.log({ userPrediction, challengeOutcomes });
    if (userPrediction?.hasParticipated) {
      setStep(Step.PendingResults);
    }
    if (
      !isEmpty(artists) &&
      !isEmpty(userPrediction?.predictions) &&
      !isEmpty(challengeOutcomes)
    ) {
      setSelection(
        artists?.map((a, index) => ({
          ...a,
          side: userPrediction?.predictions[index] ? "right" : "left",
          sideWon: challengeOutcomes?.[index] ? "right" : "left",
        })) ?? []
      );
    } else if (!isEmpty(artists) && !isEmpty(userPrediction?.predictions)) {
      setSelection(
        artists?.map((a, index) => ({
          ...a,
          side: userPrediction?.predictions[index] ? "right" : "left",
          sideWon: undefined,
        })) ?? []
      );
    }
  }, [userPrediction, artists, challengeOutcomes]);

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
            onSuccess={() => {
              setStep(Step.PendingResults);
            }}
          />
        )}
        {step === Step.PendingResults && (
          <PendingResultsContainer
            challengeDetails={challengeDetails}
            prediction={selection}
          />
        )}
        {step === Step.Results && <ResultsContainer prediction={selection} />}
      </main>
    </>
  );
};

export default HomePage;

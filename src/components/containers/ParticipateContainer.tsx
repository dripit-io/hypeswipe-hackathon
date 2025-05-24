import React from "react";

import type { ChallengeDetails, EnhancedArtist } from "@/types";
import { cn } from "@/lib";
import { Button, PrizePool, SelectionList } from "@/components/main";
import { formatUnits } from "viem";
import { ARENA_DECIMALS } from "@/constants";
import { useUserInfo } from "@/components/providers";
import { isEmpty } from "lodash";
import { useMakePrediction } from "@/hooks";

interface ParticipateContainerProps {
  challengeDetails?: ChallengeDetails;
  prediction: EnhancedArtist[];
  entryFee?: bigint;
}

export const ParticipateContainer: React.FC<ParticipateContainerProps> = ({
  challengeDetails,
  prediction,
  entryFee,
}) => {
  const { userInfo } = useUserInfo();
  const makePredictionMutation = useMakePrediction();

  const handleMakePrediction = async () => {
    const result = await makePredictionMutation.mutateAsync({
      challengeId: challengeDetails?.id ?? 0,
      predictions: prediction.map((p) => p.side === "right"),
      entryFee: entryFee ?? BigInt(0),
    });
    console.log({ result });
  };

  return (
    <section className="flex flex-grow flex-col justify-between px-6 pt-0.5 pb-4">
      <h1 className="text-2xl font-medium">
        {!isEmpty(userInfo?.twitterName)
          ? `Great choices, ${userInfo?.twitterName}!`
          : "Great choices!"}
      </h1>
      <h2 className="pb-6 text-[#939196]">Ready to put your tokens on it?</h2>

      <SelectionList selection={prediction} />
      <PrizePool
        amount={formatUnits(
          challengeDetails?.totalPool ?? BigInt(0),
          ARENA_DECIMALS
        )}
      />

      <div className="flex-grow" />

      {/* Participate CTA */}
      <div className="flex flex-col items-center justify-end gap-6 rounded-2xl bg-white/10 p-3 pt-8">
        <p className="text-2xl font-semibold">Join the Hype!</p>
        <div className="flex items-center gap-2">
          <img
            src="/assets/arena-logo.png"
            alt="arena logo"
            className="size-4"
          />
          <p className="text-base font-medium">
            {formatUnits(entryFee as bigint, ARENA_DECIMALS) ?? 0}
          </p>
          <p className="text-base font-medium">$ARENA</p>
        </div>
        <Button
          className={cn(
            "w-full rounded-full bg-[#EA530A] py-6 text-xl text-white shadow-[-8px_8px_20px_0px_rgba(0,0,0,0.20)]"
          )}
          size="lg"
          loading={makePredictionMutation.isPending}
          onClick={handleMakePrediction}>
          Participate
        </Button>
      </div>
    </section>
  );
};

import React from "react";

import type { ChallengeDetails, EnhancedArtist } from "@/types";
import { CountdownCircle, PrizePool, SelectionList } from "@/components/main";
import { formatUnits } from "viem";
import { ARENA_DECIMALS } from "@/constants";
import { isEmpty } from "lodash";

interface PendingResultsContainerProps {
  challengeDetails?: ChallengeDetails;
  prediction: EnhancedArtist[];
}

export const PendingResultsContainer: React.FC<
  PendingResultsContainerProps
> = ({ challengeDetails, prediction }) => {
  const startDate = (challengeDetails?.startTimestamp ?? 0) * 1000;
  const endDate = (challengeDetails?.targetDate ?? 0) * 1000;

  return (
    <section className="flex flex-grow flex-col justify-between px-6 pt-0.5 pb-4">
      <div className="flex flex-col items-center text-center">
        <p className="mb-2 text-xl font-bold text-[#76E6A0]">Results</p>
        <p className="text-slate-500">will be anounced in:</p>
        <CountdownCircle
          className="mt-4"
          startDate={startDate}
          endDate={endDate}
        />
      </div>

      {!isEmpty(prediction) && <div className="flex-grow" />}

      {/* prize pool */}
      <PrizePool
        amount={formatUnits(
          challengeDetails?.totalPool ?? BigInt(0),
          ARENA_DECIMALS
        )}
      />

      {/* prediction grid */}
      {!isEmpty(prediction) && (
        <>
          <SelectionList selection={prediction} />
          <p className="mb-2">My Selections:</p>
        </>
      )}

      {isEmpty(prediction) && <div className="flex-grow" />}
    </section>
  );
};

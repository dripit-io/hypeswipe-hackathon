import React from "react";

import type { EnhancedArtist } from "@/types";
import { CountdownCircle, PrizePool, SelectionList } from "@/components/main";

interface PendingResultsContainerProps {
  prediction: EnhancedArtist[];
}

export const PendingResultsContainer: React.FC<
  PendingResultsContainerProps
> = ({ prediction }) => {
  return (
    <section className="pt-0.5 px-6 flex flex-col justify-between flex-grow pb-4">
      <div className="text-center flex flex-col items-center">
        <p className="text-[#76E6A0] text-xl font-bold mb-2">Results</p>
        <p className="text-slate-500">will be anounced in:</p>
        <CountdownCircle
          className="mt-4"
          startDate={
            Date.now() - 2 * 60 * 60 * 1000 - 5 * 60 * 1000 - 27 * 1000
          }
          endDate={Date.now() + 2 * 60 * 60 * 1000 + 5 * 60 * 1000 + 27 * 1000}
        />
      </div>

      <div className="flex-grow" />

      {/* prize pool */}
      <PrizePool amount={5000} />

      {/* prediction grid */}
      <p className="mb-2">My Selections:</p>
      <SelectionList selection={prediction} />
    </section>
  );
};

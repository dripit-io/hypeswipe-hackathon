import React from "react";

import type { EnhancedArtist } from "@/types";
import { PrizePool, SelectionList } from "@/components/main";

interface PendingResultsContainerProps {
  prediction: EnhancedArtist[];
}

export const PendingResultsContainer: React.FC<
  PendingResultsContainerProps
> = ({ prediction }) => {
  return (
    <section className="pt-0.5 px-6 flex flex-col justify-between flex-grow pb-4">
      <div className="flex-grow" />

      {/* prize pool */}
      <PrizePool amount={5000} />

      {/* prediction grid */}
      <p className="mb-2">My Selections:</p>
      <SelectionList selection={prediction} />
    </section>
  );
};

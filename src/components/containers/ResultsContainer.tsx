import React from "react";

import BadgeStarIcon from "@/assets/badge-star.svg?react";
import StarMedalIcon from "@/assets/star-medal.svg?react";
import type { EnhancedArtist } from "@/types";
import {
  Button,
  ClaimRewardDialog,
  PrizePool,
  SelectionList,
} from "@/components/main";
import { cn } from "@/lib";

const userName = "Johanna";

interface ResultsContainerProps {
  prediction: EnhancedArtist[];
}

export const ResultsContainer: React.FC<ResultsContainerProps> = ({
  prediction,
}) => {
  const sidesWon = React.useMemo(
    () =>
      prediction.reduce(
        (total, artist) => total + (artist.sideWon === artist.side ? 1 : 0),
        0
      ),
    [prediction]
  );

  return (
    <section className="pt-0.5 px-6 flex flex-col justify-between flex-grow pb-4">
      <div className="flex flex-col justify-center items-center text-center">
        {sidesWon === prediction.length && <StarMedalIcon />}
        {sidesWon !== 0 && sidesWon !== prediction.length && <BadgeStarIcon />}
        <p className="text-[#76E6A0] text-xl font-bold my-3">
          {sidesWon === 0 ? (
            <>Didn't hit this time {userName}</>
          ) : (
            <>
              <span>Congratulations</span>
              <br />
              <span>{userName}!</span>
            </>
          )}
        </p>
        <p>
          You scored{" "}
          <span className="font-bold">
            {sidesWon}/{prediction.length}
          </span>{" "}
          correct answers.
        </p>
        {sidesWon === 0 && (
          <p className="mt-5">
            Not in the prizes this time, but there's always the next game.
          </p>
        )}
      </div>

      {/* prize pool */}
      {sidesWon === 0 ? (
        <div className="h-[1px] w-full my-4 bg-[#203F3B]" />
      ) : (
        <PrizePool amount={5000} won />
      )}

      <p className="mb-2">My Selections:</p>
      <SelectionList selection={prediction} />
      {sidesWon === 0 ? (
        <Button
          size="lg"
          className={cn(
            "w-full text-xl py-6 rounded-full cursor-pointer",
            "bg-transparent border border-[#76E6A0] text-[#76E6A0]",
            "hover:bg-transparent hover:border-[#5cad7b] hover:text-[#5cad7b]"
          )}
        >
          Try Again
        </Button>
      ) : (
        <Button
          size="lg"
          className={cn(
            "w-full text-xl py-6 rounded-full cursor-pointer",
            "text-black bg-[#76E6A0] hover:bg-[#5cad7b]"
          )}
        >
          Claim Winnings
        </Button>
      )}
      <ClaimRewardDialog
        isOpen={false}
        onOpenChange={() => {
          console.log({ mstatus: "should close dialog" });
        }}
        rewardAmount="500"
        status="idle"
      />
    </section>
  );
};

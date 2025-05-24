import React from "react";

import BadgeStarIcon from "@/assets/badge-star.svg?react";
import StarMedalIcon from "@/assets/star-medal.svg?react";
import type { ChallengeDetails, EnhancedArtist } from "@/types";
import {
  Button,
  ClaimRewardDialog,
  PrizePool,
  SelectionList,
} from "@/components/main";
import { cn } from "@/lib";
import { ARENA_DECIMALS } from "@/constants";
import { formatUnits } from "viem";

const userName = "Johanna";

interface ResultsContainerProps {
  challengeDetails?: ChallengeDetails;
  prediction: EnhancedArtist[];
}

export const ResultsContainer: React.FC<ResultsContainerProps> = ({
  challengeDetails,
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
    <section className="flex flex-grow flex-col justify-between px-6 pt-0.5 pb-4">
      <div className="flex flex-col items-center justify-center text-center">
        {sidesWon === prediction.length && <StarMedalIcon />}
        {sidesWon !== 0 && sidesWon !== prediction.length && <BadgeStarIcon />}
        <p className="my-3 text-xl font-bold text-[#76E6A0]">
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
        <div className="my-4 h-[1px] w-full bg-[#203F3B]" />
      ) : (
        <PrizePool
          amount={formatUnits(
            challengeDetails?.totalPool ?? BigInt(0),
            ARENA_DECIMALS
          )}
          won
        />
      )}

      <p className="mb-2">My Selections:</p>
      <SelectionList selection={prediction} />
      {sidesWon === 0 ? (
        <Button
          size="lg"
          className={cn(
            "w-full cursor-pointer rounded-full py-6 text-xl",
            "border border-[#76E6A0] bg-transparent text-[#76E6A0]",
            "hover:border-[#5cad7b] hover:bg-transparent hover:text-[#5cad7b]"
          )}>
          Try Again
        </Button>
      ) : (
        <Button
          size="lg"
          className={cn(
            "w-full cursor-pointer rounded-full py-6 text-xl",
            "bg-[#76E6A0] text-black hover:bg-[#5cad7b]"
          )}>
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

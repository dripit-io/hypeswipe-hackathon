import React from "react";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

import BadgeStarIcon from "@/assets/badge-star.svg?react";
import type { EnhancedArtist } from "@/types";
import {
  Button,
  ClaimRewardDialog,
  PrizePool,
  SelectionList,
} from "@/components/main";
import { cn, formatBalance } from "@/lib";
import { useUserInfo } from "@/components/providers";
import { useClaimAllRewards, useGetClaims } from "@/hooks";

interface ResultsContainerProps {
  prediction: EnhancedArtist[];
  hasClaimed: boolean;
}

export const ResultsContainer: React.FC<ResultsContainerProps> = ({
  prediction,
  hasClaimed,
}) => {
  const navigate = useNavigate();
  const [openClaimAllDialog, setOpenClaimAllDialog] = React.useState(false);
  const { userInfo } = useUserInfo();
  const sidesWon = React.useMemo(
    () =>
      prediction.reduce(
        (total, artist) => total + (artist.sideWon === artist.side ? 1 : 0),
        0
      ),
    [prediction]
  );
  const hasWon = React.useMemo(
    () => !isEmpty(prediction) && sidesWon === prediction.length,
    [sidesWon, prediction]
  );
  const claimAllMutation = useClaimAllRewards();
  const { data: totalClaimableRewards } = useGetClaims();
  const [claimAmount, setClaimAmount] = React.useState("0");

  React.useEffect(() => {
    if (Number(totalClaimableRewards ?? 0) > 0) {
      setClaimAmount(formatBalance(Number(totalClaimableRewards ?? 0)));
    }
  }, [totalClaimableRewards]);

  return (
    <section className="flex flex-grow flex-col justify-between px-6 pt-0.5 pb-4">
      <div className="flex flex-col items-center justify-center text-center">
        {/* {sidesWon === prediction.length && <StarMedalIcon />} */}
        {hasWon && <BadgeStarIcon />}
        <p className="my-3 text-xl font-bold text-[#76E6A0]">
          {!hasWon ? (
            <>
              Didn't hit this time
              {!isEmpty(userInfo?.twitterName)
                ? ` ${userInfo?.twitterName}`
                : ""}
            </>
          ) : (
            <>
              <span>Congratulations</span>
              {!isEmpty(userInfo?.twitterName) && (
                <>
                  <br />
                  <span>{userInfo?.twitterName}!</span>
                </>
              )}
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
        {!hasWon && (
          <p className="mt-5">
            Not in the prizes this time, but there's always the next game.
          </p>
        )}
      </div>

      {/* prize pool */}
      {!hasWon ? (
        <div className="my-4 h-[1px] w-full bg-[#203F3B]" />
      ) : (
        <PrizePool amount={claimAmount} won />
      )}

      <p className="mb-2">My Selections:</p>
      <SelectionList selection={prediction} />
      {!hasWon && (
        <Button
          size="lg"
          className={cn(
            "w-full cursor-pointer rounded-full py-6 text-xl",
            "border border-[#76E6A0] bg-transparent text-[#76E6A0]",
            "hover:border-[#5cad7b] hover:bg-transparent hover:text-[#5cad7b]"
          )}
          onClick={() => navigate("/profile")}>
          Try Again
        </Button>
      )}

      {hasWon && (
        <Button
          size="lg"
          className={cn(
            "w-full cursor-pointer rounded-full py-6 text-xl",
            "bg-[#76E6A0] text-black hover:bg-[#5cad7b]"
          )}
          loading={claimAllMutation.isPending}
          disabled={hasClaimed || claimAllMutation.isSuccess}
          onClick={() => {
            setOpenClaimAllDialog(true);
            claimAllMutation.mutate();
          }}>
          Claim Winnings
        </Button>
      )}
      <ClaimRewardDialog
        isOpen={openClaimAllDialog}
        onOpenChange={setOpenClaimAllDialog}
        rewardAmount={claimAmount}
        status={claimAllMutation.status}
      />
    </section>
  );
};

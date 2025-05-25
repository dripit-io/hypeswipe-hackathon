import React from "react";

import { cn, formatBalance } from "@/lib";
import { Button, type ButtonProps, ClaimRewardDialog } from "@/components/main";
import { useClaimAllRewards, useGetUserPrediction } from "@/hooks";

interface ClaimButtonProps extends ButtonProps {
  className?: string;
  children?: React.ReactNode;
  totalClaimableRewards?: string;
  hasClaimed?: boolean;
}

export const ClaimButton: React.FC<ClaimButtonProps> = ({
  className,
  children,
  totalClaimableRewards,
  hasClaimed,
  ...props
}) => {
  const [openClaimAllDialog, setOpenClaimAllDialog] = React.useState(false);
  const [claimAmount, setClaimAmount] = React.useState("0");
  const claimAllMutation = useClaimAllRewards();
  const { refetch: refetchUserPrediction } = useGetUserPrediction(false);

  React.useEffect(() => {
    if (Number(totalClaimableRewards ?? 0) > 0) {
      setClaimAmount(formatBalance(Number(totalClaimableRewards ?? 0)));
    }
  }, [totalClaimableRewards]);

  React.useEffect(() => {
    if (claimAllMutation.isSuccess) {
      refetchUserPrediction();
    }
  }, [claimAllMutation.isSuccess, refetchUserPrediction]);

  return (
    <>
      <Button
        size="lg"
        className={cn(
          "w-full cursor-pointer rounded-full py-6 text-xl",
          "bg-[#76E6A0] text-black hover:bg-[#5cad7b]",
          className
        )}
        loading={claimAllMutation.isPending}
        disabled={hasClaimed || claimAllMutation.isSuccess}
        onClick={() => {
          setOpenClaimAllDialog(true);
          claimAllMutation.mutate();
        }}
        {...props}>
        {children ?? "Claim Winnings"}
      </Button>
      <ClaimRewardDialog
        isOpen={openClaimAllDialog}
        onOpenChange={setOpenClaimAllDialog}
        rewardAmount={claimAmount}
        status={"success"}
      />
    </>
  );
};

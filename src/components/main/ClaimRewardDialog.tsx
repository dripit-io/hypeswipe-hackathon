import React from "react";
import type { MutationStatus } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui";
import TrophyTeal from "@/assets/trophy-teal.png";
import TrophyRed from "@/assets/trophy-red.png";
import ConfettiIcon from "@/assets/confetti-1-teal.svg?react";
import { cn } from "@/lib";
import { useNavigate } from "react-router-dom";

interface ClaimRewardDialogProps {
  isOpen: boolean;
  rewardAmount: string;
  status: MutationStatus;
  onOpenChange: (value: boolean) => void;
}

export const ClaimRewardDialog: React.FC<ClaimRewardDialogProps> = ({
  isOpen,
  rewardAmount,
  status,
  onOpenChange,
}) => {
  const navigate = useNavigate();

  const getContent = () => {
    let title: React.ReactNode = (
      <span className="flex items-center gap-3">
        <span className="text-lg text-[#76E6A0]">Reward:</span>
        <span className="flex items-end gap-2">
          <span className="text-2xl font-bold">{rewardAmount}</span>
          <span className="text-lg">$ARENA</span>
        </span>
      </span>
    );
    let description: string | null =
      `${rewardAmount} $ARENA has been added to your wallet. Ready for the next game?`;

    if (["pending", "idle"].includes(status)) {
      title = "Claiming...";
      description = null;
    } else if (status === "error") {
      title = "Claim Unsuccessful";
      description = `Unfortunately, we encountered an issue processing your claim. Please visit our Discord support channel for assistance.`;
    }

    return { title, description };
  };

  const animationClass = "transition-all duration-500";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(newOpen: boolean) => {
        if (!newOpen && ["pending", "idle"].includes(status)) return;
        onOpenChange(newOpen);
      }}>
      <DialogOverlay className="opacity-10" />
      <DialogContent
        className={cn(
          animationClass,
          "min-h-0 w-11/12 overflow-hidden rounded-2xl p-6 pb-8 sm:w-10/12 md:max-w-[440px]",
          "border-[#76E6A0] bg-[#76E6A0]/10 text-white backdrop-blur-lg outline-none",
          {
            "min-h-[340px]": status !== "error",
            "border-red-400 bg-red-400/15": status === "error",
          }
        )}
        hideCloseButton={["pending", "idle"].includes(status)}>
        {/* a11y */}
        <DialogTitle className="hidden">{getContent().title}</DialogTitle>
        <div className="flex flex-col items-center justify-center gap-6">
          <img
            src={status === "error" ? TrophyRed : TrophyTeal}
            alt="claim type"
            className="size-32"
          />
          <p
            className={cn(
              animationClass,
              "text-2xl font-semibold text-[#76E6A0]",
              { "text-red-400": status === "error" }
            )}>
            {getContent().title}
          </p>
          {getContent().description && (
            <p
              className={cn(
                animationClass,
                "text-center text-sm font-normal text-teal-50",
                { "text-red-100": status === "error" }
              )}>
              {getContent().description}
            </p>
          )}
          {status === "success" && (
            <Button
              className={cn(
                "w-full rounded-full bg-[#76E6A0] py-6 text-lg text-black hover:bg-teal-700"
              )}
              onClick={() => {
                navigate("/profile");
                onOpenChange(false);
              }}>
              <span>Play again!</span>
            </Button>
          )}
          {status === "error" && (
            <Button
              className="w-full rounded-full bg-red-500 py-6 text-lg text-white hover:bg-red-600"
              onClick={() => onOpenChange(false)}>
              <span>Try again later</span>
            </Button>
          )}
          {["pending", "idle"].includes(status) && (
            <LoaderCircleIcon
              className={cn("size-10 animate-spin text-teal-300/70")}
            />
          )}
        </div>
        <div className={cn("absolute top-0 left-0 z-[-1] h-full w-full")}>
          <ConfettiIcon
            className={cn(
              animationClass,
              "absolute top-1/2 left-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2",
              "opacity-50 transition-all duration-150",
              { "opacity-0": status === "error" }
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

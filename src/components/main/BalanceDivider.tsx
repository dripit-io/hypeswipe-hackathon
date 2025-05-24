import React from "react";
import { TrophyIcon } from "lucide-react";

interface BalanceDividerProps {
  arenaBalance: string;
  claimAmount: string;
}

export const BalanceDivider: React.FC<BalanceDividerProps> = ({
  arenaBalance,
  claimAmount,
}) => (
  <div className="flex w-full flex-col items-center">
    <div className="flex w-full items-center gap-2">
      <div className="h-[1px] flex-grow bg-[#203F3B]" />
      <div className="flex justify-center gap-2">
        <p className="flex items-center gap-1.5 rounded-lg bg-white px-2 py-1 text-sm text-black">
          <img
            src="/assets/arena-logo.png"
            alt="arena logo"
            className="size-4"
          />
          <span className="pt-0.5 text-base leading-normal font-bold text-[#0F0915]">
            {arenaBalance}
          </span>
          <span className="pt-0.5 text-sm leading-normal font-medium text-[#0F0915]">
            $ARENA
          </span>
        </p>
        {Number(claimAmount) > 0 && (
          <div className="flex items-center gap-1.5 rounded-lg bg-white/12 px-2 py-1 text-sm text-white">
            <TrophyIcon className="size-3 text-white" />
            <p className="text-base leading-normal font-bold text-white">
              {claimAmount}
            </p>
          </div>
        )}
      </div>
      <div className="h-[1px] flex-grow bg-[#203F3B]" />
    </div>
  </div>
);

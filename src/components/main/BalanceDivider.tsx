import React from "react";
import { TrophyIcon } from "lucide-react";

interface BalanceDividerProps {
  arenaBalance: number;
  claimAmount: number;
}

export const BalanceDivider: React.FC<BalanceDividerProps> = ({
  arenaBalance,
  claimAmount,
}) => (
  <div className="flex flex-col items-center w-full">
    <div className="flex items-center w-full gap-2">
      <div className="h-[1px] flex-grow bg-[#203F3B]" />
      <div className="flex justify-center gap-2">
        <p className="text-sm px-2 py-1 flex gap-1.5 items-center rounded-lg bg-white text-black">
          <img
            src="/assets/arena-logo.png"
            alt="arena logo"
            className="size-4"
          />
          <span className="text-[#0F0915] text-base font-bold leading-normal">
            {arenaBalance}
          </span>
          <span className="text-[#0F0915] text-sm font-medium leading-normal">
            $ARENA
          </span>
        </p>
        {claimAmount > 0 && (
          <p className="text-sm px-2 py-1 flex gap-1.5 items-center rounded-lg bg-white/12 text-white">
            <TrophyIcon className="size-3 text-white" />
            <p className="text-white text-base font-bold leading-normal">
              {claimAmount}
            </p>
          </p>
        )}
      </div>
      <div className="h-[1px] flex-grow bg-[#203F3B]" />
    </div>
  </div>
);

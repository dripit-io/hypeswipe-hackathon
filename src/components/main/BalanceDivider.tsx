import React from "react";
import { TrophyIcon } from "lucide-react";

const arenaBalance = 200;
const claimAmount = 50.57;

export const BalanceDivider: React.FC = () => (
  <div className="flex flex-col items-center w-full px-4">
    <div className="flex items-center w-full gap-2">
      <div className="h-[1px] flex-grow bg-[#203F3B]" />
      <div className="flex justify-center gap-2">
        <p className="text-sm px-2 py-1 flex gap-1.5 items-center rounded-lg bg-white text-black">
          <img
            src="/assets/arena-logo.png"
            alt="arena logo"
            className="size-4"
          />
          <p className="text-[#0F0915] font-['TT_Fors_Trial'] text-base font-bold leading-normal">{arenaBalance}</p>
          <span className="text-[#0F0915] font-['TT_Fors_Trial'] text-sm font-medium leading-normal">$ARENA</span>
        </p>
        {claimAmount > 0 && (
          <p className="text-sm px-2 py-1 flex gap-1.5 items-center rounded-lg bg-white/12 text-white">
            <TrophyIcon className="size-3 text-white" />
            <p className="text-white font-['TT_Fors_Trial'] text-base font-bold leading-normal">{claimAmount}</p>
          </p>
        )}
      </div>
      <div className="h-[1px] flex-grow bg-[#203F3B]" />
    </div>
  </div>
);
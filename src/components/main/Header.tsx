import React from "react";
import { TrophyIcon } from "lucide-react";

const arenaBalance = 200;
const claimAmount = 50.57;

export const Header: React.FC = () => {
  return (
    <nav className="w-full h-24 p-6 pb-4 flex justify-between items-center">
      <p className="flex-grow overflow-hidden truncate text-lg font-bold">
        Battle #1
      </p>
      <div className="flex gap-2 items-center justify-end">
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-1.5 justify-end">
            <img
              src="/assets/arena-logo.png"
              alt="arena logo"
              className="size-4"
            />
            <p className="text-xs">{arenaBalance}</p>
          </div>
          <div className="flex gap-1 justify-end items-center text-slate-500/80">
            <p className="text-[10px] font-semibold">{claimAmount}</p>
            <TrophyIcon className="size-3" />
          </div>
        </div>
        <div className="rounded-full size-12 bg-slate-600/20"></div>
      </div>
    </nav>
  );
};

import React from "react";

import type { EnhancedArtist } from "@/types";
import { cn } from "@/lib";
import { CheckIcon, XIcon } from "lucide-react";

interface GameCardProps {
  selection: EnhancedArtist[];
}

export const GameCard: React.FC<GameCardProps> = ({ selection }) => {

  return (
    <div className="w-full rounded-xl bg-white/[0.07] p-3">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <p className="text-white font-bold">Game #{1}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">500 $ARENA</span>
          <img
            src="/assets/arena-logo.png"
            alt="arena logo"
            className="size-4"
          />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-1">
        {selection.map((artist) => (
          <div key={artist.id} className="flex flex-col items-center gap-1">
            <div className="aspect-square w-full rounded-lg bg-slate-800 overflow-hidden relative">
              <img
                src={artist.image}
                alt={artist.name}
                className={cn("w-full h-full object-cover", {
                  "grayscale": artist.sideWon !== artist.side
                })}
              />
              {artist.sideWon !== artist.side && (
                <div className="absolute top-0 left-0 z-10 w-full h-full bg-[#0F0915]/65" />
              )}
            </div>
            <div
              className={cn(
                "shadow-[-4px_4px_8px_0px_#00000040] size-5",
                "rounded-full text-black flex justify-center items-center",
                "-mt-3 z-10",
                {
                  "bg-green-400": artist.sideWon === artist.side,
                  "bg-orange-600": artist.sideWon !== artist.side,
                }
              )}
            >
              {artist.sideWon === artist.side ? (
                <CheckIcon className="size-3" />
              ) : (
                <XIcon className="size-3" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

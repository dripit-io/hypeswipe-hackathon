import React from "react";

import type { EnhancedArtist, ChallengeDetails } from "@/types";
import { cn } from "@/lib";
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/main";
import { formatUnits } from "viem";
interface GameCardProps {
  selection: EnhancedArtist[];
  challenge: ChallengeDetails;
}

export const GameCard: React.FC<GameCardProps> = ({ selection, challenge }) => {
  const sidesWon = React.useMemo(
    () =>
      selection.reduce(
        (total, artist) => total + (artist.sideWon === artist.side ? 1 : 0),
        0
      ),
    [selection]
  );

  const hasWinnings = sidesWon > 0;

  return (
    <div className="w-full rounded-xl bg-white/[0.07] p-3">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="font-bold text-white">Game #{challenge.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white">
            {formatUnits(challenge.totalPool, 18)}
          </span>
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
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-800">
              <img
                src={artist.images[0].url}
                alt={artist.name}
                className={cn("h-full w-full object-cover", {
                  grayscale: artist.sideWon !== artist.side,
                })}
              />
              {artist.sideWon !== artist.side && (
                <div className="absolute top-0 left-0 z-10 h-full w-full bg-[#0F0915]/65" />
              )}
            </div>
            <div
              className={cn(
                "size-5 shadow-[-4px_4px_8px_0px_#00000040]",
                "flex items-center justify-center rounded-full text-black",
                "z-10 -mt-3",
                {
                  "bg-green-400": artist.sideWon === artist.side,
                  "bg-orange-600": artist.sideWon !== artist.side,
                }
              )}>
              {artist.sideWon === artist.side ? (
                <CheckIcon className="size-3" />
              ) : (
                <XIcon className="size-3" />
              )}
            </div>
          </div>
        ))}
      </div>
      {hasWinnings && (
        <Button className="mt-4 h-8 w-full bg-[#76E6A0] shadow-[-8px_8px_20px_0px_rgba(0,0,0,0.20)]">
          Claim Winnings!
        </Button>
      )}
    </div>
  );
};

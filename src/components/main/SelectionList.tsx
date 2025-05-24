import React from "react";

import type { EnhancedArtist } from "@/types";
import { cn } from "@/lib";
import { CheckIcon, XIcon } from "lucide-react";

interface SelectionListProps {
  selection: EnhancedArtist[];
}

export const SelectionList: React.FC<SelectionListProps> = ({ selection }) => (
  <div className="grid gap-3 grid-cols-3">
    {selection.map((artist) => (
      <div className="relative">
        {artist.sideWon !== undefined && (
          <div
            className={cn(
              "shadow-[-4px_4px_8px_0px_#00000040] size-5",
              "rounded-full text-black flex justify-center items-center",
              "absolute -top-1 -right-1 z-20",
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
        )}
        <div
          key={artist.id}
          className="aspect-[107/160] rounded-xl bg-slate-800 overflow-hidden relative"
        >
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full pb-3 px-2 z-20">
            <p className="text-sm font-bold truncate">{artist.name}</p>
            <p className="flex justify-between items-center">
              <span className="text-xs">
                {artist.side === "left" ? "Fall" : "Rise"}
              </span>
              <span
                className={cn("size-2 rounded-full", {
                  "bg-orange-600": artist.side === "left",
                  "bg-green-400": artist.side === "right",
                })}
              />
            </p>
          </div>
          <div
            className={cn(
              "absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#0F0915] to-transparent",
              { "opacity-0": artist.sideWon !== artist.side }
            )}
          />
          {artist.sideWon !== artist.side && (
            <div className="absolute top-0 left-0 z-10 w-full h-full bg-[#0F0915]/65" />
          )}
        </div>
      </div>
    ))}
  </div>
);

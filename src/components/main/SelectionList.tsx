import React from "react";

import type { EnhancedArtist } from "@/types";
import { cn } from "@/lib";
import { CheckIcon, XIcon } from "lucide-react";
import { isNil } from "lodash";

interface SelectionListProps {
  selection: EnhancedArtist[];
}

export const SelectionList: React.FC<SelectionListProps> = ({ selection }) => (
  <div className="grid grid-cols-3 gap-3">
    {selection.map((artist) => (
      <div key={artist.id} className="relative">
        {!isNil(artist.sideWon) && (
          <div
            className={cn(
              "size-5 shadow-[-4px_4px_8px_0px_#00000040]",
              "flex items-center justify-center rounded-full text-black",
              "absolute -top-1 -right-1 z-20",
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
        )}
        <div
          key={artist.id}
          className="relative aspect-[107/160] overflow-hidden rounded-xl bg-slate-800">
          <img
            src={artist.images?.[0]?.url}
            alt={artist.name}
            className={cn("h-full w-full object-cover", {
              grayscale:
                !isNil(artist.sideWon) && artist.sideWon !== artist.side,
            })}
          />
          <div className="absolute bottom-0 left-0 z-20 w-full px-2 pb-3">
            <p className="truncate text-sm font-bold">{artist.name}</p>
            <p className="flex items-center justify-between">
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
              "absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-[#0F0915] to-transparent",
              {
                "opacity-0":
                  !isNil(artist.sideWon) && artist.sideWon !== artist.side,
              }
            )}
          />
          {!isNil(artist.sideWon) && artist.sideWon !== artist.side && (
            <div className="absolute top-0 left-0 z-10 h-full w-full bg-[#0F0915]/65" />
          )}
        </div>
      </div>
    ))}
  </div>
);

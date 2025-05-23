import React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { mockArtists } from "@/constants";
import { SwipeCardList } from "@/components/main";
import { cn } from "@/lib";
import type { Artist } from "@/types";

interface EnhancedArtist extends Artist {
  side?: "left" | "right";
}

export const SwipeContainer: React.FC = () => {
  const [enhancedArtists, setEnhancedArtists] = React.useState<
    EnhancedArtist[]
  >(mockArtists as EnhancedArtist[]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleSwipe = (artist: Artist, isRight: boolean) => {
    setEnhancedArtists((pv) =>
      pv.map((v) =>
        v.id === artist.id ? { ...v, side: isRight ? "right" : "left" } : v
      )
    );
    setCurrentIndex((pv) => pv + 1);
  };

  return (
    <section className="pt-0.5 flex-grow flex flex-col justify-between">
      <div className="flex justify-center items-center gap-2">
        {Array.from({ length: enhancedArtists.length }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "opacity-100 transition-all duration-150 ease-in-out",
              { "opacity-0": currentIndex >= enhancedArtists.length }
            )}
          >
            <p
              className={cn(
                "text-sm text-center mb-4 opacity-0",
                "transition-all duration-150 ease-in-out",
                { "opacity-100": currentIndex === index }
              )}
            >
              {index + 1}
            </p>
            <div
              className={cn(
                "w-10 h-1 rounded-lg bg-slate-500",
                "transition-all duration-150 ease-in-out",
                { "bg-green-400": currentIndex === index }
              )}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex-grow relative">
        <SwipeCardList
          className="mt-10"
          artists={mockArtists}
          onSwipe={handleSwipe}
        />
        <div className="flex justify-center absolute bottom-[16px] left-1/2 -translate-x-1/2 z-20">
          {[ArrowDownIcon, ArrowUpIcon].map((Icon, index) => (
            <div
              key={index}
              className="size-[72px] flex justify-center items-center rounded-full bg-[#0E1E1B]"
            >
              <div className="size-[54px] bg-white/10 rounded-full flex justify-center items-center">
                <Icon
                  className={cn("size-8", {
                    "text-orange-600": index === 0,
                    "text-green-400": index === 1,
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row-reverse justify-center items-center gap-2 p-2">
        {enhancedArtists.map((artist) => (
          <div
            key={artist.id}
            className="flex flex-col items-center justify-center gap-2"
          >
            <div
              className={cn(
                "size-2 rounded-full",
                "transition-all duration-150 ease-in-out",
                {
                  "bg-green-400": artist?.side === "right",
                  "bg-orange-600": artist?.side === "left",
                }
              )}
            />
            <div
              className={cn(
                "size-12 rounded-lg overflow-hidden",
                "transition-all duration-150 ease-in-out",
                { "opacity-30": artist?.side === undefined }
              )}
            >
              <img
                className="object-cover size-full"
                src={artist.image}
                alt={artist.name}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

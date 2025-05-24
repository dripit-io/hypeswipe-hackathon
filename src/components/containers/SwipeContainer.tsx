import React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useMotionValue, animate } from "framer-motion";

import type { Artist, EnhancedArtist } from "@/types";
import { SwipeCard } from "@/components/main";
import { cn } from "@/lib";
import { isEmpty } from "lodash";

interface SwipeContainerProps {
  artists: Artist[];
  onComplete?: (userSelection: EnhancedArtist[]) => void;
}

export const SwipeContainer: React.FC<SwipeContainerProps> = ({
  artists,
  onComplete,
}) => {
  const [swipeCards, setSwipeCards] = React.useState(artists);
  const [enhancedArtists, setEnhancedArtists] = React.useState<
    EnhancedArtist[]
  >([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [swipingCardId, setSwipingCardId] = React.useState<Artist["id"] | null>(
    null
  );
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  React.useEffect(() => {
    if (!isEmpty(artists)) {
      const enhanced = artists.map((a) => ({
        ...a,
        side: undefined,
        sideWon: undefined,
      }));
      setEnhancedArtists([...enhanced]);
      setSwipeCards(artists);
    }
  }, [artists]);

  const handleSwipe = (artist: Artist, isRight: boolean) => {
    const newEnhancedArtists = enhancedArtists.map((v) =>
      v.id === artist.id ? { ...v, side: isRight ? "right" : "left" } : v
    ) as EnhancedArtist[];

    setEnhancedArtists([...newEnhancedArtists]);
    const isLastCard = swipeCards.length === 1;
    console.log({
      artist,
      isRight,
      newEnhancedArtists,
      swipeCards,
      currentIndex,
    });
    setCurrentIndex((pv) => pv + 1);
    setSwipeCards((pv) => pv.filter((v) => v.id !== artist.id));
    if (isLastCard) {
      onComplete?.(newEnhancedArtists);
    }
  };

  const handleButtonSwipe = async (artist: Artist, isRight: boolean) => {
    setSwipingCardId(artist.id);
    await Promise.all([
      animate(x, isRight ? 300 : -300, {
        duration: 0.275,
        ease: "easeOut",
      }),
      animate(y, -125, {
        duration: 0.275,
        ease: "easeOut",
      }),
    ]);
    handleSwipe(artist, isRight);
    x.set(0);
    y.set(0);
    setSwipingCardId(null);
  };

  return (
    <section className="flex flex-grow flex-col justify-between pt-0.5">
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: enhancedArtists.length }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "opacity-100 transition-all duration-150 ease-in-out",
              { "opacity-0": currentIndex >= enhancedArtists.length }
            )}>
            <p
              className={cn(
                "mb-1 text-center text-sm opacity-0",
                "transition-all duration-150 ease-in-out",
                { "opacity-100": currentIndex === index }
              )}>
              {index + 1}
            </p>
            <div
              className={cn(
                "h-1 w-10 rounded-lg bg-slate-500",
                "transition-all duration-150 ease-in-out",
                { "bg-green-400": currentIndex === index }
              )}></div>
          </div>
        ))}
      </div>
      <div className="relative flex-grow">
        <div className={cn("grid w-full place-items-center", "mt-10")}>
          {swipeCards.map((card, index) => (
            <SwipeCard
              key={card.id}
              isFirst={index === swipeCards.length - 1}
              isSecond={index === swipeCards.length - 2}
              onSwipe={(isRight) => handleSwipe(card, isRight)}
              x={card.id === swipingCardId ? x : undefined}
              y={card.id === swipingCardId ? y : undefined}
              {...card}
            />
          ))}
        </div>
        <div className="absolute bottom-[16px] left-1/2 z-20 flex -translate-x-1/2 justify-center">
          {[ArrowDownIcon, ArrowUpIcon].map((Icon, index) => (
            <button
              key={index}
              className="flex size-[72px] items-center justify-center rounded-full bg-[#1B2426]"
              onClick={() =>
                handleButtonSwipe(
                  swipeCards[swipeCards.length - 1],
                  index === 1
                )
              }>
              <div className="flex size-[54px] items-center justify-center rounded-full bg-white/10">
                <Icon
                  className={cn("size-8", {
                    "text-orange-600": index === 0,
                    "text-green-400": index === 1,
                  })}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-row-reverse items-center justify-center gap-2 p-2">
        {enhancedArtists.map((artist) => (
          <div
            key={artist.id}
            className="flex flex-col items-center justify-center gap-2">
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
                "size-12 overflow-hidden rounded-lg",
                "transition-all duration-150 ease-in-out",
                { "opacity-30": artist?.side === undefined }
              )}>
              <img
                className={cn("size-full object-cover", {
                  grayscale: artist?.side === undefined,
                })}
                src={artist.images?.[0]?.url}
                alt={artist.name}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

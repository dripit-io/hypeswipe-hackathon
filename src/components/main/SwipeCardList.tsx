import React from "react";

import type { Artist } from "@/types";
import { cn } from "@/lib";
import { SwipeCard } from "./SwipeCard";

interface SwipeCardListProps {
  className?: string;
  artists: Artist[];
  onSwipe?: (artist: Artist, isRight: boolean) => void;
}

export const SwipeCardList: React.FC<SwipeCardListProps> = ({
  className,
  artists,
  onSwipe,
}) => {
  const [cards, setCards] = React.useState(artists);

  const handleSwipe = (artist: Artist, isRight: boolean) => {
    onSwipe?.(artist, isRight);
    setCards((pv) => pv.filter((v) => v.id !== artist.id));
  };

  return (
    <div className={cn("grid w-full place-items-center", className)}>
      {cards.map((card, index) => (
        <SwipeCard
          key={card.id}
          isFirst={index === cards.length - 1}
          isSecond={index === cards.length - 2}
          onSwipe={(isRight) => handleSwipe(card, isRight)}
          {...card}
        />
      ))}
    </div>
  );
};

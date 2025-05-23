import React from "react";

import type { Artist } from "@/types";
import { SwipeCard } from "./SwipeCard";

interface SwipeCardListProps {
  artists: Artist[];
}

export const SwipeCardList: React.FC<SwipeCardListProps> = ({ artists }) => {
  const [cards, setCards] = React.useState(artists);

  const handleSwipe = (artist: Artist, isRight: boolean) => {
    console.log({ name: artist.name, isRight });
    setCards((pv) => pv.filter((v) => v.id !== artist.id));
  };

  return (
    <div className="grid w-full mt-10 place-items-center">
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

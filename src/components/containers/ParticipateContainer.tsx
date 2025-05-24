import React from "react";

import type { EnhancedArtist } from "@/types";
import { cn } from "@/lib";
import { Button, PrizePool, SelectionList } from "@/components/main";

const userName = "Johanna";
const betAmount = 100;

interface ParticipateContainerProps {
  prediction: EnhancedArtist[];
}

export const ParticipateContainer: React.FC<ParticipateContainerProps> = ({
  prediction,
}) => {
  return (
    <section className="pt-0.5 px-6 flex flex-col justify-between flex-grow pb-4">
      <h1 className="text-2xl font-bold">Great choices, {userName}!</h1>
      <h2 className="text-slate-500">Ready to put your tokens on it?</h2>

      <SelectionList selection={prediction} />
      <PrizePool amount={5000} />

      <div className="flex-grow" />

      {/* Participate CTA */}
      <div className="flex flex-col justify-end items-center gap-6 p-3 pt-8 bg-white/10 rounded-2xl">
        <p className="text-2xl font-bold">Join the Hype!</p>
        <div className="flex gap-2 items-center">
          <img
            src="/assets/arena-logo.png"
            alt="arena logo"
            className="size-4"
          />
          <p>{betAmount}</p>
          <p>$ARENA</p>
        </div>
        <Button
          className={cn(
            "w-full text-xl py-6 text-white bg-[#EA530A] rounded-4xl"
          )}
          size="lg"
        >
          Participate
        </Button>
      </div>
    </section>
  );
};

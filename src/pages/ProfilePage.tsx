import React from "react";

import {
  Header,
  RadialGradient,
  BalanceDivider,
  GameCard,
  ConnectButton,
} from "@/components/main";
import { mockArtists } from "@/constants";
import type { EnhancedArtist } from "@/types";

const userName = "Johanna Quinn";
const userAddress = "arena.social/johanna_quinn";
const winPercentage = 75;

// Mock game history data
const mockGameHistory: EnhancedArtist[][] = [
  mockArtists.map((artist) => ({
    ...artist,
    side: Math.random() > 0.5 ? "left" : "right",
    sideWon: Math.random() > 0.5 ? "left" : "right",
  })),
  mockArtists.map((artist) => ({
    ...artist,
    side: Math.random() > 0.5 ? "left" : "right",
    sideWon: Math.random() > 0.5 ? "left" : "right",
  })),
  mockArtists.map((artist) => ({
    ...artist,
    side: Math.random() > 0.5 ? "left" : "right",
    sideWon: Math.random() > 0.5 ? "left" : "right",
  })),
];

const ProfilePage: React.FC = () => {
  return (
    <>
      <RadialGradient />
      <main className="relative container mx-auto flex h-full flex-col gap-8">
        <Header variant="sub" />
        <div className="flex w-full flex-col items-center justify-center gap-2 px-6">
          <div className="relative">
            <div className="size-32 rounded-full bg-slate-600/20"></div>
            <div className="absolute -top-0 -right-0 flex size-10 flex-col items-center justify-center rounded-full bg-white shadow-[-4px_4px_8px_0px_rgba(0,0,0,0.25)]">
              <p className="text-xs font-bold text-black">{winPercentage}%</p>
              <p className="text-[8px] text-[#0F0915]">wins</p>
            </div>
          </div>
          <div className="mb-8 flex flex-col gap-[2px]">
            <h1 className="mt-4 text-center text-2xl leading-normal font-medium text-[#76E6A0]">
              {userName}
            </h1>
            <p className="text-center text-base leading-normal font-normal text-[#939196]">
              {userAddress}
            </p>
          </div>
          <BalanceDivider arenaBalance={200} claimAmount={50.57} />
        </div>
        <div className="flex w-full flex-col items-start justify-center gap-4 px-6 pb-8">
          <p className="text-base font-medium">My previous games:</p>
          <div className="flex w-full flex-col gap-4">
            {mockGameHistory.map((game, index) => (
              <GameCard key={index} selection={game} />
            ))}
          </div>
        </div>
        <div className="mb-6 flex justify-center px-4">
          <ConnectButton />
        </div>
      </main>
    </>
  );
};

export default ProfilePage;

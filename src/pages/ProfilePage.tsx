import React from "react";

import { Header, RadialGradient, BalanceDivider, GameCard } from "@/components/main";
import { mockArtists } from "@/constants";
import type { EnhancedArtist } from "@/types";

const userName = "Johanna Quinn";
const userAddress = "arena.social/johanna_quinn";
const winPercentage = 75;

// Mock game history data
const mockGameHistory: EnhancedArtist[][] = [
  mockArtists.map(artist => ({
    ...artist,
    side: Math.random() > 0.5 ? "left" : "right",
    sideWon: Math.random() > 0.5 ? "left" : "right"
  })),
  mockArtists.map(artist => ({
    ...artist,
    side: Math.random() > 0.5 ? "left" : "right",
    sideWon: Math.random() > 0.5 ? "left" : "right"
  })),
  mockArtists.map(artist => ({
    ...artist,
    side: Math.random() > 0.5 ? "left" : "right",
    sideWon: Math.random() > 0.5 ? "left" : "right"
  }))
];

const ProfilePage: React.FC = () => {
  return (
    <>
      <RadialGradient />
      <main className="container mx-auto relative flex flex-col h-full gap-8">
        <Header />
        <div className="flex flex-col items-center gap-2 justify-center w-full px-6">
          <div className="relative">
            <div className="rounded-full size-32 bg-slate-600/20"></div>
            <div className="absolute -top-0 -right-0 rounded-full size-10 bg-white flex flex-col items-center justify-center shadow-[-4px_4px_8px_0px_rgba(0,0,0,0.25)]">
              <p className="text-black text-xs font-bold">{winPercentage}%</p>
              <p className="text-[#0F0915] text-[8px]">wins</p>
            </div>
          </div>
          <div className="flex flex-col gap-[2px] mb-8">
            <h1 className="text-[#76E6A0] text-center text-2xl font-medium leading-normal mt-4">
              {userName}
            </h1>
            <p className="text-[#939196] text-center text-base font-normal leading-normal">
              {userAddress}
            </p>
          </div>
          <BalanceDivider arenaBalance={200} claimAmount={50.57} />
        </div>
        <div className="flex flex-col items-start gap-4 justify-center w-full px-6 pb-8">
          <p className="text-base font-medium">My previous games:</p>
          <div className="flex flex-col gap-4 w-full">
            {mockGameHistory.map((game, index) => (
              <GameCard key={index} selection={game} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;

import React from "react";

import { Header, RadialGradient, BalanceDivider } from "@/components/main";


const ProfilePage: React.FC = () => {
  return (
    <>
      <RadialGradient />
      <main className="container mx-auto relative flex flex-col h-full">
        <Header />
        <div className="flex flex-col items-center gap-2 justify-center w-full">
          <div className="relative">
            <div className="rounded-full size-32 bg-slate-600/20"></div>
            <div className="absolute -top-0 -right-0 rounded-full size-10 bg-white flex flex-col items-center justify-center shadow-[-4px_4px_8px_0px_rgba(0,0,0,0.25)]">
              <p className="text-black font-['TT_Fors_Trial'] text-xs font-bold text-center">75%</p>
              <p className="text-[#0F0915] font-['TT_Fors_Trial'] text-[8px] text-center">wins</p>
            </div>
          </div>
          <div className="flex flex-col gap-[2px] mb-8">
            <h1 className="text-[#76E6A0] text-center font-['TT_Fors_Trial'] text-2xl font-medium leading-normal mt-4">Johanna Quinn</h1>
            <p className="text-[#939196] text-center font-['TT_Fors_Trial'] text-base font-normal leading-normal">arena.social/johanna_quinn</p>
          </div>
          <BalanceDivider />
        </div>
      </main>
    </>
  );
};

export default ProfilePage;

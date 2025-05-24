import React from "react";

import { Header, RadialGradient } from "@/components/main";
import { ParticipateContainer, SwipeContainer } from "@/components/containers";
import { mockArtists } from "@/constants";

const HomePage: React.FC = () => {
  return (
    <>
      <RadialGradient />
      <main className="container mx-auto relative flex flex-col h-full">
        <Header />
        <SwipeContainer />
        {/* <ParticipateContainer prediction={mockArtists.map((v) => ({
          ...v,
          side: "left",
        }))} /> */}
      </main>
    </>
  );
};

export default HomePage;

import React from "react";

import { Header, RadialGradient, SwipeContainer } from "@/components/main";

const HomePage: React.FC = () => {
  return (
    <>
      <RadialGradient />
      <main className="container mx-auto relative flex flex-col h-full">
        <Header />
        <SwipeContainer />
      </main>
    </>
  );
};

export default HomePage;

import React from "react";

import { RadialGradient, SwipeCardList } from "@/components/main";
import { mockArtists } from "@/constants";

const HomePage: React.FC = () => {
  return (
    <>
      <RadialGradient />
      <main className="container mx-auto relative py-8">
        <section>
          <SwipeCardList artists={mockArtists} />
        </section>
      </main>
    </>
  );
};

export default HomePage;

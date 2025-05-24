import React from "react";

import { Header, RadialGradient } from "@/components/main";

const ProfilePage: React.FC = () => {
  return (
    <>
      <RadialGradient />
      <main className="container mx-auto relative flex flex-col h-full">
        <Header />
        <section className="px-6">Profile page</section>
      </main>
    </>
  );
};

export default ProfilePage;

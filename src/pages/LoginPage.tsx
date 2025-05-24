import React from "react";

import LoginImage from "@/assets/login-image.png";
import { ConnectButton } from "@/components/main";
import { cn } from "@/lib";

const LoginPage: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-end">
      <div className="fixed h-full w-full">
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(15, 9, 21, 0.00) 0%, #0F0915 60.56%)",
          }}
        />
        <div className="flex items-center justify-center">
          <img src={LoginImage} alt="Login" />
        </div>
      </div>
      <div
        className="pointer-events-none fixed bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: "921px",
          height: "431px",
          borderRadius: "921px",
          background: "rgba(0, 183, 79, 0.12)",
          filter: "blur(95px)",
        }}
      />
      <div
        className={cn(
          "z-10 flex w-full flex-col items-stretch gap-4 px-10 pb-8 text-center"
        )}>
        <h1 className="text-[40px]" style={{ fontFamily: "Glazio" }}>
          HypeSwipe
        </h1>
        <p className="w-full text-center text-[26px] text-white">
          Which artists will climb the ranks and who will fall today?
        </p>
        <ConnectButton className="mt-12" />
      </div>
    </div>
  );
};

export default LoginPage;

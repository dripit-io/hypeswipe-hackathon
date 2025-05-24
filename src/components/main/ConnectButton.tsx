import { ConnectButton as ConnectButtonRainbow } from "@rainbow-me/rainbowkit";

import { Button } from "@/components/ui";
import { cn } from "@/lib";

interface ConnectButtonProps {
  className?: string;
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({ className }) => {
  return (
    <ConnectButtonRainbow.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}>
            {(() => {
              if (!connected) {
                return (
                  <Button
                    className={cn(
                      "h-[60px] w-full rounded-full text-xl font-medium",
                      "bg-[#CDFFE3] shadow-[-8px_8px_20px_0px_rgba(0,0,0,0.20)]",
                      className
                    )}
                    onClick={openConnectModal}>
                    Login
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button className="!font-sans" onClick={openChainModal}>
                    Wrong Chain
                  </Button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <Button onClick={openAccountModal}>
                    {account.displayName}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButtonRainbow.Custom>
  );
};

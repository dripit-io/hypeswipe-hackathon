import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { avalanche } from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@rainbow-me/rainbowkit/styles.css";

import { routes } from "@/routes";
import { queryClient } from "@/lib/api-client";
import { UserInfoProvider } from "@/components/providers";

const router = createBrowserRouter(routes);

const wagmiConfig = getDefaultConfig({
  appName: "hypeswipe",
  projectId: import.meta.env.VITE_REOWN_PROJECT_ID ?? "",
  chains: [avalanche],
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider>
          <UserInfoProvider>
            <RouterProvider router={router} />
          </UserInfoProvider>
          {import.meta.env.VITE_HIDE_QUERY_TOOLS !== "true" && (
            <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="bottom-right"
            />
          )}
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export default App;

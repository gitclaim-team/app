"use client";

import { ReactNode } from "react";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  sepolia,
  optimismSepolia,
} from "wagmi/chains";

import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "GitClaim",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet, polygon, optimism, arbitrum, sepolia, optimismSepolia],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [sepolia.id]: http(),
    [optimismSepolia.id]: http(),
  },
  ssr: true,
});

export default function RainbowKitProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={{
            lightMode: lightTheme(),
            darkMode: darkTheme(),
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

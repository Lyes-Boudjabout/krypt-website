"use client"

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, anvil, zksync, sepolia } from "wagmi/chains";
import { useState } from "react";

export default function Providers({ children }: Readonly<{children: React.ReactNode}>) {
    const [queryClient] = useState(new QueryClient());
    const config = getDefaultConfig({
        appName: 'krypt-mastery',
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
        chains: [mainnet, polygon, optimism, arbitrum, base, anvil, zksync, sepolia],
        ssr: false,
    });

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
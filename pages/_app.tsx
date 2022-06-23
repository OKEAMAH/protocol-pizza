import "../styles/globals.css";
import "../styles/prism.css";
import "katex/dist/katex.min.css";

import type { AppProps } from "next/app";
import Script from "next/script";
import "@rainbow-me/rainbowkit/styles.css";

import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiProvider } from "wagmi";
import Head from "next/head";

const { chains, provider } = configureChains(
  [chain.kovan, chain.polygon],
  [apiProvider.fallback()]
);

const { connectors } = getDefaultWallets({
  appName: "RWTP",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
        <Head>
          <title>Protocol Pizza</title>
        </Head>
        <Script
          src="https://cdn.usefathom.com/script.js"
          data-site="IAVMINES"
          defer
        />
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default MyApp;

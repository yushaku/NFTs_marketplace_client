import { createConfig, http } from 'wagmi'
import { bscTestnet, goerli, mainnet, polygonMumbai } from 'wagmi/chains'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  ssr: true,
  chains: [mainnet, bscTestnet, goerli, polygonMumbai],
  connectors: [
    // walletConnect({ projectId: env.VITE_WALLET_CONNECT_ID }),
  ],
  transports: {
    [polygonMumbai.id]: http(),
    [bscTestnet.id]: http(),
    [mainnet.id]: http(),
    [goerli.id]: http()
  }
})

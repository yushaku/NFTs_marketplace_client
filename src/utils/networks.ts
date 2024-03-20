import { http, createConfig } from 'wagmi'
import { mainnet, goerli, sepolia, bscTestnet } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  chains: [mainnet, goerli, sepolia, bscTestnet],
  connectors: [
    // walletConnect({ projectId: env.VITE_WALLET_CONNECT_ID }),
    metaMask()
  ],
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http(),
    [sepolia.id]: http(),
    [bscTestnet.id]: http()
  }
})

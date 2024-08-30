import { createConfig, http } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  ssr: true,
  chains: [bscTestnet, bsc],
  connectors: [
    // walletConnect({ projectId: env.VITE_WALLET_CONNECT_ID }),
  ],
  transports: {
    [bscTestnet.id]: http(),
    [bsc.id]: http()
  }
})

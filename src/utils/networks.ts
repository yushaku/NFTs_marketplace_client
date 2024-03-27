import { env } from '.'
import { createConfig, http } from 'wagmi'
import { bscTestnet, goerli, mainnet, sepolia } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  ssr: true,
  chains: [mainnet, goerli, sepolia, bscTestnet],
  connectors: [
    // walletConnect({ projectId: env.VITE_WALLET_CONNECT_ID }),
  ],
  transports: {
    [bscTestnet.id]: http('https://bsc-testnet.publicnode.com'),
    [mainnet.id]: http(),
    [goerli.id]: http(),
    [sepolia.id]: http()
  }
})

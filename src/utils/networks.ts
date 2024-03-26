import { http, createConfig } from 'wagmi'
import { mainnet, goerli, sepolia, bscTestnet } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'
import { env } from '.'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  ssr: true,
  chains: [mainnet, goerli, sepolia, bscTestnet],
  connectors: [walletConnect({ projectId: env.VITE_WALLET_CONNECT_ID })],
  transports: {
    [bscTestnet.id]: http('https://bsc-testnet.publicnode.com'),
    [mainnet.id]: http(),
    [goerli.id]: http(),
    [sepolia.id]: http()
  }
})

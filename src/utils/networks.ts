import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, goerli } from 'wagmi/chains'
import { walletConnect, metaMask } from 'wagmi/connectors'
import { env } from './constant'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  chains: [mainnet, goerli, sepolia],
  connectors: [
    walletConnect({ projectId: env.VITE_WALLET_CONNECT_ID }),
    metaMask()
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [goerli.id]: http()
  }
})

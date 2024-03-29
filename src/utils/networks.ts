import { createConfig, http } from 'wagmi'
import { goerli, mainnet, polygonMumbai, sepolia } from 'wagmi/chains'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  ssr: true,
  chains: [mainnet, goerli, polygonMumbai],
  connectors: [
    // walletConnect({ projectId: env.VITE_WALLET_CONNECT_ID }),
  ],
  transports: {
    [polygonMumbai.id]: http(),
    [mainnet.id]: http(),
    [goerli.id]: http(),
    [sepolia.id]: http()
  }
})

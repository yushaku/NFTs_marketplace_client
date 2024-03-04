import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, goerli } from 'wagmi/chains'

declare module 'wagmi' { 
  interface Register { 
    config: typeof config 
  } 
} 

export const config = createConfig({
  chains: [mainnet, goerli, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [goerli.id]: http(),
  },
})

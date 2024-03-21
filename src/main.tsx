import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import App from './App.tsx'
import './styles/index.css'
import { config, connectModalStyle, env } from './utils'
import { ThirdwebProvider } from '@thirdweb-dev/react'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider customTheme={connectModalStyle}>
          <ThirdwebProvider
            activeChain="binance-testnet"
            clientId={env.VITE_THIRD_WEB}
          >
            <App />
          </ThirdwebProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
)

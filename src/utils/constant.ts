import { AVAX, BSC, BTC, ETH } from '@/components/icons'
import { cleanEnv, str } from 'envalid'
import { parseUnits } from 'viem'

export const env = cleanEnv(import.meta.env, {
  VITE_WALLET_CONNECT_ID: str(),
  VITE_INFURA_KEY: str(),
  VITE_THIRD_WEB: str(),
  VITE_THIRD_WEB_SECRET: str(),
  VITE_OWNER_ADDRESS: str(),
  VITE_GRAPHQL_CMS_ENDPOINT: str(),
  VITE_GRAPHQL_CMS_TOKEN: str(),
  VITE_PINATA_KEY: str(),
  VITE_PINATA_SECRET: str()
})

export const routes = {
  home: '/',
  trade: '/trade',
  nfts: '/nfts',
  myNFTs: '/nfts/my-collection',
  nftStudio: '/nfts/studio',
  nftLaunchpad: '/nfts/launchpad',
  vaults: '/vaults',
  history: '/history',
  bridge: '/bridge',
  dashboard: '/dashboard',
  shop: '/shop',
  admin: '/admin'
} as const

export const GATEWAY_URL = 'https://ipfs.io/ipfs/'
export const TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'
export const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
export const JSON_RPC_URL = 'https://cloudflare-eth.com'
export const JSON_RPC = {
  1: [`https://mainnet.infura.io/v3/${env.VITE_INFURA_KEY}`],
  5: [`https://goerli.infura.io/v3/${env.VITE_INFURA_KEY}`]
}

export const YSK_ADDRESS = '0x7AFa15757A8012C3ECc0948154AD0f99c3b3c116'
export const USDT_ADDRESS = '0x7AFa15757A8012C3ECc0948154AD0f99c3b3c116'
export const NFT_ADRESS = '0x14a9c99d89106F66C2B86910d2C622Ce0A58C630'
export const STAKE_ADRESS = '0xb407fFcC4D82295790D684F812d97EFdbB6c3122'
export const MARKETPLACE_ADDRESS = '0x7175AAA9f0b6B05fe713AEFDD7B0026e61bd7aC5'
export const NFT_FACTORY_ADDRESS = '0x64FFE32eCb2D433fc0868920c98Bf33Bee4f072A'
export const PUBLIC_NFTS_ADDRESS = '0x284C5d066a4A2fD0163D190887fC5EFB6b4E0540'

export const MAX_VALUE = parseUnits('9999999999999999999999', 18)

export const TOKENS = [
  {
    tradingview: 'BTCUSD',
    icon: BTC,
    name: 'BTC',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
  },
  {
    tradingview: 'ETHUSD',
    icon: ETH,
    name: 'ETH',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
  },
  {
    tradingview: 'BNBUSD',
    icon: BSC,
    name: 'BNB',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
  },
  {
    tradingview: 'AVAXUSD',
    icon: AVAX,
    name: 'AVAX',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
  }
]
export type TokenOption = (typeof TOKENS)[number]

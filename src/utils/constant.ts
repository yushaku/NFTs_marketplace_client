import { cleanEnv, str } from 'envalid'

export const env = cleanEnv(import.meta.env, {
  VITE_WALLET_CONNECT_ID: str()
})

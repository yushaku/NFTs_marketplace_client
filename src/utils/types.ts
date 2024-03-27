import { Log } from 'viem'

export type Data = {
  address: string
}

export type Address = `0x${string}`

export type LogTX = Log & { args: any }

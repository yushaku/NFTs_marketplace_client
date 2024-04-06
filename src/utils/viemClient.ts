import { createPublicClient, createWalletClient, http } from 'viem'
import { bscTestnet } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

export const walletClient = createWalletClient({
  chain: bscTestnet,
  transport: http()
})
  .extend(walletActionsL1())
  .extend(publicActionsL2())

export const publicClient = createPublicClient({
  transport: http('https://data-seed-prebsc-1-s1.bnbchain.org:8545')
})

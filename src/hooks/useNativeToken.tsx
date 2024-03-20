import { BSC } from '@/components/icons/BSC'
import { Ethereum } from '@/components/icons/Ethereum'
import { useChainId } from 'wagmi'

export const useNativeToken = () => {
  const chainId = useChainId()

  switch (chainId) {
    case 1:
    case 5:
    case 11155111:
      return Ethereum

    case 97:
      return BSC
  }

  return Ethereum
}

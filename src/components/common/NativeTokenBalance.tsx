import { BSC } from '@/components/icons/BSC'
import { Ethereum } from '@/components/icons/Ethereum'
import { Address } from 'viem'
import { useBalance, useChainId } from 'wagmi'

export const NativeBalance = ({ address }: { address?: Address }) => {
  const chainId = useChainId()
  const balance = useBalance({ address })
  let Token: (props: React.SVGProps<SVGSVGElement>) => JSX.Element

  switch (chainId) {
    case 1:
    case 5:
    case 11155111:
      Token = Ethereum
      break

    case 97:
      Token = BSC
      break

    default:
      Token = Ethereum
      break
  }

  return (
    <div className="font-bold">
      {balance.data?.formatted.slice(0, 5)}
      <Token className="size-5 inline-block ml-3" />
    </div>
  )
}

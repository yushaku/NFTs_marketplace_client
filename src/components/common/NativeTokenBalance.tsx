import { Address } from 'viem'
import { useBalance, useChainId } from 'wagmi'
import { Ethereum, Matic } from '../icons'

export const NativeBalance = ({ address }: { address?: Address }) => {
  const chainId = useChainId()
  const balance = useBalance({ address })
  let Token: (props: React.SVGProps<SVGSVGElement>) => JSX.Element

  switch (chainId) {
    case 1:
    case 5:
      Token = Ethereum
      break

    case 80001:
      Token = Matic
      break

    default:
      Token = Ethereum
      break
  }

  return (
    <div className="font-bold">
      {balance.data?.formatted.slice(0, 5)}
      <Token className="ml-3 inline-block size-5" />
    </div>
  )
}

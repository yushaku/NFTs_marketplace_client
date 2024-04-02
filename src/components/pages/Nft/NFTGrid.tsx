import type { NFT as NFTType } from '@thirdweb-dev/sdk'
import NFT from './Nft'
import { NFT_ADRESS } from '@/utils'
import { Link } from 'react-router-dom'
import { DotLoader } from '@/components/common/Loading'

type Props = {
  isLoading: boolean
  data: NFTType[] | undefined
  overrideOnclickBehavior?: (nft: NFTType) => void
  emptyText?: string
}

export default function NFTGrid({
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = 'No NFTs found'
}: Props) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {isLoading ? (
        [...Array(20)].map((_, index) => <DotLoader key={index} />)
      ) : data && data.length > 0 ? (
        data.map((nft) =>
          !overrideOnclickBehavior ? (
            <Link
              to={`/token/${NFT_ADRESS}/${nft.metadata.id}`}
              key={nft.metadata.id}
            >
              <NFT nft={nft} />
            </Link>
          ) : (
            <div
              key={nft.metadata.id}
              onClick={() => overrideOnclickBehavior(nft)}
            >
              <NFT nft={nft} />
            </div>
          )
        )
      ) : (
        <p>{emptyText}</p>
      )}
    </section>
  )
}

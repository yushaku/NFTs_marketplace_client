import type { NFT as NFTType } from '@thirdweb-dev/sdk'
import { NFT_ADRESS } from '@/utils'
import { Link } from 'react-router-dom'
import { Skeleton } from '@/components/common/Loading'
import { NftItem } from './NftItem'

type Props = {
  isLoading: boolean
  data: NFTType[] | undefined
  overrideOnclickBehavior?: (nft: NFTType) => void
  emptyText?: string
}

export const NftList = ({
  isLoading,
  data,
  emptyText = 'No NFTs found'
}: Props) => {
  return (
    <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-5">
      {isLoading && [...Array(15)].map((_, index) => <Skeleton key={index} />)}
      {!data && <p>{emptyText}</p>}

      {data &&
        data.length > 0 &&
        data.map((nft, index) => {
          if (index > 4) return <span />

          return (
            <li>
              <Link
                key={nft.metadata.id}
                to={`/nfts/${NFT_ADRESS}/${nft.metadata.id}`}
              >
                <NftItem nft={nft} />
              </Link>
            </li>
          )
        })}
    </ul>
  )
}

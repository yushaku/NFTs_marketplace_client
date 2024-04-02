import { Skeleton } from '@/components/common/Loading'
import { MARKETPLACE_ADDRESS, NFT_ADRESS } from '@/utils'
import {
  ThirdwebNftMedia,
  useContract,
  useValidDirectListings,
  useValidEnglishAuctions
} from '@thirdweb-dev/react'
import { NFT } from '@thirdweb-dev/sdk'

type Props = {
  nft: NFT
}

export default function NFTComponent({ nft }: Props) {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    'marketplace-v3'
  )

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_ADRESS,
      tokenId: nft.metadata.id
    })

  //Add for auciton section
  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_ADRESS,
      tokenId: nft.metadata.id
    })

  return (
    <div>
      <article>
        <ThirdwebNftMedia
          metadata={nft.metadata}
          height={'100%'}
          width={'100%'}
        />
      </article>

      <p>Token ID #{nft.metadata.id}</p>
      <p>{nft.metadata.name}</p>

      <article>
        {loadingMarketplace || loadingDirectListing || loadingAuction ? (
          <Skeleton />
        ) : directListing && directListing[0] ? (
          <article>
            <div>
              <p>Price</p>
              <p>{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</p>
            </div>
          </article>
        ) : auctionListing && auctionListing[0] ? (
          <article>
            <div>
              <p>Minimum Bid</p>
              <p>{`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}</p>
            </div>
          </article>
        ) : (
          <article>
            <div>
              <p>Price</p>
              <p>Not Listed</p>
            </div>
          </article>
        )}
      </article>
    </div>
  )
}

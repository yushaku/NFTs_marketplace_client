import { NFT_ADRESS } from '@/utils'
import { useContract, useOwnedNFTs } from '@thirdweb-dev/react'
import { useAccount } from 'wagmi'
import NFTGrid from './NFTGrid'

export const UserCollection = () => {
  const { address } = useAccount()
  const { contract: nftCollection } = useContract(NFT_ADRESS)

  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
    nftCollection,
    address
  )

  return (
    <div>
      <h3>UserCollection</h3>
      <p>Browse and manage your NFTs from this collection.</p>

      <NFTGrid
        data={ownedNfts}
        isLoading={loadingOwnedNfts}
        emptyText={"You don't own any NFTs yet from this collection."}
      />
    </div>
  )
}

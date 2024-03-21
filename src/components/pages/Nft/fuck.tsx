import { NFT_ADRESS } from '@/utils'
import { ThirdwebNftMedia, useContract, useNFT } from '@thirdweb-dev/react'

export function FuckNFT() {
  const { contract } = useContract(NFT_ADRESS)
  const { data: nft, isLoading, error } = useNFT(contract, '0')

  // Render the NFT onto the UI
  if (isLoading) return <div>Loading...</div>
  if (error || !nft) return <div>NFT not found</div>

  return <ThirdwebNftMedia metadata={nft.metadata} />
}

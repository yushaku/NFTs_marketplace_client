import { NFT_ADRESS } from '@/utils'
import { useContract, useNFT } from '@thirdweb-dev/react'

export function FuckNFT() {
  const { contract } = useContract(NFT_ADRESS)
  const { data: nft, isLoading, error } = useNFT(contract, '0')

  if (isLoading) return <div>Loading...</div>
  if (error || !nft) return <div>NFT not found</div>

  const cid = 'QmV4HC9fNrPJQeYpbW55NLLuSBMyzE11zS1L4HmL6Lbk7X' // Replace with your CID
  const gatewayUrl = 'https://ipfs.io/ipfs/'
  console.log(nft.metadata)

  return (
    // return <ThirdwebNftMedia metadata={nft.metadata} />
    // <MediaRenderer src="ipfs://QmV4HC9fNrPJQeYpbW55NLLuSBMyzE11zS1L4HmL6Lbk7X" />
    <div>
      okokok
      <img src={`${gatewayUrl}${cid}`} alt="IPFS Image" />
    </div>
  )
}

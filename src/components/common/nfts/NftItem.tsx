import { NFT } from '@thirdweb-dev/sdk'
import { Nftmedia } from './Nftmedia'

type Props = {
  nft: NFT
}

export const NftItem = ({ nft }: Props) => {
  return (
    <li className="group relative h-80 overflow-hidden rounded-lg">
      <Nftmedia metadata={nft.metadata} isOn={false} />

      <h3 className="animate absolute -left-full bottom-5 z-50 delay-100 group-hover:left-2">
        <p>ID #{nft.metadata.id}</p>
        <strong className="mb-2">{nft.metadata.name}</strong>
      </h3>

      <article className="absolute inset-0 w-full bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-[rgba(255,255,255,0.01)] group-hover:-bottom-5" />
    </li>
  )
}

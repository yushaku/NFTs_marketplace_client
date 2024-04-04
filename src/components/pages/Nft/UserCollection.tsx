import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { NFT_ADRESS, routes } from '@/utils'
import { shortenAddress } from '@thirdweb-dev/react'
import { Link } from 'react-router-dom'

export const UserCollection = () => {
  return (
    <section className="min-h-[85%]">
      <div className="mt-10 grid grid-cols-5 gap-5">
        <article className="h-52 rounded-lg bg-layer p-3">
          <h3 className="text-lg">Import your collection</h3>
          <Input placeholder="Enter address" className="mt-5" />
          <Button title="Import" className="mt-5 w-full" />
        </article>

        {nfts.map((nft) => {
          return (
            <Link
              to={`${routes.myNFTs}/${nft.address}`}
              key={nft.address}
              className="h-52 w-full rounded-lg bg-layer p-3"
            >
              <h3 className="text-lg">
                {nft.name}
                <span className="ml-5 text-gray-500">
                  {shortenAddress(nft.address)}
                </span>
              </h3>
              <img src={nft.img} className="size-full" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

const nfts = [
  {
    address: NFT_ADRESS,
    name: 'NFT 1',
    img: '/img.svg'
  },
  {
    address: NFT_ADRESS,
    name: 'NFT 2',
    img: '/img.svg'
  }
]

import { ERC721_ABI } from '@/abi/erc721.ts'
import { Button } from '@/components/common/Button'
import { DotLoader } from '@/components/common/Loading'
import { ETH } from '@/components/icons'
import { GATEWAY_URL, fakeNFTs } from '@/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { Address } from 'viem'
import { useReadContracts } from 'wagmi'

export const CollectionNFTs = () => {
  const { id: address } = useParams()
  const navigate = useNavigate()
  const config = { abi: ERC721_ABI, address: address as Address } as const

  const { data, isLoading } = useReadContracts({
    contracts: [
      { ...config, functionName: 'name' },
      { ...config, functionName: 'symbol' },
      { ...config, functionName: 'baseTokenURI' }
    ]
  })

  if (!data || isLoading) return <DotLoader />
  const [name, symbol] = data

  return (
    <section>
      <h4 className="mb-5 text-2xl">
        {String(name.result)} - {String(symbol.result)}
      </h4>

      <ul className="grid grid-cols-4 gap-x-5 gap-y-10">
        {fakeNFTs.map((item, index) => {
          return (
            <li
              key={index}
              className="group relative overflow-hidden rounded-lg"
              onClick={() => navigate(`/nfts/${address}/${item.cip}`)}
            >
              <video
                className="animate group-hover:scale-110"
                src={`${GATEWAY_URL}${item.url}`}
                width="100%"
              />
              <h3 className="animate absolute -left-1/2 bottom-5 z-50 delay-100 group-hover:left-5">
                <strong className="mb-2">{item.name}</strong>
                <p>
                  Price: {item.price} <ETH className="inline-block size-5" />
                </p>
              </h3>

              <Button
                title="Buy now"
                className="animate absolute -right-1/2 bottom-5 z-50 delay-100 group-hover:right-5"
              />

              <article className="absolute inset-0 w-full bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-[rgba(255,255,255,0.01)] group-hover:-bottom-5" />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

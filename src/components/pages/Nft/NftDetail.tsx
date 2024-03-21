import abi from '@/abi/erc721.json'
import { DotLoader } from '@/components/common/Loading'
import { useParams } from 'react-router-dom'
import { Address } from 'viem'
import { useReadContracts } from 'wagmi'
import { FuckNFT } from './fuck'

export const NftDetail = () => {
  const { id: address } = useParams()
  const config = { abi, address: address as Address } as const

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
      <h4 className="text-xl">
        {String(name.result)} - {String(symbol.result)}
      </h4>

      <div>
        {fake.map((item, index) => {
          console.log(ipfsgateWay + item.url)
          return (
            <div className="" key={index}>
              {' '}
            </div>
          )
        })}
      </div>
      <FuckNFT />
    </section>
  )
}

const Artist = ({ url }: { url: string }) => {
  switch (url.split('.').at(-1)) {
    case 'pm4':
      return <video src={url} className="w-80 h-40" />
    default:
      return <img src={url} alt="NFT" className="w-80 h-40" />
  }
}
const ipfsgateWay = 'https://ipfs.io/ipfs'

const fake = [
  {
    title: 'NFT',
    url: 'ipfs://bafybeigjo7vswkssnmoii6e5rif6srbc7xyqmdvxxlyo37zokst4dnmlka/gun1.mp4'
  },
  {
    title: 'NFT',
    url: 'ipfs://bafybeigjo7vswkssnmoii6e5rif6srbc7xyqmdvxxlyo37zokst4dnmlka/gun2.mp4'
  },
  {
    title: 'NFT',
    url: 'ipfs://bafybeigjo7vswkssnmoii6e5rif6srbc7xyqmdvxxlyo37zokst4dnmlka/gun3.mp4'
  }
]

import { ERC721_ABI } from '@/abi/erc721'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { DotLoader } from '@/components/common/Loading'
import { useGetCollections, useInportCollection } from '@/hooks/useNfts'
import { cn, publicClient, routes } from '@/utils'
import { shortenAddress } from '@thirdweb-dev/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAddress } from 'viem'
import { useAccount, useChainId } from 'wagmi'

export const UserCollection = () => {
  const chainId = useChainId()
  const [skeleton, setSkeleton] = useState({
    address: '',
    name: '',
    loading: false
  })

  const { address } = useAccount()
  // const { data: collector } = useCollector(address)
  const { address: userAddress } = useAccount()
  const { data: collections } = useGetCollections(address, chainId)

  return (
    <section className="min-h-[85%]">
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-5">
        <FormImport
          className="col-span-2"
          userAddress={userAddress}
          whenSubmit={({ address, name }) =>
            setSkeleton({ address, name, loading: true })
          }
          onSuccess={() => setSkeleton({ ...skeleton, loading: false })}
        />

        <article
          hidden={skeleton.loading}
          className={`${skeleton.loading ? 'block' : 'hidden'} relative h-52 w-full animate-pulse overflow-hidden rounded-lg bg-layer`}
        >
          <h3 className="absolute bottom-3 z-50 bg-gray-500/50 p-3 text-lg">
            {skeleton.name} -
            <span className="ml-3">{shortenAddress(skeleton.address)}</span>
          </h3>
          <DotLoader className="absolute right-1/2 top-1/2 z-10  translate-x-1/2" />
        </article>

        {collections?.collections.map((nft) => {
          return (
            <Link
              to={`${routes.myNFTs}/${nft.address}`}
              key={nft.address}
              className="relative h-52 w-full overflow-hidden rounded-lg bg-layer"
            >
              <h3 className="absolute bottom-3 z-50 bg-gray-500/50 p-3 text-lg">
                {nft.name} -
                <span className="ml-3">{shortenAddress(nft.address)}</span>
              </h3>
              <img
                src="/gundams.jpg"
                className="animate size-full hover:scale-110"
              />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

type Props = React.FormHTMLAttributes<HTMLFormElement> & {
  userAddress?: `0x${string}`
  whenSubmit: ({ address, name }: { address: string; name: string }) => void
  onSuccess: () => void
}

const FormImport = ({
  userAddress = '0x0',
  whenSubmit,
  onSuccess,
  className
}: Props) => {
  const chainId = useChainId()
  const [address, setAddress] = useState('0x')
  const [error, setError] = useState('')
  const { mutateAsync: importCollection, isPending } = useInportCollection()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (isAddress(address)) {
      const name = await publicClient.readContract({
        address,
        abi: ERC721_ABI,
        functionName: 'name'
      })

      if (!name) {
        setError('This collection is not supported')
      }

      whenSubmit({ address, name })
      await importCollection({ address, name, userAddress, chainId })
      onSuccess()
      setAddress('0x')
    } else {
      setError('Hey! this is not an valid address')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('h-52 rounded-lg bg-layer p-3', className)}
    >
      <h3 className="text-lg">Import your collection</h3>
      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address"
        className={`mt-5 ${error && 'border-red-500'}`}
      />
      <span className="mt-2 text-sm text-red-500">{error}</span>
      <Button
        loading={isPending}
        disabled={isPending || !userAddress}
        type="submit"
        title="Import"
        className="mt-5 w-full"
      />
    </form>
  )
}

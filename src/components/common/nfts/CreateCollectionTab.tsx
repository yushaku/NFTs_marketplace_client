import { NFT_FACTORY_ADDRESS, cn, publicClient } from '@/utils'
import { decodeAbiParameters } from 'viem'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Button } from '../Button'
import { useChainId } from '@thirdweb-dev/react'
import { useInportCollection } from '@/hooks'
import { useAccount, useWriteContract } from 'wagmi'
import { NFT_FACTOARY_ABI } from '@/abi/nftFactory'
import { useState } from 'react'
import { DotLoader } from '../Loading'

type Inputs = {
  name: string
  symbol: string
  royalty: number
}

const schema = yup.object({
  name: yup.string().required(),
  symbol: yup.string().required(),
  royalty: yup.number().min(0).max(5).required().default(0)
})

const NEEDED_LOG_INDEX = 2

export const CreateCollectionTab = () => {
  const chainId = useChainId()
  const [media, setMedia] = useState<File | null>()
  const { address: userAddress } = useAccount()
  const { mutateAsync: importCollecion } = useInportCollection()
  const { isPending, writeContractAsync } = useWriteContract()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<Inputs>({ resolver: yupResolver(schema) })

  async function onSubmit(data: Inputs) {
    const { name, symbol, royalty } = data
    // const fileUrl = await handleUpload(media)
    // console.log(fileUrl)

    const hash = await writeContractAsync({
      address: NFT_FACTORY_ADDRESS,
      abi: NFT_FACTOARY_ABI,
      functionName: 'create',
      args: [name, symbol, royalty]
    })

    const transaction = await publicClient.getTransactionReceipt({ hash })
    const log = transaction?.logs[NEEDED_LOG_INDEX]
    const values = decodeAbiParameters(
      [
        { name: 'from', type: 'address' },
        { name: 'name', type: 'string' },
        { name: 'nft', type: 'address' }
      ],
      log.data
    )
    const nftAddress = values[NEEDED_LOG_INDEX]
    await importCollecion({ name, address: nftAddress, userAddress, chainId })
  }

  const styleInput =
    'w-full rounded-lg border-2 border-gray-700 bg-layer p-3  focus:border-gray-500 focus:outline-none'

  return (
    <div className="mt-10 flex gap-10">
      <form
        className="mt-5 flex flex-1 flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Name"
          required
          className={cn(styleInput, { 'border-red-400': errors.name?.message })}
          {...register('name', { required: true })}
        />

        <input
          type="text"
          placeholder="Symbol"
          className={cn(styleInput, {
            'border-red-400': errors.symbol?.message
          })}
          {...register('symbol', { required: true })}
        />

        <input
          type="text"
          placeholder="Set royalty from 0% to 5%"
          className={cn(styleInput, {
            'border-red-400': errors.royalty?.message
          })}
          {...register('royalty', { required: true })}
        />

        <input
          type="file"
          placeholder="file"
          onChange={(e) => {
            setMedia(e.target.files?.[0])
          }}
          className={cn(
            'w-full rounded-lg border-2 border-gray-700 bg-layer p-3  focus:border-gray-500 focus:outline-none'
          )}
        />
        <label className="text-gray-400">
          Set avatar for your NFTs collection
        </label>

        <Button
          loading={isPending}
          disabled={isPending}
          type="submit"
          title="Create new collection"
        />
      </form>

      <article className="flex-center flex-1 flex-col gap-5">
        <img
          src={media ? URL.createObjectURL(media) : '/logo.png'}
          className="size-20"
        />
        <div>
          {getValues('name') && (
            <h3 className="text-lg">Name: {getValues('name')}</h3>
          )}

          {getValues('symbol') && (
            <p className="text-lg text-gray-400">
              symbol: {getValues('symbol')}
            </p>
          )}

          {getValues('royalty') && (
            <p className="text-lg text-gray-400">
              Author royalty: {getValues('royalty')} %
            </p>
          )}

          <p className="flex items-center gap-3 text-lg text-gray-400">
            address: <DotLoader />
          </p>
        </div>
      </article>
    </div>
  )
}

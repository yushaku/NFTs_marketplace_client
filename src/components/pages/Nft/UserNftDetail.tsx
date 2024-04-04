/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/common/Button'
import { DotLoader } from '@/components/common/Loading'
import { NativeToken } from '@/components/common/NativeTokenBalance'
import { Nftmedia } from '@/components/common/nfts/Nftmedia'
import { Card } from '@/components/warper'
import { chartdata } from '@/utils'
import {
  ArrowLeftIcon,
  ShoppingCartIcon,
  TagIcon,
  ClockIcon,
  Bars3BottomLeftIcon
} from '@heroicons/react/16/solid'
import { useContract, useNFT } from '@thirdweb-dev/react'
import { Divider, AreaChart } from '@tremor/react'
import { useParams, useNavigate } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'

export const UserNftDetail = () => {
  const { cip: tokenId, id: nftAddress } = useParams()
  const navigate = useNavigate()

  const { contract: nftCollection } = useContract(nftAddress)
  const { data: nft } = useNFT(nftCollection, tokenId)

  return (
    <section>
      <button
        onClick={() => navigate(-1)}
        className="my-5 text-lg text-gray-100 hover:text-accent"
      >
        <ArrowLeftIcon className="mr-3 inline-block size-5" />
        Gundam Collection
      </button>

      <div className="grid grid-cols-2 gap-5">
        <article>
          <Card className="col-span-1 h-1/2">
            <Nftmedia metadata={nft?.metadata as any} isOn={true} />
          </Card>

          <Card className="mt-5">
            <h3 className="text-2xl">Description</h3>
            <p className="text-sm text-gray-300">{nft?.metadata.description}</p>
          </Card>

          <Card className="mt-5">
            <h3 className="text-2xl">Detail</h3>
            <ul className="mt-5 text-sm text-gray-300">
              {/* {nftDetail.map((it, index) => { */}
              {/*   return ( */}
              {/*     <li className="flex justify-between" key={index}> */}
              {/*       <span className="text-gray-300">{it.type}</span> */}
              {/*       <span>{it.value}</span> */}
              {/*     </li> */}
              {/*   ) */}
              {/* })} */}
            </ul>
          </Card>
        </article>

        <article className="col-span-1">
          <Card>
            <h3 className="text-2xl text-lighterAccent">
              {nft?.metadata.name ?? <DotLoader />}
            </h3>
            <p className="text-sm text-gray-50">Owned by Yushaku</p>
            <ul className="mt-5 flex gap-4">
              <li className="rounded-lg bg-background px-3 py-1">
                # {tokenId}
              </li>
              <li className="rounded-lg bg-background px-3 py-1">23 views</li>
              <li className="rounded-lg bg-background px-3 py-1">PFPs</li>
            </ul>
          </Card>

          <Card className="mt-5">
            <Fragment>
              <p className="text-sm text-gray-400">Current Price</p>
              <h3 className="my-3 text-2xl font-bold">
                0.05 <NativeToken className="inline-block size-5" />
              </h3>
              <p className="flex gap-4">
                <Button
                  icon={ShoppingCartIcon}
                  title="Buy now"
                  className="w-1/2"
                />
                <Button icon={TagIcon} title="Make Offer" className="w-1/2" />
              </p>

              <Divider className="border-gray-700">History</Divider>

              <h3>
                <ClockIcon className="mr-3 inline-block size-5" />
                Sale ends April 30, 2024 at 7:50 AM
              </h3>
              <AreaChart
                className="h-80"
                data={chartdata}
                index="date"
                categories={['ETH']}
                colors={['indigo']}
                yAxisWidth={60}
                onValueChange={(v) => console.log(v)}
              />
            </Fragment>
          </Card>

          <Card className="mt-5">
            <h3 className="mb-5 text-xl">
              <TagIcon className="mr-3 inline-block size-5" />
              Listings
            </h3>

            <ul>
              <li className="grid grid-cols-5 text-center text-gray-500">
                <span>Price</span>
                <span>USD Price</span>
                <span>Quantity</span>
                <span>Expiration</span>
                <span>From</span>
              </li>

              <hr className="my-5 border-gray-700" />

              <li className="grid grid-cols-5 text-center text-sm">
                <span>0.05 ETH</span>
                <span>280$</span>
                <span>1</span>
                <span>in 20 Hours</span>
                <span>Yushaku</span>
              </li>
            </ul>
          </Card>

          <Card className="mt-5">
            <h3 className="mb-5 text-xl">
              <Bars3BottomLeftIcon className="mr-3 inline-block size-5" />
              Offers
            </h3>

            <ul>
              <li className="grid grid-cols-5 text-center text-gray-500">
                <span>Price</span>
                <span>USD Price</span>
                <span>Difference</span>
                <span>Expiration</span>
                <span>From</span>
              </li>

              <hr className="my-5 border-gray-700" />

              <li className="my-3 grid grid-cols-5 text-center text-sm">
                <span>0.04 ETH</span>
                <span>200$</span>
                <span>20%</span>
                <span>in 20 Hours</span>
                <span>tigon</span>
              </li>

              <li className="my-3 grid grid-cols-5 text-center text-sm">
                <span>0.04 ETH</span>
                <span>200$</span>
                <span>20%</span>
                <span>in 20 Hours</span>
                <span>tigon</span>
              </li>
            </ul>
          </Card>
        </article>
      </div>

      <div></div>
    </section>
  )
}

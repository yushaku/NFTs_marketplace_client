import { Button } from '@/components/common/Button'
import { ETH } from '@/components/icons'
import { Card } from '@/components/warper'
import { GATEWAY_URL } from '@/utils'
import {
  Bars3BottomLeftIcon,
  ClockIcon,
  ShoppingCartIcon,
  TagIcon
} from '@heroicons/react/16/solid'
import { AreaChart, Divider } from '@tremor/react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

export const DetailNFT = () => {
  const navigate = useNavigate()
  return (
    <section>
      <p onClick={() => navigate(-1)} className="text-lg text-gray-100">
        Camp Cosmos
      </p>

      <div className="grid grid-cols-2 gap-5">
        <article>
          <Card className="col-span-1 h-1/2">
            <video
              src={`${GATEWAY_URL}bafybeigjo7vswkssnmoii6e5rif6srbc7xyqmdvxxlyo37zokst4dnmlka/gun1.mp4`}
              className="size-full"
              autoPlay
              loop
              muted
            />
          </Card>

          <Card className="mt-5">
            <h3 className="text-2xl">Description</h3>
            <p className="text-sm text-gray-300">
              Alyxandra's fierce independence, resourcefulness, mental acuity
              and raw talent make her both a natural leader and a lone wolf. She
              struggles against societal norms, relishes the freedoms of
              mercenary life, and fights for her family. She is ambitious beyond
              measure.
            </p>
          </Card>

          <Card className="mt-5">
            <h3 className="text-2xl">Detail</h3>
            <ul className="mt-5 text-sm text-gray-300">
              {nftDetail.map((it, index) => {
                return (
                  <li className="flex justify-between" key={index}>
                    <span className="text-gray-300">{it.type}</span>
                    <span>{it.value}</span>
                  </li>
                )
              })}
            </ul>
          </Card>
        </article>

        <article className="col-span-1">
          <Card>
            <h3 className="text-2xl text-lighterAccent">Camper #5265</h3>
            <p className="text-sm text-gray-50">Owned by Rikerbot</p>
            <ul className="mt-5 flex gap-4">
              <li className="rounded-lg bg-background px-3 py-1"># 2342</li>
              <li className="rounded-lg bg-background px-3 py-1">23 views</li>
              <li className="rounded-lg bg-background px-3 py-1">PFPs</li>
            </ul>
          </Card>

          <Card className="mt-5">
            <Fragment>
              <p className="text-sm text-gray-400">Current Price</p>
              <h3 className="my-3 text-2xl font-bold">
                0.05 <ETH className="inline-block size-5" />
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

const chartdata = [
  {
    date: 'Jan 22',
    ETH: 0.03
  },
  {
    date: 'Feb 22',
    ETH: 0.04
  },
  {
    date: 'Mar 22',
    ETH: 0.02
  },
  {
    date: 'Apr 22',
    ETH: 0.08
  },
  {
    date: 'May 22',
    ETH: 0.1
  }
]

const nftDetail = [
  {
    type: 'Contract Address',
    value: '0x000000000000000'
  },
  {
    type: 'Token ID',
    value: '1'
  },
  {
    type: 'Token Standard',
    value: 'ERC 721'
  },
  {
    type: 'last update',
    value: '1 year ago'
  },
  {
    type: 'Creator Earning',
    value: '5%'
  }
]

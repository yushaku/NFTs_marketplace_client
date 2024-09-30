import { useGetPrice } from '@/apis/price'
import { Button } from '@/components/common/Button'
import { Spinner } from '@/components/common/Loading'
import { NativeToken } from '@/components/common/NativeTokenBalance'
import { cn } from '@/utils'
import {
  ShoppingBagIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/16/solid'
import { useState } from 'react'
import { useCartState } from '../states'
import { PaymentForm } from './PaymemtForm'

export const ShopCartList = () => {
  const [toggle, setToggle] = useState(false)
  const styled = toggle ? 'right-0 top-0' : '-right-full top-0'

  const { itemList, remove } = useCartState()
  const { data: bnbPrice } = useGetPrice({ params: { symbol: 'BNB' } })

  const totalUsdt = itemList.reduce((a, b) => a + Number(b.price), 0)
  const totalBnb = totalUsdt / (bnbPrice ?? 1)

  return (
    <>
      <Button
        variant="outline"
        icon={ShoppingBagIcon}
        title={itemList.length.toString()}
        onClick={() => setToggle(!toggle)}
      />

      <div
        onClick={() => setToggle(false)}
        className={cn(
          'animate delay-50 duration-100 fixed top-0 -right-full z-30 h-screen w-screen bg-gray-500/20',
          toggle && 'right-0'
        )}
      />

      <div
        className={cn('animate fixed h-screen p-5 z-50 w-96 bg-layer', styled)}
      >
        <h3 className="mt-5 flex justify-between">
          <span className="text-2xl font-bold text-lighterAccent">
            Your cart
          </span>

          <XMarkIcon className="size-6" onClick={() => setToggle(false)} />
        </h3>

        <ul className="no-scrollbar mt-5 max-h-[70vh] space-y-3 overflow-y-scroll">
          {itemList.map((item, index) => (
            <li
              key={index}
              className="group relative flex items-center gap-3 rounded-lg p-2 hover:bg-focus"
            >
              <img src={item.banner} alt="nft" className="size-12 rounded-lg" />
              <article>
                <h3>{item.name}</h3>
                <p className="flex items-center font-bold text-textSecondary">
                  {bnbPrice ? (
                    (Number(item.price) / (bnbPrice ?? 1)).toFixed(5)
                  ) : (
                    <Spinner />
                  )}
                  <NativeToken className="ml-1" />
                </p>
              </article>

              <article className={`absolute right-0 hidden group-hover:block`}>
                <Button
                  variant="outline"
                  title=""
                  className="bg-red-400 px-3 hover:bg-red-500"
                  icon={TrashIcon}
                  onClick={() => remove(item.product_id)}
                />
              </article>
            </li>
          ))}
        </ul>

        <article className="absolute bottom-0 left-0 w-full bg-focus p-5">
          <h3 className="mb-5 flex justify-between">
            <span>Total:</span>
            <span className="text-xl font-bold text-lighterAccent">
              {bnbPrice ? totalBnb.toFixed(5) : <Spinner />} <NativeToken />
            </span>
          </h3>

          <PaymentForm />
        </article>
      </div>
    </>
  )
}

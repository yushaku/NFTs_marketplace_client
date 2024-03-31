import { Button } from '@/components/common/Button'
import { BSC, USDT } from '@/components/icons'
import { productsMoc } from '@/utils'

export const ShopPage = () => {
  return (
    <div>
      <h3 className="text-2xl font-bold">Buy some product to support us</h3>

      <ul className="mt-10 grid grid-cols-3 gap-4">
        {productsMoc.map((item, index) => {
          return (
            <li
              key={index}
              className="group relative overflow-hidden rounded-lg"
            >
              <img src={item.showImg} alt={item.name} />
              <h3 className="animate absolute -bottom-6 left-5 z-50 group-hover:bottom-5">
                <p className="mb-2 text-xl font-bold text-lighterAccent">
                  {item.name}
                </p>
                <ol className="flex text-sm text-white">
                  <li className="pr-2 font-bold">Price:</li>

                  <li className="flex-center gap-2 pr-2">
                    {item.price.usdt}
                    <USDT className="inline-block size-5" />|
                  </li>
                  <li className="flex-center gap-2 px-2">
                    {item.price.bnb}
                    <BSC className="inline-block size-5" /> |
                  </li>
                  <li className="flex-center gap-2 pl-2">
                    {item.price.ysk}
                    <img
                      src="/logo.png"
                      alt="ysk"
                      className="inline-block size-5"
                    />
                  </li>
                </ol>
              </h3>

              <Button
                title="Buy"
                className="animate absolute -bottom-6 right-5 z-50 opacity-0 delay-100 group-hover:bottom-5 group-hover:opacity-100"
              />

              <article className="absolute inset-0 w-full bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-[rgba(255,255,255,0.01)] group-hover:-bottom-5" />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

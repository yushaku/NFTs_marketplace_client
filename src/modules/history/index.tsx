import { SHOP_PAYMENT_ABI } from '@/abi/shopPayment'
import { useDeleteOrders, useGetOrders } from '@/apis'
import { Button } from '@/components/common/Button'
import { BSC, USDT } from '@/components/icons'
import { Card } from '@/components/warper'
import { SHOP_PAYMENT_ADDRESS, cn, config } from '@/utils'
import { TrashIcon } from '@heroicons/react/16/solid'
import { DateTime } from 'luxon'
import { useState } from 'react'
import { useWatchContractEvent } from 'wagmi'
import { ConfirmModal } from '../Shares'
import { toast } from 'react-toastify'

export const HistoryPage = () => {
  const [payin] = useState<'usdt' | 'native'>('native')

  const { mutate: deleteOrders } = useDeleteOrders()
  const { data: orderHistory } = useGetOrders({
    params: { page: 1, perPage: 10 }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useWatchContractEvent({
    address: SHOP_PAYMENT_ADDRESS,
    abi: SHOP_PAYMENT_ABI,
    eventName: 'OrderCreated',
    onLogs(logs) {
      console.log('New logs!', logs)
      toast.info('Payment success')
      // if (logs[0] === '0x0000000000000000000000000000000000000000') {
      // }
    }
  })

  return (
    <div className="min-h-dvh">
      <h3 className="mb-5 text-xl">Your Order History</h3>

      <ul className="grid grid-cols-2 gap-4">
        {orderHistory?.data?.map((item) => {
          return (
            <li key={item.order_id} className="group">
              <Card>
                <i className="text-sm text-textSecondary">
                  ID: {item.order_id}
                </i>
                <p className="flex justify-between gap-1">
                  <span>
                    Order Date:{' '}
                    {DateTime.fromISO(item.order_date).toFormat('yyyy-MM-dd')}
                  </span>
                  <span>status: {item.status}</span>
                </p>
                <p className="mt-2 flex gap-5">
                  <span className="flex items-center gap-2">
                    Amount:
                    {payin === 'usdt' ? (
                      <span className="flex items-center gap-2">
                        <strong>{item.total_amount}</strong>
                        <USDT className="size-5" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <strong>{item.price_in_token}</strong>
                        <BSC className="size-5" />
                      </span>
                    )}
                  </span>
                </p>
              </Card>

              <div className="animate no-scrollbar rounded-b-lg bg-focus p-4">
                <ul className="flex flex-wrap gap-4 ">
                  {item?.order_items?.map((order) => {
                    return (
                      <div key={order.product_id} className="space-y-1">
                        <img
                          src={order?.product?.banner}
                          alt={order.total_price}
                          className="w-32 rounded-lg"
                        />
                        <p className="text-sm text-textSecondary">
                          {order.product.name}
                        </p>
                        <p className="flex gap-5">
                          {payin === 'usdt' ? (
                            <span className="flex items-center gap-2">
                              Price: <strong>{order.total_price}</strong>
                              <USDT className="size-5" />
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Price: <strong>{order.price_in_token}</strong>
                              <BSC className="size-5" />
                            </span>
                          )}
                        </p>
                      </div>
                    )
                  })}
                </ul>

                <div className="mt-4 flex gap-2">
                  <Button
                    title="Perchase"
                    className={cn(
                      'w-full',
                      item.status === 'pending' ? 'block' : 'hidden'
                    )}
                    icon={TrashIcon}
                  />

                  <ConfirmModal
                    isPending={false}
                    icon={TrashIcon}
                    handleSubmit={() => {
                      deleteOrders([item.order_id])
                    }}
                    isDisabled={item.status !== 'pending'}
                  />

                  <Button
                    title="Cancel and refund order"
                    variant="outline"
                    className={cn(
                      'w-full hover:bg-red-400',
                      item.status === 'processing' ? 'block' : 'hidden'
                    )}
                    icon={TrashIcon}
                  />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

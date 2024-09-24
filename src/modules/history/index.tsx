import { useGetOrders } from '@/apis'
import { BSC, USDT } from '@/components/icons'
import { Card } from '@/components/warper'
import { DateTime } from 'luxon'

export const HistoryPage = () => {
  const { data: orderHistory } = useGetOrders({
    params: { page: 1, perPage: 10 }
  })

  return (
    <div>
      <h3 className="mb-5 text-xl">Your Order History</h3>

      <ul className="grid grid-cols-2 gap-4">
        {orderHistory?.data?.map((item) => {
          return (
            <li key={item.order_id}>
              <Card>
                <h6>ID: {item.order_id}</h6>
                <p className="flex justify-between gap-1">
                  <span>
                    Order Date:{' '}
                    {DateTime.fromISO(item.order_date).toFormat('yyyy-MM-dd')}
                  </span>
                  <span>status: {item.status}</span>
                </p>
                <p className="mt-2 flex gap-5">
                  <span className="flex items-center gap-2">
                    Amount: <strong>{item.price_in_token}</strong>
                    <BSC className="size-5" />
                  </span>
                  ~
                  <span className="flex items-center gap-2">
                    <strong>{item.total_amount}</strong>
                    <USDT className="size-5" />
                  </span>
                </p>
              </Card>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

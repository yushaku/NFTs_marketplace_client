import {
  QueryClient,
  useMutation,
  useQuery,
  UseQueryOptions
} from '@tanstack/react-query'
import instance from './client'
import { ApiResponce } from '@/types'

type Pagination = {
  page?: number
  perPage?: number
}

type GetProductsProps = {
  params?: Pagination
  options?: Omit<UseQueryOptions<ApiResponce<Products>>, 'queryKey' | 'queryFn'>
}

export type Products = {
  product_id: number
  name: string
  description: string
  price: string
  stock_quantity: number
  banner: string
  image_urls: string[]
  created_at: Date
  updated_at: Date
}

export const useGetProducts = ({ params, options }: GetProductsProps) => {
  return useQuery({
    queryKey: ['products', JSON.stringify(params)],
    queryFn: async () => {
      const res = await instance.get('/products', {
        params: {
          page: params?.page || 1,
          perPage: params?.perPage || 10
        }
      })
      return res.data
    },
    ...options
  })
}

export type CreateAddress = {
  recipient_name: string
  street: string
  city: string
  phone_number: string
}

export const useCreateAddress = () => {
  const queryClient = new QueryClient()

  return useMutation({
    mutationFn: (data: CreateAddress) => {
      return instance.post('/users/address', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/users/address'] })
    }
  })
}

export type StreetAddress = {
  address_id: number
  user_wallet: string
  recipient_name: string
  phone_number: string
  street: string
  city: string
}

type GetAddressProps = {
  params?: Pagination
  options?: Omit<UseQueryOptions<StreetAddress[]>, 'queryKey' | 'queryFn'>
}

export const useGetAddresses = ({ params, options }: GetAddressProps) => {
  return useQuery({
    queryKey: ['/users/address', JSON.stringify(params)],
    queryFn: async () => {
      const res = await instance.get('/users/address', {
        params: {
          page: params?.page || 1,
          perPage: params?.perPage || 10
        }
      })
      return res.data
    },
    ...options
  })
}

export type CreateOrder = {
  address_id: number
  products: Array<{
    product_id: number
    quantity: number
  }>
}

export type Order = {
  order_id: string
  price_in_token: string
}

export type OrderList = {
  order_id: string
  product_id: number
  quantity: number
  unit_price: string
  total_price: string
  price_in_token: string
}

export type OrderResponse = {
  encodeData: string
  unit: string
  order: Order
  orderList: OrderList[]
}

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (data: CreateOrder) => {
      const res = await instance.post('order', data)

      return res.data as OrderResponse
    }
  })
}

export type OrderInfo = {
  order_id: string
  user_wallet: string
  order_date: string
  status: string
  total_amount: string
  price_in_token: string
  shipping_address_id: number
  created_at: Date
  updated_at: Date
}

type GetOrderProps = {
  params?: Pagination
  options?: Omit<
    UseQueryOptions<ApiResponce<OrderInfo>>,
    'queryKey' | 'queryFn'
  >
}

export const useGetOrders = ({ params, options }: GetOrderProps) => {
  return useQuery({
    queryKey: ['/order', JSON.stringify(params)],
    queryFn: async () => {
      const res = await instance.get('/order', {
        params: {
          page: params?.page || 1,
          perPage: params?.perPage || 10
        }
      })
      return res.data
    },
    ...options
  })
}

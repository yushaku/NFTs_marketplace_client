import { useQuery, UseQueryOptions } from '@tanstack/react-query'
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

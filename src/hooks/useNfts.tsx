import { Collection } from '@/types'
import { graphQLClient } from '@/utils/gqlClient'
import { useMutation, useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { toast } from 'react-toastify'

const PROMPT_PATH = '/user_collections'

export const useGetCollections = (address?: string, chainId?: number) => {
  return useQuery({
    queryKey: [PROMPT_PATH],
    staleTime: Infinity,
    queryFn: async () => {
      if (!address) throw new Error('no address')

      return graphQLClient.request<{
        collections: Array<Collection>
      }>(gql`
        {
          collections(
            where: { chainId: ${chainId}, collectors_every: { address: "${address}" } }
          ) {
            address
            createdAt
            id
            name
          }
        }
      `)
    }
  })
}

type ImportCollection = {
  name: string
  address: string
  chainId?: number
  userAddress?: `0x${string}`
}
export const useInportCollection = () => {
  return useMutation({
    mutationFn: async (data: ImportCollection) => {
      const { name, address, chainId = 97, userAddress } = data
      return graphQLClient.request(gql`
        mutation importCollection {
          createCollection(
            data: {
              chainId: ${chainId}
              address:"${address}"
              name: "${name}"
              collectors: {
                connect: {
                  address: "${userAddress}"
                }
              }
            }
          ) {
            id
          }
        }
      `)
    },
    onError: () => {
      toast.error('Import Fail')
    },
    onSuccess: () => {
      toast.success('Import Success')
    }
  })
}

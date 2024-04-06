import { Collection } from '@/types'
import { graphQLClient } from '@/utils/gqlClient'
import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'

const PROMPT_PATH = '/collector'

export const useCollector = (address: string | undefined) => {
  return useQuery({
    queryKey: [PROMPT_PATH],
    staleTime: Infinity,
    queryFn: async () => {
      if (!address) throw new Error('no address')

      return graphQLClient.request<{
        collector: { id: string; name: string }
      }>(gql`
        {
          collector(
            where: { address: "${address}" }
          ) {
            id
            name
          }
        }
      `)
    }
  })
}

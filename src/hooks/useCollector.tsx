import { graphQLClient } from '@/utils/gqlClient'
import { useMutation, useQuery } from '@tanstack/react-query'
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

type User = {
  address: string
  name: string
}

export const useCreateCollector = () => {
  return useMutation({
    mutationFn: checkUser
  })
}

export async function checkUser(data: Partial<User>) {
  const { address } = data
  return graphQLClient.request(gql`
    mutation upsertCollector {
      upsertCollector(
        upsert: {
          create: { address: "${address}" }
          update: { address: "${address}" }
        }
        where: { address: "${address}" }
      ) {
        id
      }
    }
  `)
}

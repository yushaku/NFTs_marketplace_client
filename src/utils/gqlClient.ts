import { GraphQLClient } from 'graphql-request'
import { env } from './constant'

export const graphQLClient = new GraphQLClient(env.VITE_GRAPHQL_CMS_ENDPOINT, {
  headers: {
    authorization: `Bearer ${env.VITE_GRAPHQL_CMS_TOKEN}`
  }
})

import { env } from '@/utils'

export async function handleUpload(file?: File | null) {
  if (!file) return

  const form = new FormData()
  form.append('fileUpload', file)

  const response = await fetch(`${env.VITE_GRAPHQL_CMS_ENDPOINT}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.VITE_GRAPHQL_CMS_TOKEN}`
    },
    body: form
  })

  const data = await response.json()
  return JSON.stringify(data, null, 2)
}

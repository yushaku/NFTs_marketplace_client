import pinataSDK from '@pinata/sdk'
import { env } from '.'

const pinata = new pinataSDK(env.VITE_PINATA_KEY, env.VITE_PINATA_SECRET)

export const checkAuth = async () => {
  await pinata
    .testAuthentication()
    .then((authenticated) => console.log(authenticated))
    .catch(() => {
      console.log('connect to pinata failed')
    })
}

export const uploadJson = async (data: object, name: string) => {
  const res = await pinata.pinJSONToIPFS(data, {
    pinataMetadata: { name }
  })
  return res.IpfsHash
}

export const uploadFile = async (data: ReadableStream, name: string) => {
  const res = await pinata.pinFileToIPFS(data, {
    pinataMetadata: { name }
  })
  return res.IpfsHash
}

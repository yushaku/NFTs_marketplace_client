import { useToken } from 'wagmi'

export const Dashboard = () => {
  const usdt = useToken({
    address: '0xafbD7f43D4F4B7b8ae3310d6A516eca164d6F8e2'
  })

  console.log({ usdt })

  return <div>Dashboard</div>
}

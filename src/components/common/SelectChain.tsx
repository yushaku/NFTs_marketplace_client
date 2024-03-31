import { Menu } from '@headlessui/react'
import { Fragment } from 'react'
import { useChainId, useSwitchChain } from 'wagmi'
import { BSC, ETH, Matic } from '../icons'
import { cn } from '@/utils'
import { Dropdown } from '../warper'

export const SelectChain = () => {
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const name = chainList.find(({ id }) => id === chainId)?.name
  const Logo = chainList.find(({ id }) => id === chainId)!.logo

  const Title = (
    <h6 className="flex gap-2">
      <Logo className="size-5" />
      {name}
    </h6>
  )

  return (
    <Dropdown hidden={!chainId} title={Title}>
      <Fragment>
        {chainList.map(({ id, name, logo: Logo }) => {
          return (
            <Menu.Item key={id}>
              {({ active }) => (
                <button
                  onClick={() => switchChain({ chainId: id })}
                  className={cn(
                    active ? 'bg-focus text-gray-100' : 'text-gray-200',
                    'flex w-full items-center gap-3 px-4 py-3 text-sm'
                  )}
                >
                  <Logo className="size-5" />
                  {name}
                </button>
              )}
            </Menu.Item>
          )
        })}
      </Fragment>
    </Dropdown>
  )
}

const chainList = [
  {
    id: 1,
    name: 'Ethereum',
    logo: ETH
  },
  {
    id: 5,
    name: 'Goerli',
    logo: ETH
  },
  {
    id: 80001,
    name: 'Mumbai',
    logo: Matic
  },
  {
    id: 97,
    name: 'BSC Testnet',
    logo: BSC
  }
] as const

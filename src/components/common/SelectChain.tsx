/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { Fragment } from 'react'
import { useChainId, useSwitchChain } from 'wagmi'
import { Ethereum, Matic } from '../icons'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export const SelectChain = () => {
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const name = chainList.find(({ id }) => id === chainId)?.name
  const Logo = chainList.find(({ id }) => id === chainId)!.logo

  return (
    <Menu
      as="div"
      className={`${chainId ? 'block' : 'hidden'} relative inline-block text-left`}
    >
      <div>
        <Menu.Button className="flex-center w-full gap-3 rounded-xl border border-gray-700 bg-layer px-6 py-3 text-sm font-semibold hover:bg-focus">
          <Logo className="size-5" />
          {name}
          <ChevronDownIcon
            className="-mr-1 size-5 text-gray-200"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none">
          <div className="py-1">
            {chainList.map(({ id, name, logo: Logo }) => {
              return (
                <Menu.Item key={id}>
                  {({ active }) => (
                    <button
                      onClick={() => switchChain({ chainId: id })}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
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
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

const chainList = [
  {
    id: 1,
    name: 'Ethereum',
    logo: Ethereum
  },
  {
    id: 5,
    name: 'Goerli',
    logo: Ethereum
  },
  {
    id: 80001,
    name: 'Mumbai',
    logo: Matic
  }
  // {
  //   id: 97,
  //   name: 'BSC Testnet',
  //   logo: BSC
  // }
] as const

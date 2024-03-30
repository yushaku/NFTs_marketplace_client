import { cn } from '@/utils'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { Fragment } from 'react'

type Props = {
  children: JSX.Element
  title: string | JSX.Element
  hidden?: boolean
  btnStyle?: string
}

export const Dropdown = ({ children, title, btnStyle, hidden }: Props) => {
  return (
    <Menu
      as="div"
      className={`${hidden ? 'hidden' : 'block'} relative inline-block text-left`}
    >
      <div>
        <Menu.Button
          className={cn(
            'flex-center w-full gap-3 rounded-xl border border-gray-700 bg-layer px-6 py-3 text-sm font-semibold hover:bg-focus',
            btnStyle
          )}
        >
          {title}
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-layer py-1 shadow-lg ring-1 ring-gray-700 focus:outline-none">
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

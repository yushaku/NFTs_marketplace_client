import { TOKENS, TokenOption, cn } from '@/utils'
import { Dropdown } from '../warper'
import { Menu } from '@headlessui/react'
import { Fragment } from 'react'

type Props = {
  token: TokenOption
  setToken: (value: TokenOption) => void
}

export const SelectToken = ({ token, setToken }: Props) => {
  const TokenIcon = token.icon
  const Title = (
    <h6 className="flex items-center gap-2">
      <TokenIcon className="size-5" />
      {token.name}
    </h6>
  )

  return (
    <Dropdown title={Title} btnStyle="rounded-lg">
      <Fragment>
        {TOKENS.map((item) => {
          const { name, icon: Icon } = item
          return (
            <Menu.Item key={name}>
              {({ active }) => (
                <button
                  onClick={() => setToken(item)}
                  className={cn(
                    active ? 'bg-focus text-gray-100' : 'text-gray-200',
                    'flex w-full items-center gap-3 px-4 py-3 text-sm'
                  )}
                >
                  <Icon className="size-5" />
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

import { MoonIcon, SunIcon } from '@heroicons/react/16/solid'
import { ConnectKitButton } from 'connectkit'
import { useLocation } from 'react-router-dom'
import { SelectChain } from '../common/SelectChain'
import { routes } from '@/utils'
import { CartList } from '../common/CartList'
import createAvatar from '@/utils/avatar'

type Props = {
  theme: string
  switchTheme: () => void
}

export const Header = ({ theme, switchTheme }: Props) => {
  const location = useLocation().pathname
  const title = headTitle[location as keyof typeof headTitle] ?? 'Home'

  return (
    <header className="mt-5 flex items-center justify-between py-5">
      <h3 className="heading-lg lg:heading-2xl text-lighterAccent">{title}</h3>

      <div className="flex-center gap-3">
        <button className="hidden p-3 md:block" onClick={switchTheme}>
          {theme === 'light' ? (
            <SunIcon className="size-6 fill-accent" />
          ) : (
            <MoonIcon className="size-6" />
          )}
        </button>

        <CartList />

        <span className="hidden md:block">
          <SelectChain />
        </span>

        <span className="hidden md:block">
          <WalletButton />
        </span>

        <span className="md:hidden">
          <WalletAvatar />
        </span>
      </div>
    </header>
  )
}

export const WalletButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <button onClick={show} className="rounded-lg bg-accent px-6 py-2">
            {isConnected ? ensName ?? truncatedAddress : 'Connect Wallet'}
          </button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

export const WalletAvatar = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address = '' }) => {
        const style = createAvatar(address)

        if (!isConnected) {
          return (
            <button onClick={show} className="rounded-lg bg-accent px-6 py-2">
              Connect
            </button>
          )
        }

        return (
          <button
            style={style}
            id="avatar"
            onClick={show}
            className="size-12 rounded-full"
          ></button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

const headTitle = {
  [routes.dashboard]: 'Dashboard',
  [routes.trade]: 'Trade',
  [routes.history]: 'History',
  [routes.nfts]: 'NFTs Marketplace',
  [routes.nftStudio]: 'NFTs Studio',
  [routes.myNFTs]: 'Your NFTs Collection'
}

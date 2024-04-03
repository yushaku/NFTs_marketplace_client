import { MoonIcon, SunIcon } from '@heroicons/react/16/solid'
import { ConnectKitButton } from 'connectkit'
import { useLocation } from 'react-router-dom'
import { SelectChain } from '../common/SelectChain'
import { routes } from '@/utils'

type Props = {
  theme: string
  switchTheme: () => void
}

export const Header = ({ theme, switchTheme }: Props) => {
  const location = useLocation().pathname
  const title = headTitle[location as keyof typeof headTitle] ?? 'Home'

  return (
    <header className="mt-5 flex justify-between py-5">
      <h3 className="heading-2xl text-lighterAccent">{title}</h3>

      <div className="flex-center gap-3">
        <button className="p-3" onClick={switchTheme}>
          {theme === 'light' ? (
            <SunIcon className="size-6 fill-accent" />
          ) : (
            <MoonIcon className="size-6" />
          )}
        </button>

        <SelectChain />
        <WalletButton />
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

const headTitle = {
  [routes.dashboard]: 'Dashboard',
  [routes.trade]: 'Trade',
  [routes.history]: 'History',
  [routes.nfts]: 'NFTs Marketplace',
  [routes.myNFTs]: 'Your NFTs Collection'
}

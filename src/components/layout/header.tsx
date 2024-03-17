import { MoonIcon, SunIcon } from '@heroicons/react/16/solid'
import { ConnectKitButton } from 'connectkit'
import { useLocation } from 'react-router-dom'

type Props = {
  theme: string
  switchTheme: () => void
}

export const Header = ({ theme, switchTheme }: Props) => {
  const location = useLocation().pathname
  const pathName = location.slice(1, 2).toUpperCase().concat(location.slice(2))

  return (
    <header className="flex justify-between py-5 mt-5">
      <h3 className="heading-2xl text-lighterAccent">{pathName}</h3>

      <div className="flex-center gap-3">
        <button className="p-3" onClick={switchTheme}>
          {theme === 'light' ? (
            <SunIcon className="w-6 h-6 fill-accent" />
          ) : (
            <MoonIcon className="w-6 h-6" />
          )}
        </button>

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
          <button onClick={show} className="px-6 py-2 rounded-lg bg-accent">
            {isConnected ? ensName ?? truncatedAddress : 'Connect Wallet'}
          </button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

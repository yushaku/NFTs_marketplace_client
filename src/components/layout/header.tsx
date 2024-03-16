import { MoonIcon, SunIcon } from '@heroicons/react/16/solid'
import { ConnectKitButton } from 'connectkit'

type Props = {
  theme: string
  switchTheme: () => void
}

export const Header = ({ theme, switchTheme }: Props) => {
  return (
    <header className="flex justify-between py-5">
      <h3 className="heading-xl">Hello world</h3>

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

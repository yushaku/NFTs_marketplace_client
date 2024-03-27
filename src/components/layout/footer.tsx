import { Link } from 'react-router-dom'
import { Github } from '../icons/Github'
import { Telegram } from '../icons/Telegram'
import { TwitterX } from '../icons/TwitterX'

export const Footer = () => {
  const now = new Date().getFullYear()
  return (
    <footer className="my-10 flex items-center justify-between">
      <p className="flex gap-4 text-sm">
        <span>© {now} Yushaku DEX</span> |
        <Link className="hover:text-accent" to={'#'}>
          White paper
        </Link>
      </p>

      <ul className="flex gap-5">
        {socials.map(({ title, url, icon: Icon }) => (
          <li key={title}>
            <Link to={url} className="block rounded-lg p-3 hover:bg-layer">
              <Icon className="size-5" />
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  )
}

const socials = [
  {
    icon: TwitterX,
    title: 'Twitter',
    url: 'https://twitter.com/daohaus'
  },
  {
    icon: Github,
    title: 'Github',
    url: 'https://twitter.com/daohaus'
  },
  {
    icon: Telegram,
    title: 'Telegram',
    url: 'https://twitter.com/daohaus'
  }
]

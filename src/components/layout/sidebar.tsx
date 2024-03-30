import logo from '/logo.png'
import { routes } from '@/utils'
import {
  ArrowPathIcon,
  BanknotesIcon,
  CalendarIcon,
  HomeIcon,
  PaperClipIcon,
  PhotoIcon
} from '@heroicons/react/16/solid'
import { Link, NavLink, useLocation } from 'react-router-dom'

export const Sidebar = () => {
  const location = useLocation().pathname

  return (
    <section className="z-50 h-screen w-72 bg-layer">
      <Link to="/" className="flex items-center gap-3 p-8">
        <img src={logo} className="size-10" alt="Vite logo" />
        <h3 className="heading-2xl text-lighterAccent">Yushaku</h3>
      </Link>

      <span className="mx-auto block h-px w-3/5 bg-gray-400/30" />

      <ul className="mt-4 space-y-4">
        {navlinks.map(({ href, title, icon: Icon }) => {
          const pickedStyle = location.includes(href)
            ? 'border-l-accent border-l-4 bg-focus'
            : ''

          return (
            <li key={href}>
              <NavLink
                to={href}
                className={`${pickedStyle} group flex gap-3  px-8 py-5 hover:border-l-4 hover:border-l-accent hover:bg-focus`}
              >
                <Icon className="size-6 group-hover:fill-accent" />
                {title}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

const navlinks = [
  {
    icon: HomeIcon,
    title: 'Dashboard',
    href: routes.dashboard
  },
  {
    icon: ArrowPathIcon,
    title: 'Trade',
    href: routes.trade
  },
  {
    icon: PhotoIcon,
    title: 'NFTs',
    href: routes.nfts
  },
  {
    icon: BanknotesIcon,
    title: 'Vaults',
    href: routes.vaults
  },
  {
    icon: CalendarIcon,
    title: 'History',
    href: routes.history
  },
  {
    icon: PaperClipIcon,
    title: 'Bridge',
    href: routes.bridge
  }
]

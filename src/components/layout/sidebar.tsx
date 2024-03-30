import { routes } from '@/utils'
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  BanknotesIcon,
  CalendarIcon,
  HomeIcon,
  PaperClipIcon,
  PhotoIcon
} from '@heroicons/react/16/solid'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '/logo.png'

export const Sidebar = () => {
  const location = useLocation().pathname
  const [isSmall, setIsSmall] = useState(false)

  return (
    <section
      className={`${isSmall ? 'w-16' : 'w-72'} relative z-50 h-screen bg-layer transition-all duration-300`}
    >
      <Link
        to="/"
        className={`flex items-center gap-3 ${isSmall ? 'px-2 py-8' : 'p-8'}`}
      >
        <img src={logo} className="size-10" alt="Vite logo" />
        <h3
          className={`${isSmall ? 'hidden' : 'block'} heading-2xl text-lighterAccent`}
        >
          Yushaku
        </h3>
      </Link>

      <span
        className="absolute -right-3 top-[8%] rounded-full bg-background p-2 hover:bg-focus"
        onClick={() => setIsSmall(!isSmall)}
      >
        <ArrowLeftIcon
          className={`${isSmall ? 'rotate-180' : ''} size-4 stroke-gray-600 transition-all duration-300`}
        />
      </span>

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
                className={`${pickedStyle} ${isSmall ? 'px-4 py-5' : 'px-8 py-5'} group flex gap-3 hover:border-l-4 hover:border-l-accent hover:bg-focus`}
              >
                <Icon className="size-6 group-hover:fill-accent" />
                <span className={`${isSmall ? 'hidden' : 'block'}`}>
                  {title}
                </span>
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

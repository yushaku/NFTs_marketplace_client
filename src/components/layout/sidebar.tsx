import {
  ArrowPathIcon,
  BanknotesIcon,
  BeakerIcon,
  CalendarIcon,
  HomeIcon,
  PaperClipIcon
} from '@heroicons/react/16/solid'
import { Link, NavLink, useLocation } from 'react-router-dom'
import viteLogo from '/vite.svg'

export const Sidebar = () => {
  const location = useLocation().pathname

  return (
    <section className="h-screen w-72 bg-layer">
      <Link to="/" className="flex gap-3 items-center p-8">
        <img src={viteLogo} className="size-10" alt="Vite logo" />
        <h3 className="heading-2xl">Yushaku</h3>
      </Link>

      <span className="block h-[1px] w-3/5 mx-auto bg-gray-400/30" />

      <ul className="space-y-4 mt-4">
        {links.map(({ href, title, icon: Icon }) => {
          const pickedStyle =
            location === href ? 'border-l-accent border-l-4 bg-focus' : ''

          return (
            <li key={href}>
              <NavLink
                to={href}
                className={`${pickedStyle} heading-4 group flex gap-3  hover:bg-focus px-8 py-5 hover:border-l-accent hover:border-l-4`}
              >
                <Icon className="w-6 h-6 group-hover:fill-accent" />
                {title}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

const links = [
  {
    icon: HomeIcon,
    title: 'Dashboard',
    href: '/dashboard'
  },
  {
    icon: BeakerIcon,
    title: 'Core pool',
    href: '/pool'
  },
  {
    icon: BanknotesIcon,
    title: 'Vaults',
    href: '/vaults'
  },
  {
    icon: ArrowPathIcon,
    title: 'Swap',
    href: '/swap'
  },
  {
    icon: CalendarIcon,
    title: 'History',
    href: '/history,'
  },
  {
    icon: PaperClipIcon,
    title: 'Bridge',
    href: '/bridge,'
  }
]

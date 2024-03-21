/* eslint-disable @typescript-eslint/no-explicit-any */
import CountUp from 'react-countup'
import '@/styles/landing.css'
import TypeIt from 'typeit-react'
import {
  CubeTransparentIcon,
  EllipsisHorizontalIcon,
  GlobeAltIcon
} from '@heroicons/react/16/solid'
import { Link } from 'react-router-dom'
import { routes } from '@/utils'

export const Home = () => {
  return (
    <section className="bg-background relative no-scrollbar overflow-hidden">
      <Navbar />
      <TopIntro />
      <Safety />
      <Backer />
    </section>
  )
}

const Navbar = () => {
  const componets = ['Intro', 'About', 'Features', 'Invester', 'FAQ']

  return (
    <header className="container flex justify-between items-center py-5 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img src="/favicon.ico" />
        <h2 className="font-bold text-2xl">Yushaku</h2>
      </div>

      <ul className="flex-center gap-5">
        {componets.map((component, index) => (
          <li key={index} className="text-white hover:text-lighterAccent">
            <a href={`#${component}`}>{component}</a>
          </li>
        ))}
        <li className="gradient_accent btn z-50">
          <Link to={routes.trade}>Launch App</Link>
        </li>
      </ul>
    </header>
  )
}

const TopIntro = () => {
  return (
    <div
      id="Intro"
      className="bg-[url('/grid.svg')] bg-cover h-screen w-full flex-center flex-col text-center"
    >
      <p className="px-4 py-2 rounded-full bg-layer text-sm">
        Take back control from CEXs
      </p>

      <h3 className="text-4xl mt-10 text_gradient font-bold">
        <TypeIt
          options={{
            strings: ['Decentralized trading'],
            waitUntilVisible: true
          }}
        />
      </h3>
      <h2 className="text-[80px] -mt-6 font-bold">Powerhouse</h2>

      <p className="text-2xl mt-5 text-gray-300">
        Lightning-fast orderbook DEX with powerful <br /> trading features &
        cross-margining for max efficiency.
      </p>

      <Link to={routes.trade} className="gradient_accent btn mt-10 z-50">
        Start Trading
      </Link>

      <ul className="flex mt-24 gap-12">
        <li className="px-4 py-5 hover:bg-layer rounded-xl">
          <p className="mb-3 text-gray-300">Total Volums</p>

          <h4 className="text-3xl font-bold">
            $<CountUp end={60} />
            B+
          </h4>
        </li>

        <li className="px-4 py-5 hover:bg-layer rounded-xl">
          <p className="mb-3 text-gray-300">Total Markets</p>
          <h4 className="text-3xl font-bold">
            <CountUp end={30} />+
          </h4>
        </li>

        <li className="px-4 py-5 hover:bg-layer rounded-xl">
          <p className="mb-3 text-gray-300">Number of Traders</p>
          <h4 className="text-3xl font-bold">
            <CountUp end={20} />
            k+
          </h4>
        </li>
      </ul>
    </div>
  )
}

const Backer = () => {
  const backerList = [
    '/brain-holdings.png',
    '/colab.png',
    '/hrt.png',
    'jane_street.png'
  ]

  return (
    <div id="Invester" className="flex-center flex-col py-24">
      <p className="font-bold">INVESTORS</p>
      <h2 className="text_gradient text-5xl font-bold">
        {'Investors & Partners'}
      </h2>
      <p className="text-xl mt-5">
        Industry-leading market makers and venture capital firms.
      </p>

      <ul className="flex-center gap-5 my-10 flex-wrap">
        {backerList.map((backer) => (
          <li className="w-[200px] h-[110px] z-10 flex-center p-5 hover:bg-focus bg-layer rounded-lg">
            <img src={backer} alt="backer" />
          </li>
        ))}
      </ul>
    </div>
  )
}

const Safety = () => {
  const data = [
    {
      title: 'Decentralized',
      desc: 'Access an immutable money market directly on-chain. ',
      icon: GlobeAltIcon
    },
    {
      title: 'BEP-20/ERC-20',
      desc: 'All Venus Protocol assets are bound by the BEP-20 and ERC-20 standards.',
      icon: CubeTransparentIcon
    },
    {
      title: 'Multichain',
      desc: 'Built on EVM-compatible chains for fast, secure, and low cost transactions',
      icon: EllipsisHorizontalIcon
    }
  ]

  return (
    <div className="container flex-center flex-col my-24">
      <h3 className="text_gradient font-bold text-3xl">Safety before all</h3>
      <p className="mt-5">
        Transact with confidence, knowing Venus places nothing before the
        security of your assets
      </p>

      <ul className="mt-20 flex-center gap-5 flex-wrap">
        {data.map(({ title, desc, icon: Icon }, index) => (
          <li
            key={index}
            className="w-[300px] p-5 bg-layer hover:bg-focus h-[250px] rounded-xl"
          >
            <Icon className="size-10 mb-10 mt-5" />
            <h4 className="text-2xl font-bold">{title}</h4>
            <p className="text-gray-400 mt-2">{desc}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

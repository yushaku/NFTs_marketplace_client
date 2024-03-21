import { routes } from '@/utils'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const NftDashboard = () => {
  const [selected, setSelected] = useState(collections[0])

  return (
    <section className="w-full">
      <div className="relative group">
        <img
          className="w-full h-[600px] object-cover"
          src={selected.img}
          alt="NFT"
        />
        <article className="absolute inset-0 w-full bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-[rgba(255,255,255,0.5)]" />
        <article className="absolute bottom-0 left-0 p-10 pb-24">
          <div className="animate translate-y-20 group-hover:translate-y-0">
            <h4 className="text-2xl font-bold">{selected.name}</h4>
            <h4 className="text-base">BY {selected.author}</h4>
          </div>

          <div className="mt-6 flex items-center gap-5 animate delay-150 opacity-0 group-hover:opacity-100">
            <p>
              <p className="text-gray-300 text-xs">FLOOR PRICE</p>
              <p>4.15 ETH</p>
            </p>
            <p>
              <p className="text-gray-300 text-xs">1D VOLUME</p>
              <p>49.15 ETH</p>
            </p>

            <Link
              to={`${routes.nfts}/${selected.address}`}
              className="btn btn-outline flex-start animate delay-300 opacity-0 group-hover:opacity-100"
            >
              <span>View collection</span>
              <ArrowRightIcon className="size-5" />
            </Link>
          </div>
        </article>
      </div>

      <ul className="relative grid grid-cols-5 gap-5 -translate-y-[50px]">
        {collections.map((col, index) => {
          return (
            <li
              className="group relative cursor-pointer animate hover:-translate-y-2 overflow-hidden"
              onClick={() => setSelected(col)}
              key={index}
            >
              <img
                src={col.img}
                alt="NFT"
                className="w-full h-[150px] animate group-hover:scale-110"
              />
              <h3 className="text-sm text-gray-300 animate font-bold z-10 absolute bottom-0 p-4 group-hover:-bottom-6 group-hover:opacity-0">
                {col.author}
              </h3>
              <article className="group-hover:-bottom-5 absolute inset-0 w-full bg-gradient-to-t from-[rgba(0,0,0,1)] to-[rgba(255,255,255,0.2)]" />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

const collections = [
  {
    name: 'Pudgy Penguins',
    author: 'PUDGY PENGUINS',
    authorImg:
      'https://images.blur.io/_blur-prod/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/7387-2a29cab51c8c73ac?w=64&h=64',
    address: '0x14a9c99d89106F66C2B86910d2C622Ce0A58C630',
    img: 'https://images.blur.io/_blur-prod/_assets/homepage/covers/bayc-1.png?w=1560&format=png'
  },
  {
    name: 'Pudgy Penguins',
    author: 'PUDGY PENGUINS',
    address: '0x14a9c99d89106F66C2B86910d2C622Ce0A58C630',
    authorImg:
      'https://images.blur.io/_blur-prod/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/7387-2a29cab51c8c73ac?w=64&h=64',
    img: 'https://images.blur.io/_blur-prod/_assets/homepage/covers/pudgy-cover2.png?w=1560&format=png'
  },
  {
    name: 'Pudgy Penguins',
    author: 'PUDGY PENGUINS',
    address: '0x14a9c99d89106F66C2B86910d2C622Ce0A58C630',
    authorImg:
      'https://images.blur.io/_blur-prod/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/7387-2a29cab51c8c73ac?w=64&h=64',
    img: 'https://images.blur.io/_blur-prod/_assets/homepage/covers/azuki-1.png?w=1560&format=png'
  },
  {
    name: 'Pudgy Penguins',
    author: 'PUDGY PENGUINS',
    address: '0x14a9c99d89106F66C2B86910d2C622Ce0A58C630',
    authorImg:
      'https://images.blur.io/_blur-prod/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/7387-2a29cab51c8c73ac?w=64&h=64',
    img: 'https://i.seadn.io/gae/5c-HcdLMinTg3LvEwXYZYC-u5nN22Pn5ivTPYA4pVEsWJHU1rCobhUlHSFjZgCHPGSmcGMQGCrDCQU8BfSfygmL7Uol9MRQZt6-gqA?w=886'
  },
  {
    name: 'Pudgy Penguins',
    author: 'PUDGY PENGUINS',
    address: '0x14a9c99d89106F66C2B86910d2C622Ce0A58C630',
    authorImg:
      'https://images.blur.io/_blur-prod/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/7387-2a29cab51c8c73ac?w=64&h=64',
    img: 'https://i.seadn.io/gae/0rRqgbEAHfee51ZWv0Crstfq_o3cHB7JdOwMMG0QPKqncTtkTvtTrEaLUcUysJHeLrLQ6UgtXmJB2-8xP3p-Z2_fhgnl6MgQmOY2?w=500&auto=format'
  }
]

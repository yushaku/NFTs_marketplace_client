import { ArrowRightIcon } from '@heroicons/react/20/solid'

export const NftDashboard = () => {
  return (
    <section className="w-full">
      <div className="relative">
        <img
          className="w-full h-[600px] object-cover"
          src="https://images.blur.io/_blur-prod/_assets/homepage/covers/kanpai.png?w=1560"
          alt="NFT"
        />
        <article className="absolute inset-0 w-full bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-[rgba(255,255,255,0.5)]" />
        <article className="absolute bottom-0 left-0 p-10 pb-24">
          <h4 className="text-2xl font-bold">Kanpai Pandas</h4>
          <h4 className="text-base">BY KANPAI PANDAS</h4>

          <div className="mt-6 flex items-center gap-5">
            <p>
              <p className="text-gray-300 text-xs">FLOOR PRICE</p>
              <p>4.15 ETH</p>
            </p>
            <p>
              <p className="text-gray-300 text-xs">1D VOLUME</p>
              <p>49.15 ETH</p>
            </p>

            <button className="btn btn-outline flex-start">
              <span>View collection</span>
              <ArrowRightIcon className="size-5" />
            </button>
          </div>
        </article>
      </div>

      <ul className="relative grid grid-cols-5 gap-5 -translate-y-[50px]">
        {collections.map((col, index) => {
          return (
            <li
              className="group relative transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              key={index}
            >
              <img
                src={col.img}
                alt="NFT"
                className="w-full h-[150px] transition-all duration-500 group-hover:scale-110"
              />
              <h3 className="text-sm text-gray-300 transition-all duration-500 font-bold z-10 absolute bottom-0 p-4 group-hover:-bottom-6 group-hover:opacity-0">
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
    img: 'https://images.blur.io/_blur-prod/_assets/homepage/covers/bayc-1.png?w=1560&format=png'
  },
  {
    name: 'Pudgy Penguins',
    author: 'PUDGY PENGUINS',
    authorImg:
      'https://images.blur.io/_blur-prod/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/7387-2a29cab51c8c73ac?w=64&h=64',
    img: 'https://images.blur.io/_blur-prod/_assets/homepage/covers/pudgy-cover2.png?w=1560&format=png'
  },
  {
    name: 'Pudgy Penguins',
    author: 'PUDGY PENGUINS',
    authorImg:
      'https://images.blur.io/_blur-prod/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/7387-2a29cab51c8c73ac?w=64&h=64',
    img: 'https://images.blur.io/_blur-prod/_assets/homepage/covers/azuki-1.png?w=1560&format=png'
  },
  {
    name: 'Pudgy Penguins',
    author: 'PUDGY PENGUINS',
    authorImg:
      'https://images.blur.io/_blur-prod/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/7387-2a29cab51c8c73ac?w=64&h=64',
    img: 'https://i.seadn.io/gae/5c-HcdLMinTg3LvEwXYZYC-u5nN22Pn5ivTPYA4pVEsWJHU1rCobhUlHSFjZgCHPGSmcGMQGCrDCQU8BfSfygmL7Uol9MRQZt6-gqA?w=886'
  },
  {
    name: 'Pudgy Penguins',
    author: 'PUDGY PENGUINS',
    authorImg:
      'https://images.blur.io/_blur-prod/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/7387-2a29cab51c8c73ac?w=64&h=64',
    img: 'https://i.seadn.io/gae/0rRqgbEAHfee51ZWv0Crstfq_o3cHB7JdOwMMG0QPKqncTtkTvtTrEaLUcUysJHeLrLQ6UgtXmJB2-8xP3p-Z2_fhgnl6MgQmOY2?w=500&auto=format'
  }
]

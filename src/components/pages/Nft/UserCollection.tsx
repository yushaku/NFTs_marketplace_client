import { Input } from '@/components/common/Input'
import { NFT_ADRESS, routes } from '@/utils'
import { Link } from 'react-router-dom'

export const UserCollection = () => {
  return (
    <div className="flex gap-20">
      <article className="w-1/2">
        <h3 className="mt-10 text-lg">Import your collection address here</h3>
        <Input className="mt-5 w-1/2" />
      </article>

      <article className="w-1/2">
        <h3 className="mt-10 text-lg">Your collection</h3>
        <ul className="mt-5">
          <li className="text-lighterAccent">
            <Link to={`${routes.myNFTs}/${NFT_ADRESS}`}>collection 1</Link>
          </li>
        </ul>
      </article>
    </div>
  )
}

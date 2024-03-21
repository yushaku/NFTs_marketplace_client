import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout'
import { Dashboard } from './components/pages/Dashboard'
import { Nfts } from './components/pages/Nft'
import { NftDetail } from './components/pages/Nft/NftDetail'
import { NotMatch } from './components/pages/Notmatch'
import { Swap } from './components/pages/Swap'
import { Home } from './components/pages/home'
import { routes } from './utils'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path={routes.dashboard} element={<Dashboard />} />
          <Route path={routes.trade} element={<Swap />} />
          <Route path={routes.nfts} element={<Nfts />} />
          <Route path={`${routes.nfts}/:id`} element={<NftDetail />} />
          <Route path="*" element={<NotMatch />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

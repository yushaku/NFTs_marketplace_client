import { Layout } from './components/layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/pages/home'
import { Dashboard } from './components/pages/Dashboard'
import { NotMatch } from './components/pages/Notmatch'
import { Swap } from './components/pages/Swap'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="*" element={<NotMatch />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

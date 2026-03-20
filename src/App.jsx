import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Browse from './pages/Browse'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}>
            <Route path=":productId" element={<ProductPage />} />
          </Route>  
          <Route path='browse' element={<Browse />}>
            <Route path=":productId" element={<ProductPage />} />
          </Route>
          <Route path="cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

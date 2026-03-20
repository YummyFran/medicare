import { createContext, useContext, useState } from "react"

const ProductContext = createContext()

export function useProduct() {
  return useContext(ProductContext)
}

export function ProductProvider({ children }) {
  const [product, setProduct] = useState({})

  const clearProduct = () => {
    setProduct({})
  }

  return (
    <ProductContext.Provider value={{ product, setProduct, clearProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

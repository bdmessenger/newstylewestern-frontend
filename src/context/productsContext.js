import { useState, createContext } from 'react'
import SHOP_DATA from 'shop/index'

export const ProductsContext = createContext()

const ProductsContextProvider = ({children}) => {
    const [sortType, setSortType] = useState(1)
    const handleSort = (a, b) => {
        switch(sortType) {
            case 1:
                if(a.title > b.title) return 1
                if(a.title < b.title) return -1
                return 0
            case 2:
                if(a.title < b.title) return 1
                if(a.title > b.title) return -1
                return 0
            case 3:
                if(a.price > b.price) return 1
                if(a.price < b.price) return -1
                return 0
            case 4:
                if(a.price > b.price) return -1
                if(a.price < b.price) return 1
                return 0
            default:
                return 0
        }
    }
    const quantities = [15,10,9,12,0,14,15,20]
    const products = SHOP_DATA.map((product, i) => ({...product, quantity: quantities[i] ? quantities[i] : 0, sizes: ['SM', 'MD', 'LG', 'XL']})).sort(handleSort)

    return (
        <ProductsContext.Provider value={{ products, setSortType }}>
            { children }
        </ProductsContext.Provider>
    )
}

export default ProductsContextProvider
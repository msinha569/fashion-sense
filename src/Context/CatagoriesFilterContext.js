
import React, { createContext, useContext } from '../Utils/CustomUtils'
import { useProductDataContext } from './ProductListingPageContext'
import { useFilterContext } from './FilterContext'
const categoriesFilterContext = createContext()

export const useCatagoriesFilterContext = () => useContext(categoriesFilterContext)

// we are passing the state from filterContext and then further passing it as values in the provider, this file shouldnt be a context
//productData name is confusing here -- change it

const CatagoriesFilterContext = ({children}) => {
    const {state} = useFilterContext()
    const {sort, slider, rating, stock, search,category} = state
    const {productData} = useProductDataContext()
    const sortFunction = (productData,sort) => {
        const sortedProductData = [...productData]
        if(sort)
        return sortedProductData.sort((a,b) => a.price - b.price)
        else
        return sortedProductData.sort((a,b) => b.price - a.price)
    }
    const ratingFunction = (productData,rating) => {
        const sortedProductData = [...productData]
        if(rating)
            return sortedProductData.filter((product) => product.rating === rating)
        return sortedProductData
    }
    const categoryFunction = (productData, category) => {
        const sortedProductData = [...productData]
        if (category.diesel && category.petrol && category.ev)
            return sortedProductData
        if (category.petrol && category.ev)
            return sortedProductData.filter((product) => product.categoryName !== "diesel")
        if (category.petrol && category.diesel)
            return sortedProductData.filter((product) => product.categoryName !== "ev")
        if (category.diesel && category.ev)
            return sortedProductData.filter((product) => product.categoryName !== "petrol")
        if (category.petrol)
            return sortedProductData.filter((product) => product.categoryName === "petrol")
        if (category.ev)
            return sortedProductData.filter((product) => product.categoryName === "ev")
        if (category.diesel)
            return sortedProductData.filter((product) => product.categoryName === "diesel")
    
        return sortedProductData
    }
    const stockFuntion = (productData,stock) => {
        const sortedProductData = [...productData]
        if (stock)
            return sortedProductData.filter((product) => product.inStock === true)
        else
            return sortedProductData
    }
    const sliderFunction = (productData,slider) => {
        const sortedProductData = [...productData]
        if(slider)
            return sortedProductData.filter((product) => product.price >= slider)
        else
            return sortedProductData
    }
    const searchFunction = (productData, search) => {
        const sortedProductData = [...productData]
        if (search){
            return sortedProductData.filter((product) => 
                product.title.toLowerCase().includes(search.toLowerCase())
            )
        }else
            return sortedProductData
    }

    const sortedData = sortFunction(productData, sort)
    const finalData = ratingFunction(sortedData, rating)
    const stockData = stockFuntion(finalData, stock)
    const finalCategoryData = categoryFunction(stockData, category)
    const sliderData = sliderFunction(finalCategoryData, slider)
    const searchData = searchFunction(sliderData, search)


  return (
    <div>
      <categoriesFilterContext.Provider value={{sort, rating,stock,category,slider,search,searchData}}>
        {children}
      </categoriesFilterContext.Provider>
    </div>
  )
}

export default CatagoriesFilterContext

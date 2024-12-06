import toast from 'react-hot-toast';
import { getProductData } from '../Services/getProductData';
import { useContext, createContext, useReducer, useEffect } from "react";
import { useLocation } from 'react-router-dom';

const productDataContext = createContext()

export const useProductDataContext = () => useContext(productDataContext)

const reducerfn = (state, action) => {
    switch (action.type){
        case "APIPRODUCTDATA" :
  
            return ({...state, productData: action.payload})
        case "LOADINGSPINNER" :
            return({...state, isLoading: action.payload})
        default:
            return state

    }
}


const ProductListingPageContext = ({children}) => {
    const location = useLocation()
    const[state, dispatch] = useReducer(reducerfn, {
        productData: [],
        isLoading: false
    })
    

    
    // Dependency: Are we on the product listing page or not?
    const isProductListingPage = location.pathname === '/'; // Adjust this for your actual listing page path

    useEffect(() => {

        if (isProductListingPage && state.productData.length === 0) {
            // Only fetch data when we are on the listing page and data hasn't been fetched yet
            dispatch({ type: "LOADINGSPINNER", payload: true });
            getProductData(dispatch);
        }
    }, [isProductListingPage, state.productData.length]);
    
    const {productData, isLoading} = state

    return(
        <div>
            <productDataContext.Provider value={{dispatch, state, productData, isLoading}}>
                {children}
            </productDataContext.Provider>
        </div>
    )
}

export default ProductListingPageContext
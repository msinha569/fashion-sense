import { createContext, useContext,  useEffect,  useReducer } from "react";
import { useCatagoriesFilterContext } from "./CatagoriesFilterContext";
import { getSingleProductData } from "../Services/getProductData";

const getAProduct = createContext()
export const useSearchForProduct = () => useContext(getAProduct)


const SearchForProductProvider = ({children}) => {

    const reducerfn = (state, action) => {
        switch (action.type){
            case "SET_SINGLE_PRODUCT":
                 return {...state, singleProduct: action.payload}
            case "SET_PRODUCT_ID":
                 return {...state, productId: action.payload}
            default:
                 return state
        }
    }
    const {searchData} = useCatagoriesFilterContext()
    const [state, dispatch] = useReducer(reducerfn, {
        singleProduct: {},
        productId: ''

    })
       
    useEffect(() => {
        if (state.productId){
            if (searchData.length===0){
                getSingleProductData(state.productId,dispatch)
          }else{
                searchFunction(state.productId)
          }

        }
       
    }, [state.productId])

   
 
    const searchFunction = async(productId) => {  
        const reqProduct = await searchData.find((product) => product._id === productId)

        if (reqProduct){
            dispatch({type:"SET_SINGLE_PRODUCT", payload: reqProduct})
        }
    }


    return (
        <div>
            <getAProduct.Provider
             value={{productId: state.productId, singleProduct: state.singleProduct, dispatch}}>
                {children}
            </getAProduct.Provider>
        </div>
    )
}

export default SearchForProductProvider
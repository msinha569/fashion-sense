import { createContext, useContext, useReducer } from "react";


const ProductContext = createContext()
export const useProductContext = () => useContext(ProductContext)

const reducerfn = (state, action) => {
    switch (action.type){
        case "CART":
            return {...state, cart: action.payload}
        case "WISH":
            return {...state, wish: action.payload || []}
        case "COUPAN":
            return {...state, coupan: action.payload}
        case "TOTALPRICE":
            return {...state, totalPrice: action.payload}
        case "ORDERDATA":
            return {...state, orderData: action.payload}
        default: 
            return state
    }
}

const ProductContextPage = ({children}) => {

    const [state, dispatch] = useReducer(reducerfn, {
        cart: [],
        wish: [],
        coupan: "",
        totalPrice: 0,
        orderData: []
    })

    return(
    
            <ProductContext.Provider value={{
                state, dispatch
            }}>
                {children}
            </ProductContext.Provider>
   
    )
}
export default ProductContextPage
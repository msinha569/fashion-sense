import { createContext, useContext, useEffect } from "react";
import { useProductContext } from "./ProductContext";


const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

const CartPageContext = ({children}) => {



    const {state, dispatch} = useProductContext()
    const {cart, totalPrice} = state
    useEffect(() => {
        console.log(cart);
        
    },[cart])
    let discount = totalPrice  //add discount logic here

    return(
     
            <CartContext.Provider value={{cart, totalPrice, discount, dispatch}}>
                {children}
            </CartContext.Provider>
       
    )
}
export default CartPageContext

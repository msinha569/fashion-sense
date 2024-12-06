import { createContext, useContext } from "react";
import { useProductContext } from "./ProductContext";


const WishContext = createContext()
export const useWishContext = () => useContext(WishContext)

const WishListContext = ({children}) => {
    const {state, dispatch} = useProductContext()
    const {wish} = state

    console.log("Wishlist state:", wish);


    return(
  
            <WishContext.Provider
                value={{
                    dispatch,
                    wish
                }}>
                    {children}
            </WishContext.Provider>
      
    )
}
export default WishListContext
import { Toaster } from "react-hot-toast"
import App from "./App"
import CatagoriesFilterContext from "./Context/CatagoriesFilterContext"
import FilterContext from "./Context/FilterContext"
import ProductListingPageContext from "./Context/ProductListingPageContext"
import SearchForProductProvider from "./Context/SearchForProduct"
import LoginPageContext from "./Context/LoginPageContext"
import ProductContextPage from "./Context/ProductContext"
import CartPageContext from "./Context/CartPageContext"
import WishListContext from "./Context/WishlistPageContext"


 const PageStructure = () => {
return(
    <div>
        <Toaster position="top-center" reverseOrder={false}/>
        <LoginPageContext>
            <ProductContextPage>
                <WishListContext>
                    <CartPageContext>
                        <ProductListingPageContext> 
                            <FilterContext>
                                <CatagoriesFilterContext>
                                     <SearchForProductProvider>
                                         <App/>
                                     </SearchForProductProvider>
                                </CatagoriesFilterContext>
                            </FilterContext>
                        </ProductListingPageContext>
                    </CartPageContext>
                </WishListContext>
            </ProductContextPage>
       </LoginPageContext>
    </div>
)
 }
 export default PageStructure
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AccountPage, Authentication, CartPage, CheckoutPage, HomePage, LoginPage, OrderSuccesspage, PageNotFoundPage, ProductListingPage, SignupPage, SingleProductPage, WishListPage } from './Pages/indexOfAllPages'

function App() {
  return (
    <div>
      <Routes>
        <Route  path='/' element ={ <HomePage/>}/>
        <Route path='/AccountPage' element={<AccountPage/>}/>
        <Route path='/CheckoutPage' element={<CheckoutPage/>}/>
        <Route path='/LoginPage' element={<LoginPage/>}/>
        <Route path='/OrderSuccessPage' element={<OrderSuccesspage/>}/>
        <Route path='/SignupPage' element={<SignupPage/>}/>
        <Route path='/ProductListingPage' element={<ProductListingPage/>}/>
        <Route path='/ProductDetails/:id' element={<SingleProductPage/>}/>
        <Route path='/CartPage'
          element={<Authentication><CartPage/></Authentication>} />
        <Route path='/WishListPage'
          element={<Authentication><WishListPage/></Authentication>} />
        <Route path='/AccountsPage'
          element={<Authentication><AccountPage/></Authentication>} />
        <Route path='*' element={<PageNotFoundPage/>}/>
      </Routes>
    </div>
  )
}

export default App


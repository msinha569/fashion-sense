import axios from "axios"
import toast from "react-hot-toast"

export const addToCart = async(productData, dispatch) => {    
   try {
     const response = await axios({
         method: "POST",
         url: '/api/user/cart',
         headers: {Authorization: localStorage.getItem("token")},
         data: {product: productData}
     })
     dispatch({type: "CART", payload: response.data.cart})
     
     toast.success("Added to cart.")
   } catch (error) {
        toast.error("You need to login first")
        console.log(error);    
   }
}

export const removeFromCart = async(_id, dispatch) => {
    if(!_id){
        toast.error("Some error occured")
        return
    }
    try {
        const response = await axios({
            method: "DELETE",
            url: `/api/user/cart/${_id}`,
            headers: {Authorization: localStorage.getItem("token")},
        })
        
        dispatch({type: "CART", payload: response.data.cart})
        toast.success("Removed from cart")
        
    } catch (error) {
        console.log(error);
        
    }
}

export const updateQty = async(actionType, _id, dispatch) => {
   try {
     const response = await axios({
         method: "POST",
         url: `/api/user/cart/${_id}`,
         headers: {Authorization: localStorage.getItem("token")},
         data: {
            action: {
             type: actionType
            }
         }
     })
     dispatch({type: "CART", payload: response.data.cart})

     if (response.status >= 400){
        console.log(response);
        
        if (response.respone && response.respone.data.errors){
            response.respone.data.errors.forEach((error) =>
            toast.error(error)
            )
        }
        toast.error("Something unexpected occured")
     }else{
        toast.success("Success ")
        console.log(response.status);
        
     }
     
   } catch (error) {
        if (error.response && error.response.data.errors){
            error.response.data.errors.forEach((error) =>
            toast.error(error)
            )
        }else{
            console.log(error);
            
        }
   }
}
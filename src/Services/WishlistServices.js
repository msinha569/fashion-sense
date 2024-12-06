import axios from "axios"
import toast from "react-hot-toast"


export const addToWishlist = async(productData, dispatch) => {
try {
        const response = await axios({
            method: "POST",
            url: "/api/user/wishlist",
            headers: {Authorization: localStorage.getItem("token")},
            data: {product: productData}
        })
        dispatch({type: "WISH", payload: response.data.wish})
     
        toast.success("Item added to WishList")
} catch (error) {
        toast.error("You need to login")
        console.log(error);
        
}
}

export const deleteWishlist = async(productId, dispatch) => {
    console.log(productId);
    
    try {
        const response = await axios({
            method: "DELETE",
            url: `/api/user/wishlist/${productId}`,
            headers: {Authorization: localStorage.getItem("token")},
        })
        dispatch({type: "WISH", payload: response.data.wish})
    } catch (error) {
        console.log(error)
        toast.error("Unexpected Error")
    }
}
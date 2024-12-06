

import {toast, axios} from "../Utils/CustomUtils"


export const getProductData = async(dispatch) => {
    dispatch({type: "LOADINGSPINNER", payload: true})
    toast.success("Data is being retrieved");
    try{
        const response = await axios({
            method: "GET",
            url: "/api/products"
        })
        dispatch({type: "APIPRODUCTDATA", payload: response.data.products})
        dispatch({type: "LOADINGSPINNER", payload: false})
    }catch(err){
        toast.error("Error Fetching Data")
        console.log("error fetching data", err)
    }
}

export const getSingleProductData = async(id, dispatch) => {
    toast.success("Data is being retrieved");
    try{
        const response = await axios({
            method: "GET",
            url: `/api/products/${id}`
        })
        dispatch({type:"SET_SINGLE_PRODUCT", payload: response.data.product})
    }catch(err){
        toast.error("Error Fetching Data")
        console.log("Error Occured while fetching is-",err.message)
    }
}
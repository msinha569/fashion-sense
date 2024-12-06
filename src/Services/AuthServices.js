import axios from "axios"
import toast from "react-hot-toast"


export const loginHandler = async(formData, dispatch) => {
    try{
        const response = await axios.post(
            "/api/auth/login", 
            formData
        )
        const {foundUser, encodedToken} = response.data
        const requiredInfo = {
            name: foundUser.name,
            email: foundUser.email
        }
        dispatch({type: "LOGIN", payload: requiredInfo})
        localStorage.setItem("token", encodedToken)
        localStorage.setItem("loginData", JSON.stringify(requiredInfo))
        console.log(encodedToken);
        
        toast.success("Login Successful! Welcome back.")
        console.log(requiredInfo);
        
    }catch(error){
        if (error.response && error.response.data.errors){
            error.response.data.errors.forEach((errMsg) =>
            toast.error(errMsg))
        }else{
            toast.error("Something unexpected happened during Authentication. Try again.")
        }
    }
}


export const signupHandler = async(formData) => {
    try {
         const response = await axios.post(
            "/api/auth/signup",
            formData
        )
        if (response.status === 201){
            toast.success(response.data.message || "Account Created. LogIn now.")
            return true
        }
    } catch (error) {
        if (error.response && error.response.data.errors){
            error.response.data.errors.forEach((errMsg) =>
            toast.error(errMsg))
        }else{
            toast.error("Something unexpected happened during sign up. Try again.")
        }
    }
}


export const logoutHandler = (dispatch) => {
    dispatch({type: "LOGOUT"})
    localStorage.removeItem("token")
    toast.success("User logged out")
}
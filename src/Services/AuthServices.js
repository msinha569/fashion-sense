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
    localStorage.removeItem("loginData")
    toast.success("User logged out")
}

export const tempSignup = async(name, email) => {
    const formData = {
        name: name,
        email: email,
        password: 1234
    }
    try {
        const res = await axios.post('/api/auth/getusertype',{email})
        if (res.data.userType==="temp"){
            const response = await axios.post('/api/auth/signup',formData)
            console.log(response);
        }
        else return
        
    } catch (error) {
        toast.error("unexpected error. please login again")
        console.log(error);
        
    }
}
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { isTokenExpired } from "../Services/TokenValidation";


const LoginContext = createContext()
export const useLoginContext = () => useContext(LoginContext)

const reducerfn = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state, ...action.payload}
        case "LOGOUT":
            return {name: "", email: ""}
        default:
            return state
    }
}




function LoginPageContext({children}) {
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        console.log("useeffect")
        if (isTokenExpired(token)){
            dispatch({type: "LOGOUT"})
        }else{
            const loginData = JSON.parse(localStorage.getItem("loginData"))
            dispatch({type: "LOGIN", payload: loginData})
            console.log(state.name);
            console.log(loginData);
            
        }
      },[])

    const [state, dispatch] = useReducer(reducerfn, {
        name: "",
        email: ""
    })

    const {name, email} = state

    return (
        <div>
        <LoginContext.Provider
        value={{
            name,
            email,
            dispatch
        }}>
            {children}
        </LoginContext.Provider>
        </div>
    )
}

export default LoginPageContext


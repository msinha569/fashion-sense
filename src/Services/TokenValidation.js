import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
    if( !token ) return true

    const decodedToken = jwtDecode(token)
    const currentTime = Date.now() / 1000
    // console.log(token);
    // console.log(decodedToken);
    // console.log(decodedToken.exp);
    // console.log(currentTime);
    
    
    // console.log(decodedToken.exp < currentTime)
    return decodedToken.exp < currentTime
}
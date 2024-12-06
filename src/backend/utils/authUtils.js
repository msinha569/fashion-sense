import dayjs from "dayjs"
import {jwtDecode} from "jwt-decode"
import { Response } from "miragejs"

export const requireAuth = function (request) {
  console.log(request);
  
    const encodedToken = request.requestHeaders.Authorization
    const decodedToken = jwtDecode(
        encodedToken,
        process.env.REACT_APP_JWT_TOKEN
    )
    console.log("here");
    console.log(decodedToken);
    
    
    if (decodedToken){
        console.log("the if block");
        
        const user = this.db.users.findBy({email: decodedToken.email})
        console.log(user._id);
        if (user){
            
            return user._id
        }
    }
    return new Response(
        402,
        {},
        {
            errors: ["The token is invalid. Unauthorized access error."]
        }
    )
}

export const formatDate = () => dayjs().format("YYYY-MM-DDtHH:mm:ssZ")
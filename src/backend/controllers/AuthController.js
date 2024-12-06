import { Response } from "miragejs"
import { uuid } from "../../Utils/CustomUtils"
import { formatDate } from "../utils/authUtils"



const sign = require("jwt-encode")

export const getLoginData = function (schema, request) {

    try{
        const {email, password} = JSON.parse(request.requestBody)
        const foundUser = schema.users.findBy({email})
        if (!foundUser){
            return new Response(
                404,
                {},
                { errors: ["User is not registered. Sign Up!"]
                }) }
        if(password===foundUser.password){
            const encodedToken = sign(
                {
                    email
                },
                process.env.REACT_APP_JWT_SECRET,
                {
                    expiresIn: '1h'
                } )
            foundUser.password = undefined
            return new Response(
                200,
                {},
                {foundUser, encodedToken}
            )}
        return new Response(
            401,
            {},
            {
                errors: ["The credentials you entered are invalid."]
            })
            
    }catch(err){
        return new Response(
            500,
            {},
            {
                errors: ["An internal server error occurred. Please try again later."]
            }
)}} 

export const setSignUpData = (schema, request) => {
    try {
        const { name, email, password } = JSON.parse( request.requestBody)

        if (!name || !email || !password) {
            return new Response(
                400,
                {},
                { errors: ["All fields are required."] }
            );
        }
        
        const foundUser = schema.users.findBy({ email })
        if (foundUser) {
            return new Response(
                422,
                {},
                { errors: ["User already exists"] }
            )
        }
        // no need to use await when dealing with mock db
        const _id = uuid()
        const user = schema.users.create({
            _id: _id,
            name: name,
            email: email,
            password: password, // Hash password in a real application
            createdAt: formatDate(),
            updatedAt: formatDate(),
            cart: [],
            wish: [],
            type: "temp"
        })

        return new Response(
            201,
            {},
            { user: user}
        )
    } catch (error) {
        return new Response(
            500,
            {},
            { errors: ["Internal Server Error"] }
        );
    }
};


export const getUserType = (schema, request) => {
 try {
    console.log(request);
    
       const {email} = JSON.parse(request.requestBody)
       console.log("email");
       
       const user = schema.users.findBy({email})
       if(!user){
           return new Response(
               201,
               {},
               {
                  userType: "temp"
               }
           )
       }
       const userType = user.type
       return new Response(
           201,
           {},
           {
               userType: userType
           }
       )
    } catch (error) {
        return new Response(
            500,
            {},
            {
                errors: ["something unexpected happened while fetching user details"]
            }
        )
    }
}
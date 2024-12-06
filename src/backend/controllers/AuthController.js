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
                    _id: foundUser._id, email
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

        const _id = uuid()
        schema.users.create({
            _id: _id,
            name: name,
            email: email,
            password: password, // Hash password in a real application
            createdAt: formatDate(),
            updatedAt: formatDate(),
            cart: [],
            wishlist: []
        })

        return new Response(
            201,
            {},
            { message: "User Created Successfully" }
        )
    } catch (error) {
        return new Response(
            500,
            {},
            { errors: ["Internal Server Error"] }
        );
    }
};
import { Response } from "miragejs"
import { formatDate, requireAuth } from "../utils/authUtils"


export const addItemToCartHandler = function (schema, request) {
    const userId = requireAuth.call(this, request)
    
    try {
        if (!userId){
            return new Response(
                404,
                {},
                {
                    errors: ["The mail you entered is not Registered"]
                }
            )
        }
        console.log(schema.users.findBy({_id:userId}));
        
        const userCart = schema.users.findBy({_id: userId}).cart
        const {product} = JSON.parse(request.requestBody)
        
        userCart.push({
            ...product,
            createdAt: formatDate(),
            updatedAt: formatDate(),
        })
        
        return new Response(
            201,
            {},
            {
                cart: userCart
            }
        )

    } catch (error) {
        return new Response(
            500,
            {},
            {
                errors: ["Something unexpected happened"]
            }
        )
    }
}


export const removeItemFromCartHandler = function(schema, request) {
    try {
        const userId = requireAuth.call(this, request)
            if (!userId){
                return new Response(
            404,
            {},
            {
                errors: ["The email you entered is not registered"]
            })}
            let userCart = schema.users.findBy({_id: userId}).cart
            const productId = request.params.productId
            
            userCart = userCart.filter((item) => item._id !== productId)
            this.db.users.update({_id: userId}, {cart: userCart})
            return new Response(
                200,
                {},
                {
                    cart: userCart
                }
            )
    } catch (error) {
            return new Response(
                500,
                {},
                {
                    errors: ["Something unexpected happened at the backend side"]
                }
            ) 
    }
}

export const updateCartItemHandler = function(schema, request) {
  try {
      const userId = requireAuth.call(this, request)
      if(!userId){
          return new Response(
              404,
              {},
              {
                  errors: ["User not found"]
              }
          )
      }
      const userCart = schema.users.findBy({_id: userId}).cart
      const productId = request.params.productId
      const {action} = JSON.parse(request.requestBody)
  
      if(action.type === "increment"){
          userCart.forEach((product) =>{
              if(productId === product._id){
                  product.qty += 1
                  product.updatedAt = formatDate()
              }
          })
      } else if(action.type === "decrement"){
            const product = userCart.find((item) => item._id === productId)
                if (product){
                  if (product.qty === 1){
                    return new Response(
                        404,
                        {},
                        {
                            errors: ["Cant Remove Further."]
                        }
                    )
                    
                  }
                  product.qty -= 1
                  product.updatedAt = formatDate()
                    }
                }
      
      
      this.db.users.update({_id: userId}, {cart: userCart})
      return new Response(
          201,
          {},
          {
              cart: userCart
          }
      )
  } catch (error) {
    return new Response(
        500,
        {},
        {errors: ["internal error"]}
    )
  }
}
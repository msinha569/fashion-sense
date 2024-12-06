
import { Response } from "miragejs";
import { formatDate, requireAuth } from "../utils/authUtils"



export const getWishlistItemsHandler = async() => {

}


export const addToWishlistHandler = function(schema, request) {
    const userId = requireAuth.call(this, request)
  try {
      if (!userId){
        
          return new Response(
              404,
              {},
              {
                  errors: ["You need to login first"]
              }
          )
      }
      console.log("here");
      console.log(schema.users.findBy({_id:userId}));

      const userWishlist = schema.users.findBy({_id: userId}).wish 
      console.log("here");
      
      const {product} = JSON.parse(request.requestBody)
      userWishlist.push({
          ...product,
          createdAt: formatDate(),
          updatedAt: formatDate()
      })
      console.log(userWishlist);
      
      return new Response (
          201,{},
          {
              wish: userWishlist  
          }
      )
  } catch (error) {
    return new Response(
        500,
        {},
        {
            errors: ["something unexpected happened at backend"]
        }
    )
  }
}


export const deleteFromWishlistHandler = function   async(schema, request) {
    try {
        const userId = requireAuth.call(this, request)        
        if(!userId){
            return new Response(
                404,
                {},
                {
                    errors: ["Authentication Error"]
                }
            )
        }
        let userWishlist = schema.users.findBy({_id: userId}).wish
        const product_id = request.params.productId  
        console.log(userWishlist);
        
        userWishlist = userWishlist.filter((wish) => wish._id !== product_id)
        console.log(userWishlist);
        this.db.users.update({ _id: userId }, { wish: userWishlist });


        return new Response(
            201,
            {},
            {
                wish: userWishlist
            }
        )
        
    } catch (error) {
        return new Response(
            500,
            {},
            {
                errors: ["Something unexpected happened at the backend"]
            }
        )
    }
}
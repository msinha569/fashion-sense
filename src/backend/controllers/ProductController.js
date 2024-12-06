import { Response } from "miragejs"

export const getAllProductsData = function() {

    return new Response(200, {},{ products: this.db.products } )
} 

export const getSingleProductData = function(schema,request) {
    const productId = request.params.productId

    try{
        const product = schema.products.findBy({_id: productId})
        return new Response(200, {}, product)
    }catch(err){
        return new Response(500, {}, {err})
    }
}
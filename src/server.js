import { Model, RestSerializer, Server } from "miragejs";
import { getAllProductsData, getSingleProductData } from "./backend/controllers/ProductController";
import { products } from "./backend/db/products"
import { users } from "./backend/db/users"
import { getLoginData, setSignUpData } from "./backend/controllers/AuthController";
import { addItemToCartHandler, removeItemFromCartHandler, updateCartItemHandler } from "./backend/controllers/CartController";
import { addToWishlistHandler, deleteFromWishlistHandler } from "./backend/controllers/WishlistController";

export const makeServer = ({environment = 'development'}={}) => {
    return new Server({
        serializers: {
            application: RestSerializer.extend({
              keyForAttribute(attr) {
                // Prevent `_id` from being transformed to `id`
                return attr;
              },
            }),
          },
        environment,
        models: {
            product: Model,
            user: Model,
            cart: Model,
            wish: Model,
            category: Model
        },
        seeds(server) {
            server.logging = false;

            products.forEach((item) => {
              server.create("product", { ...item, qty: 1 });
            });

            users.forEach((item) =>
            server.create("user", {...item, cart: [], wish: []}))
          },

        routes(){
            this.get('/api/products/:productId', getSingleProductData.bind(this))
            this.get('/api/products', getAllProductsData.bind(this))

            this.post('/api/auth/login', getLoginData.bind(this))
            this.post('/api/auth/signup', setSignUpData.bind(this))

            this.post('/api/user/cart', addItemToCartHandler.bind(this))
            this.delete('api/user/cart/:productId', removeItemFromCartHandler.bind(this))
            this.post('api/user/cart/:productId', updateCartItemHandler.bind(this))

            this.post('/api/user/wishlist', addToWishlistHandler.bind(this))
            this.delete('/api/user/wishlist/:productId', deleteFromWishlistHandler.bind(this))
        }
    })
}
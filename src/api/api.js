import axios from "axios";

//This is the api for fetching products data
export async function productsData() {
    const products = await axios.get(
        "https://fakestoreapi.com/products"
        
    );
    return products
}
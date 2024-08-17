import axios from "axios";

export async function productsData() {
    const products = await axios.get(
        // "https://fakestoreapi.in/api/products"
        "https://fakestoreapi.com/products"
        
    );
    return products
}
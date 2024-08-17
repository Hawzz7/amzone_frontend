import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/amazonSlice";

const ProductDetail = () => {
  const { id } = useParams();  // Getting the product id from the URL
  const productsData = useLoaderData();  // Retrieve the loaded data

  const product = productsData.data.find(item => item.id === parseInt(id));  // Find the product by id

  let dispatch = useDispatch()

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto py-10">
      <div className="flex gap-10">
        <div className="w-1/2">
          <img src={product.image} alt={product.title} className="w-full h-auto object-contain" />
        </div>
        <div className="w-1/2 flex flex-col gap-5">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl">${product.price}</p>
          <p>{product.description}</p>
          <button
          onClick={() =>
            dispatch(
              addToCart({
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                category: product.category,
                image: product.image,
                quantity: 1,
              })
            )}
          className="py-2 px-4 rounded bg-[#ead51d] hover:bg-[#b39c28] text-black text-xl font-semibold border border-black">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

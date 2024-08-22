import { Link, useLoaderData } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/amazonSlice";

const ProductCard = () => {
  
  const data = useLoaderData();

  const productsData = data.data;

  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => state.amazonReducer.searchTerm);

  const filteredProducts = productsData.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-4 px-4">
      {filteredProducts.map((item) => (
        <div
          key={item.id}
          className="bg-white h-auto border-[1px] border-gray-200 py-6 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4"
        >
          <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-500">
            {item.category}
          </span>
          <div className="w-full h-auto flex items-center justify-center relative group">
            <img
              className="w-52 h-64 object-contain"
              src={item.image}
              alt="ProductImg"
            />
            <ul className="absolute w-full h-[100px] bg-gray-100 bottom-[-130px] group-hover:-bottom-4 duration-700 flex flex-col justify-center items-end px-2 gap-2">
              <li className="productLi cursor-pointer">
                <Link to={`/product/${item.id}`}>
                  View Details{" "}
                  <span>
                    <ArrowCircleRightIcon />
                  </span>
                </Link>
              </li>
              <li className="productLi">
                Add to Wish List{" "}
                <span>
                  <FavoriteIcon />
                </span>
              </li>
            </ul>
          </div>
          <div className="px-4 bg-white flex flex-col gap-1 z-10">
            <div className="flex items-center justify-between">
              <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">
                {item.title.substring(0, 20)}
              </h2>
              <p className="text-sm text-gray-600 font-semibold">
                ${item.price}
              </p>
            </div>
            <div>
              <p className="text-sm">{item.description.substring(0, 100)}</p>
              <div className="text-yellow-500 flex">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
            </div>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    category: item.category,
                    image: item.image,
                    quantity: 1,
                  })
                )
              }
              className="w-full py-1.5 rounded-md mt-3 text-black font-medium text-base bg-gradient-to-tr from-[#dcbc1a] to-[#ffe771] border border-black hover:from-[#ffe771] hover:to-[#dcbc1a] duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
      {/* {productsData.map((item) => (
        <div
          key={item.id}
          className="bg-white h-auto border-[1px] border-gray-200 py-6 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4"
        >
          <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-500">
            {item.category}
          </span>
          <div className="w-full h-auto flex items-center justify-center relative group">
            <img
              className="w-52 h-64 object-contain"
              src={item.image}
              alt="ProductImg"
            />
            <ul className="absolute w-full h-[100px] bg-gray-100 bottom-[-130px] group-hover:-bottom-4 duration-700 flex flex-col justify-center items-end px-2 gap-2">
              <li className="productLi cursor-pointer">
                <Link to={`/product/${item.id}`}>
                  View Details{" "}
                  <span>
                    <ArrowCircleRightIcon />
                  </span>
                </Link>
              </li>
              <li className="productLi">
                Add to Wish List{" "}
                <span>
                  <FavoriteIcon />
                </span>
              </li>
            </ul>
          </div>
          <div className="px-4 bg-white flex flex-col gap-1 z-10">
            <div className="flex items-center justify-between">
              <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">
                {item.title.substring(0, 20)}
              </h2>
              <p className="text-sm text-gray-600 font-semibold">
                ${item.price}
              </p>
            </div>
            <div>
              <p className="text-sm">{item.description.substring(0, 100)}</p>
              <div className="text-yellow-500 flex">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
            </div>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    category: item.category,
                    image: item.image,
                    quantity: 1,
                  })
                )
              }
              className="w-full py-1.5 rounded-md mt-3 text-black font-medium text-base bg-gradient-to-tr from-[#dcbc1a] to-[#ffe771] border border-black hover:from-[#ffe771] hover:to-[#dcbc1a] duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default ProductCard;

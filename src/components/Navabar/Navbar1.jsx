import amazonLogo from "../../assets/amazon-logo-white.png";
import SearchIcon from "@mui/icons-material/Search";
import CartIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar1 = () => {
  const products = useSelector((state) => state.amazonReducer.products);
  const userInfo = useSelector((state) => state.amazonReducer.userInfo);



  return (
    <nav>
      <div className="w-full h-[150px] sm:h-[70px] bg-[#1b1a31] flex flex-col sm:flex-row items-center justify-between  px-4 py-4 gap-6">
        <div className="w-full flex items-center justify-between cursor-pointer">
          <Link to="/">
            <img
              className="h-8 duration-100 hover:outline hover:outline-1 hover:outline-gray-400 hover:outline-offset-8"
              src={amazonLogo}
              alt="amazon-logo"
            />
          </Link>

          <div className="flex sm:hidden  gap-4">
            <Link to="/signin">
              <div className="text-white">
                <p>Hello, {userInfo?.data?.user?.name || "Sign in"}</p>
              </div>
            </Link>

            <Link to="/cart">
              <div className="relative">
                <CartIcon className="text-white text-3xl" />
                <span className="absolute top-[-4px] left-[8px] w-2 font-semibold p-1 text-[11px] bg-[#1b1a31] h-4  flex justify-center items-center text-yellow-400">
                  {products.length > 0 ? products.length : 0}
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex w-full relative sm:max-w-[1000px]">
          <input
            className="w-full rounded-md p-2"
            type="search"
            placeholder="Search at Amazon"
          />
          <button
          className="absolute right-0 bg-[#f8a932] py-[7px] px-[8px] rounded-md">
            <SearchIcon />
          </button>
        </div>

        <div className="text-white w-[380px] hover:outline hover:outline-1 hover:outline-gray-400 hover:outline-offset-8 hidden sm:flex">
          <Link to="/signin">
            <p>Hello, {userInfo?.data?.user?.name || "Sign in"}</p>
          </Link>
        </div>

        <div className="hidden sm:flex hover:outline hover:outline-1 hover:outline-gray-400 hover:outline-offset-8">
          <Link to="/order">
            <p className="text-white ">Orders</p>
          </Link>
        </div>

        <Link to="/cart">
          <div className="hidden sm:flex hover:outline hover:outline-1 hover:outline-gray-400 hover:outline-offset-8 relative">
            <CartIcon className="text-white" />
            <p className="text-white">
              Cart
              <span className="absolute top-[-5px] left-[8px] w-2 font-semibold p-1 text-[11px] bg-[#1b1a31] h-4  flex justify-center items-center text-yellow-400">
                {products.length > 0 ? products.length : 0}
              </span>
            </p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar1;

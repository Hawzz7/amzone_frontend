import { useEffect, useRef } from "react";
import "./SideNav.css";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideNav = ({ isOpen, toggleSideNav }) => {
  const ref = useRef();
  const userInfo = useSelector((state) => state.amazonReducer.userInfo)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        toggleSideNav();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSideNav]);

  return (
    <div ref={ref} className={`sidenav  ${isOpen ? "open" : ""}`}>
      <div className="bg-[#1b1a31] h-[55px]">
        <CloseIcon className="close-btn text-white" onClick={toggleSideNav} />
        <h1 className="absolute top-[10px] text-white font-semibold text-xl pl-3">Hello, {userInfo?.data?.user?.name || "Sign in"}</h1>
      </div>
      <ul className="">
        <Link to='/order'>
        <li className="px-4 py-2 hover:duration-500 cursor-pointer font-semibold text-xl hover:bg-gray-400">Your Orders</li>
        </Link>
        <li className="px-4 py-2 hover:duration-500 cursor-pointer font-semibold text-xl hover:bg-gray-400">Today's Deal</li>
        <li className="px-4 py-2 hover:duration-500 cursor-pointer font-semibold text-xl hover:bg-gray-400">Sell</li>
        <li className="px-4 py-2 hover:duration-500 cursor-pointer font-semibold text-xl hover:bg-gray-400">Best Sellers</li>
      </ul>
    </div>
  );
};

export default SideNav;

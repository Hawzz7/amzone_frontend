import MenuIcon from "@mui/icons-material/Menu";
import SideNav from "./SideNav";
import { useState } from "react";

const Navbar2 = () => {
  const[sideNavStatus, setSideNavStatus] = useState(false);

  const toggleSideNav = () => {
    setSideNavStatus(!sideNavStatus)
  }
  return (
   <div>
     <div className="w-full h-[35px] bg-[#2d2a56]">
      <ul className="flex items-center tracking-wide text-white gap-2 pt-1 px-2">
        <li className="flex items-center gap-1 px-2  duration-100 hover:outline hover:outline-1 hover:outline-gray-400 hover:outline-offset-0" onClick={toggleSideNav}>
          <MenuIcon />
          All
        </li>
        <li className="px-2  duration-100 hover:outline hover:outline-1 hover:outline-gray-400 hover:outline-offset-0">Amazon miniTv</li>
        <li className="px-2  duration-100 hover:outline hover:outline-1 hover:outline-gray-400 hover:outline-offset-0">Today's Deal</li>
        <li className="hidden sm:flex px-2  duration-100 hover:outline hover:outline-1 hover:outline-gray-400 hover:outline-offset-0">Sell</li>
        <li className="hidden sm:flex px-2  duration-100 hover:outline hover:outline-1 hover:outline-gray-400 hover:outline-offset-0">Best Sellers</li>
      </ul>
    </div>
    {sideNavStatus && <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm" onClick={toggleSideNav}></div>}
    <SideNav isOpen={sideNavStatus} toggleSideNav={toggleSideNav}/>
    <div className={`main-content ${sideNavStatus ? 'blur-sm' : ''}`}></div>
   </div>
  );
};

export default Navbar2;

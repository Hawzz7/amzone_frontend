import { Link } from "react-router-dom";
import amazonBox from "../../assets/amazonBox.png";
import amazonPrime from "../../assets/prime-logo.png";

const UserPage = ({logout, userData}) => {
  return (
    <div className="p-10 gap-6 flex flex-wrap items-center justify-center">
      <Link to="/order" className="flex w-[250px] gap-4 border border-gray-400 px-6 py-4 rounded-md">
        <img className="w-16" src={amazonBox} alt="" />
        <div>
          <h1 className="text-[17px] font-normal">Your Orders</h1>
          <p className="text-[14px] text-gray-500">Track, return</p>
        </div>
      </Link>

      <div className="flex w-[250px] gap-4 border border-gray-400 px-6 py-4 rounded-md">
        <img className="w-16" src={amazonBox} alt="" />
        <div className="space-y-2">
          <h1 className="text-[17px] font-normal">Hello, {userData?.data?.user?.name}</h1>
          <button onClick={logout} className="text-[14px] w-[100px] text-red-600 flex justify-center items-center hover:ring-2 hover:ring-yellow-500 duration-150 rounded-md">Logout</button>
        </div>
      </div>

      <div className="flex w-[250px] gap-4 border border-gray-400 px-6 py-4 rounded-md">
        <img className="w-16" src={amazonPrime} alt="" />
        <div>
          <h1 className="text-[17px] font-normal">Prime</h1>
          <p className="text-[14px] text-gray-500">View benefits</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

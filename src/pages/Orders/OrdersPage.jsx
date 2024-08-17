import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const OrdersPage = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const userInfo = useSelector((state) => state.amazonReducer.userInfo);
  const userId = userInfo?.data?.user?._id;

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      if (userId) {
        try {
          const response = await axios.get(`/cart/${userId}/history`);
          setPurchaseHistory(response.data.purchaseHistory);
        } catch (error) {
          console.error("Error fetching purchase history:", error);
        }
      }
    };

    fetchPurchaseHistory();
  }, [userId]);

  // console.log("Purchase History: ",purchaseHistory);
  

  return (
    <div className="container mx-auto px-4 my-10">
      <h1 className="text-3xl font-semibold mb-6">Order History</h1>
      {purchaseHistory.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {purchaseHistory.map((purchase, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-xl shadow-gray-400 border border-gray-400 hover:scale-110 duration-150">
              <h2 className="text-xl font-semibold">Order #{purchase._id}</h2>
              <p className="text-gray-600">
                Date: {new Date(purchase.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Total Amount: <span className="text-black font-semibold">${purchase.total}</span>
              </p>
              <p className="text-gray-600">
                Delivery Address: {purchase.address}
              </p>
              <h3 className="font-semibold mt-4">Items:</h3>
              <ul className="list-decimal list-inside">
                {purchase.items.map((item, idx) => (
                  <li key={idx} className="text-gray-800">
                    {item.title} - ${item.price} x{" "}
                    {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No purchase history available.</p>
      )}
    </div>
  );
};

export default OrdersPage;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendCartData } from "../../api/api-helpers";
import { resetCart } from "../../redux/amazonSlice";
import { motion } from "framer-motion";

const OrderSummaryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.amazonReducer.products);
  const userInfo = useSelector((state) => state.amazonReducer.userInfo);

  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const userId = userInfo?.data?.user?._id;
  const totalAmt = product
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  console.log("product Info: ", product);
  //   console.log("user Info: ", userId);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!address || !phoneNumber) {
      setError("All fields are required");
      return;
    }

    await sendCartData({ userId, product, address, phoneNumber });
    // Show modal
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      dispatch(resetCart());
    }, 2000);
    navigate("/");
  };

  return (
    <div className="w-full p-4">
         {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-2xl font-semibold">
              Thank you for shopping with us!
            </h2>
          </motion.div>
        </div>
      )}
      <h1 className="text-3xl font-semibold mb-4">Order Summary</h1>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
        <ul>
          {product.map((item) => (
            <li key={item.id} className="mb-2">
              <span>{item.title}</span> - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <p className="text-lg font-semibold mt-4">Total: ${totalAmt}</p>
      </div>

      <form onSubmit={handleOrderSubmit} className="mt-8">
        <div className="mb-4">
          <label className="block mb-2">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your address"
          />
        </div>
        {error && (
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                  <span className="italic font-extrabold text-base">!</span>
                  {error}
                </p>
              )}

        <div className="mb-4">
          <label className="block mb-2">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your phone number"
          />
        </div>
        {error && (
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                  <span className="italic font-extrabold text-base">!</span>
                  {error}
                </p>
              )}


        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default OrderSummaryPage;

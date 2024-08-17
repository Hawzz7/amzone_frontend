import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { productsData } from "./api/api.js";
import { Navbar } from "./components/Navabar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignIn/SignInPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import ProductDetail from "./components/Product/ProductDetail";
import CartPage from "./pages/CartPage/CartPage.jsx";
import OrdersPage from "./pages/Orders/OrdersPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import OrderSummaryPage from "./pages/OrderSummaryPage/OrderSummaryPage.jsx";


const Layout = () => {
  return (
    <div className="font-bodyFont">
      <Navbar />
      <ScrollRestoration />
      <Outlet />
      <Footer/>
    </div>
  );
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} loader={productsData}>
        <Route index element={<HomePage />} loader={productsData}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/order" element={<OrdersPage />}></Route>
        <Route path="/ordersummary" element={<OrderSummaryPage />}></Route>

        <Route
          path="/product/:id"
          element={<ProductDetail />}
          loader={productsData}
        ></Route>
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;

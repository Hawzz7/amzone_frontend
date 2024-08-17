import Banner from "../../components/Banner/Banner";
import ProductCard from "../../components/Product/ProductCard";

const HomePage = () => {
  return (
    <div>
      <Banner />

      <div className="w-full bg-gray-100 -mt-16 lgl:-mt-24 xl:-mt-36 py-10">
        <ProductCard />
      </div>
    </div>
  );
};

export default HomePage;

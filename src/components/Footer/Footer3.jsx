import { footerBottomItem } from "../../constants";

const Footer3 = () => {
  return (
    <div className="w-full bg-[#1b1a31] py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="w-full grid grid-cols-3 md:grid-cols-5 mdl:grid-cols-6 lgl:grid-cols-7 gap-3 place-content-center text-gray-400">
          {footerBottomItem.map((item) => (
            <div className="group cursor-pointer" key={item._id}>
              <h3 className="w-24 font-semibold text-[12px] group-hover:underline text-[#DDD] leading-3 mb-[2px]">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-10">
          <p className="text-xs cursor-pointer hover:underline text-white ">Conditions of Use & Sale</p>
          <p className="text-xs cursor-pointer hover:underline text-white">Privacy Notices</p>
          <p className="text-xs cursor-pointer hover:underline text-white">Interest-Based Ads</p>
        </div>
      </div>
    </div>
  );
};

export default Footer3;

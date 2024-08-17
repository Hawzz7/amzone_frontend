import amazonLogo from "../../assets/amazon-logo-white.png";
import indFlag from "../../assets/india.png"
import LanguageIcon from '@mui/icons-material/Language';

const Footer2 = () => {
  return (
    <div className="w-full bg-[#2d2a56]">
    <div className="w-full flex gap-6 items-center justify-center py-6">
      <div>
        <img className="w-[80px] " src={amazonLogo} alt="logo" />
      </div>
      <div className="flex gap-2">
        <p className="flex text-white gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1">
        <LanguageIcon/>
          English
        </p>
      </div>
      <div className="flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1">
        <img className="w-6" src={indFlag} alt="flagImg" />
        <p className="text-white">India</p>
      </div>
    </div>
  </div>
  )
}

export default Footer2
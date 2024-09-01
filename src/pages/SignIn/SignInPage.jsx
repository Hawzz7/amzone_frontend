import { Link, useNavigate } from "react-router-dom";
import amazonLogo from "../../assets/amazon-logo.png";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useState } from "react";
import {
  sendUserLoginRequest,
  sendUserLogOutRequest,
} from "../../api/api-helpers";
import { setUserInfo, signoutUser } from "../../redux/amazonSlice";
import { useDispatch, useSelector } from "react-redux";
import UserPage from "../UserPage/UserPage";

const SignInPage = () => {
  const isAuthenticated = useSelector(
    (state) => state.amazonReducer.isAuthenticated
  );
  const userInfo = useSelector((state) => state.amazonReducer.userInfo);
  // console.log(userInfo.data.user._id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //error check
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
  };

  const handleContinue = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailErr("Enter your email");
    }
    if (!password) {
      setPasswordErr("Enter your password");
    }

    try {
      const response = await sendUserLoginRequest({ email, password });

      if (response.error) {
        setErrorMsg(response.error);
      } else {
        dispatch(setUserInfo(response));
        // Redirect to the home page or desired location
        navigate("/");
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred");
    }
  };

  const handleLogout = async () => {
    sendUserLogOutRequest(userInfo.data.accessToken ,userInfo.data.user._id);
    dispatch(signoutUser());
  };

  return (
    <div className="w-full">
      {isAuthenticated ? (
        // <div className=" flex flex-col items-center justify-center h-lvh">
        //   <img className="w-36" src={amazonLogo} alt="" />
        //   <h1>Hello, {userInfo.data.user.name}</h1>
        //   <button onClick={handleLogout}>
        //     <p>Logout</p>
        //   </button>
        // </div>
        <UserPage logout={handleLogout} userData={userInfo}/>
      ) : (
        <form
          onSubmit={handleContinue}
          className="w-[350px] mx-auto flex flex-col items-center my-5"
        >
          <img className="w-24 mb-2" src={amazonLogo} alt="" />

          <div className="w-full border border-zinc-300 p-6">
            <h2 className="flex text-2xl font-medium mb-4">Sign in</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Email or phone number</p>
                <input
                  value={email}
                  onChange={handleEmail}
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="email"
                />
                {emailErr && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-extrabold text-base">!</span>
                    {emailErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password</p>
                <input
                  value={password}
                  onChange={handlePassword}
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="password"
                />
                {passwordErr && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-extrabold text-base">!</span>
                    {passwordErr}
                  </p>
                )}
                {errorMsg && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-extrabold text-base">!</span>
                    {errorMsg}
                  </p>
                )}
              </div>
              <button className="w-full py-1.5 text-sm font-medium rounded-sm bg-gradient-to-t from-[#dcbc1a] to-[#ffe771] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800">
                Continue
              </button>
              {/* Loader Spinner implement here */}
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              Securing your personal information is our priority.{" "}
              <span className="text-blue-600">Conditions of Use </span>and{" "}
              <span className="text-blue-600">Privace Notice.</span>
            </p>
            <p className="text-xs text-gray-600 mt-4 cursor-pointer group">
              <ArrowRightIcon />{" "}
              <span className="text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1">
                Need help?
              </span>
            </p>
          </div>
          <p className="w-full text-xs text-gray-600 mt-4 flex items-center">
            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
            <span className="w-1/3 text-center">New to Amazon?</span>
            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
          </p>
          <Link className="w-full" to="/signup">
            <button className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput">
              Create your Amazon account
            </button>
          </Link>
        </form>
      )}
    </div>
  );
};

export default SignInPage;

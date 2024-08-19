import { Link, useNavigate } from "react-router-dom";
import amazonLogo from "../../assets/amazon-logo.png";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";
import { sendUserAuthReq } from "../../api/api-helpers";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [loading, setLoading] = useState();
  const [successMsg, setSuccessMsg] = useState();

  // Error check
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [reEntPasswordErr, setReEntPasswordErr] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
    setNameErr("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
  };

  const handleRePassword = (e) => {
    setReenterPassword(e.target.value);
    setReEntPasswordErr("");
  };

  //Email Validation
  const validEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name) {
      setNameErr("Enter your name");
    }

    if (!email) {
      setEmailErr("Enter your email");
    } else if (!validEmail(email)) {
      setEmailErr("Enter a valid email");
    }

    if (!password) {
      setPasswordErr("Enter your password");
    } else if (password.length < 6) {
      setPasswordErr("Passwords must be at least 6 characters");
    }

    if (!reenterPassword) {
      setReEntPasswordErr("Confirm your password");
    } else if (reenterPassword !== password) {
      setReEntPasswordErr("Password not matched");
    }

    //If all fields have value
    if (
      name &&
      email &&
      validEmail &&
      password &&
      password.length >= 6 &&
      reenterPassword &&
      reenterPassword === password
    ) {
      setLoading(true);

      const data = { name, email, password };
      const response = await sendUserAuthReq(data);

      setLoading(false);

      if (response.error) {
        setErrorMsg(response.error); // Display the error message if registration fails
        setSuccessMsg("");
      } else {
        setSuccessMsg("User registered successfully!");
        navigate("/signin");

        setErrorMsg("");
      }
    }
  };
  return (
    <div className="w-full">
      <form
        className="w-[370px] mx-auto flex flex-col items-center my-5"
        onSubmit={handleContinue}
      >
        <Link to="/">
          <img className="w-24 mb-2" src={amazonLogo} alt="walmartLogo" />
        </Link>

        <div className="w-full border border-zinc-300 p-6">
          <h2 className="flex text-2xl font-medium mb-4">Create Account</h2>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Your name</p>
              <input
                value={name}
                onChange={handleName}
                type="text"
                className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] duration-100"
              />
              {nameErr && (
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                  <span className="italic font-extrabold text-base">!</span>
                  {nameErr}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Email or Phone number</p>
              <input
                value={email}
                onChange={handleEmail}
                type="email"
                className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600]  duration-100"
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
                type="password"
                className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] duration-100"
              />
              {passwordErr && (
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                  <span className="italic font-extrabold text-base">!</span>
                  {passwordErr}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Re-enter Password</p>
              <input
                value={reenterPassword}
                onChange={handleRePassword}
                type="password"
                className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
              />
              {reEntPasswordErr && (
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                  <span className="italic font-extrabold text-base">!</span>
                  {reEntPasswordErr}
                </p>
              )}
            </div>
            <button className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#dcbc1a] to-[#ffe771] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 t">
              Continue
            </button>
            {/* Loader Spinner implement here */}
            {loading && (
              <div>
                <RotatingLines
                  className="flex justify-center"
                  visible={true}
                  height="50"
                  width="50"
                  color="blue"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
            {errorMsg && (
              <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                <span className="italic font-extrabold text-base">!</span>
                {errorMsg}
              </p>
            )}
            {successMsg && (
              <div>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-700 px-2 text-center "
                >
                  {successMsg}
                </motion.p>
              </div>
            )}
          </div>
          <p className="text-xs text-black leading-4 mt-4">
            By Continuing, you agree to Amazon's{" "}
            <span className="text-blue-600">Conditions of Use </span>and{" "}
            <span className="text-blue-600">Privace Notice.</span>
          </p>
          <div>
            <p className="text-xs text-black">
              Already have an account?{" "}
              <Link to="/signin">
                <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                  Sign in{" "}
                  <span>
                    <ArrowRightIcon />
                  </span>
                </span>
              </Link>
            </p>
            <p className="text-xs text-black -mt-2">
              Buying for work?{" "}
              <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                Create a free business account
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { issueToken } from "../../api/user-api";
import SignIn from "../../assets/gif/SignIn.gif";
import GoogleLogin from "../../components/Shared/GoogleLogin/GoogleLogin";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { user, signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleGoogleLogin = GoogleLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const toastId = toast.loading("Logging In...");

    // signIn user
    signInUser(data.email, data.password)
      .then(async (result) => {
        console.log(data.email);
        console.log(result?.user?.email);
        console.log(user?.email);

        if (data.email === result?.user?.email) {
          await issueToken({ email: data.email });
          toast.success("Logged In Successfully", { id: toastId });
          reset();
          navigate(location?.state ?? "/");
        } else {
          toast.error("An error occurred", {
            id: toastId,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        // check for invalid credential
        if (
          error.message === "Firebase: Error (auth/invalid-login-credentials)."
        ) {
          toast.error("Invalid Email or Password", {
            id: toastId,
          });
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className="font-lato flex justify-center items-center min-h-screen p-2">
        <div className="flex flex-col-reverse lg:flex-row gap-8 xl:gap-20 items-center">
          <div className="lg:w-1/2">
            <img className="animate-pulse" src={SignIn} alt="signIn-img" />
          </div>
          <div className="lg:w-1/2 text-dark p-8 max-w-md">
            <div className="mb-6">
              <h1 className="text-xl font-semibold mb-2">
                Welcome to{" "}
                <Link to={"/"} className="text-primary-base italic">
                  Trippie
                </Link>
              </h1>
              <h2 className="text-3xl font-semibold">Log In</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label>Email Address*</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full p-2 pl-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-1 relative pb-6">
                <label>Password*</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    className={`w-full p-2 pl-3 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPass(!showPass);
                    }}
                  >
                    {showPass ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </span>
                )}
                <div className="text-right text-sm absolute bottom-0 right-0">
                  <Link
                    to="/forgot-password"
                    className="text-secondary-base hover:text-primary-base font-semibold transition"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="mt-2.5 w-full bg-primary-base text-white md:text-lg font-semibold p-3 rounded-md hover:bg-primary-500 transition"
                >
                  Sign In
                </button>
              </div>
            </form>
            <p className="text-center my-4">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-secondary-base hover:text-primary-base font-semibold transition"
              >
                Register
              </Link>
            </p>
            <div className="flex justify-center items-center gap-4 my-4">
              <hr className="w-full border-gray-300" />
              <p className="text-gray-500">or</p>
              <hr className="w-full border-gray-300" />
            </div>
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full p-3 border border-secondary-100 rounded-md bg-white hover:bg-primary-100 transition"
            >
              <FcGoogle className="text-2xl mr-2" />
              <span className="md:text-lg font-semibold">
                Sign in with Google
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

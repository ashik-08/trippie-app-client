import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import SignUp from "../../assets/gif/SignUp.gif";

const Register = () => {
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const fullPhoneNumber = `+880${data.phone}`;

    const formData = {
      ...data,
      phone: fullPhoneNumber,
    };

    console.log(formData);
  };

  return (
    <section className="font-lato flex justify-center items-center min-h-screen p-2">
      <div className="flex flex-col-reverse lg:flex-row gap-8 xl:gap-20 items-center">
        <div className="lg:w-1/2">
          <img className="animate-pulse" src={SignUp} alt="sign-up-image" />
        </div>
        <div className="lg:w-1/2 text-dark p-8 max-w-md">
          <div className="mb-6">
            <h1 className="text-xl font-semibold mb-2">
              Welcome to{" "}
              <span className="text-primary-base italic">Trippie</span>
            </h1>
            <h2 className="text-3xl font-semibold">Create Account</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label>Email Address*</label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full p-2 pl-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-primary-base rounded-md`}
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
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-1">
                <label>Full Name*</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`w-full p-2 pl-3 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:outline-primary-base rounded-md`}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex-1 space-y-1">
                <label>Phone Number*</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    +880
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="1700000000"
                    className={`w-full p-2 pl-3 border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } focus:outline-primary-base rounded-r-md`}
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^1[0-9]{9}$/,
                        message: "Invalid phone number",
                      },
                    })}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <label>Password*</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full p-2 pl-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-primary-base rounded-md`}
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
                      message:
                        "Password must be at least 8 characters, contain one uppercase letter, one number and one special character",
                    },
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="mt-4 w-full bg-primary-base text-white md:text-lg font-semibold p-3 rounded-md hover:bg-primary-500 transition"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-center my-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-secondary-base hover:text-primary-base font-semibold transition"
            >
              Login
            </Link>
          </p>
          <div className="flex items-center my-4">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>
          <button className="flex items-center justify-center w-full p-3 border border-secondary-100 rounded-md bg-white hover:bg-primary-100 transition">
            <FcGoogle className="text-2xl mr-2" />
            <span className="md:text-lg font-semibold">
              Sign up with Google
            </span>
          </button>
          <p className="mt-4 text-sm text-gray-500 text-center">
            By signing up, you agree to our{" "}
            <Link
              to="/terms-and-conditions"
              className="text-secondary-base hover:text-primary-base font-semibold transition"
            >
              Terms and Conditions
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;

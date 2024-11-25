import toast from "react-hot-toast";
import backImg from "../../../assets/home/adventure-bg.jpg";

const Adventure = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Subscribed successfully!");
    e.target.reset();
  };

  return (
    <div
      className="relative bg-cover bg-center h-[60vh]"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-5">
        <h1 className="text-white text-3xl md:text-[40px] font-bold uppercase">
          Start Your Adventure
        </h1>
        <p className="text-white text-base md:text-lg mt-4 max-w-2xl">
          Sign up for our newsletter and receive exclusive travel deals, insider
          tips and destination inspiration. Don&apos;t miss out on the adventure
          - join our mailing list today!
        </p>
        <form
          onSubmit={handleSubscribe}
          className="mt-6 flex flex-col sm:flex-row items-center w-full max-w-md"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:flex-1 px-4 py-2 rounded-md text-gray-800 border-none focus:outline-none focus:ring-2 focus:ring-primary-600 "
            required
          />
          <button
            type="submit"
            className="mt-4 sm:mt-0 sm:ml-3 px-6 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Adventure;

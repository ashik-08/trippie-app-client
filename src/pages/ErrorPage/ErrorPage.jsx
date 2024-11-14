import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ErrorGif from "../../assets/gif/error404.gif";

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <section className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <img
          src={ErrorGif}
          alt="Error"
          className="w-1/2 max-w-md mb-8 animate"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="md:text-lg text-gray-600 mb-8">
          The page you are looking for does not exist or an error occurred.
        </p>
        <Link
          to="/"
          className="text-sm md:text-base px-4 py-2.5 bg-primary-base text-white rounded-lg hover:bg-primary-500 transition-colors"
        >
          Go to Home
        </Link>
      </section>
    </>
  );
};

export default ErrorPage;

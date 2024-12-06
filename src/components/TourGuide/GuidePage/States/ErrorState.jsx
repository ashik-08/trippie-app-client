import PropTypes from "prop-types";

const ErrorState = ({ children }) => {
  return (
    <div className="col-span-full">
      <p className="max-w-3xl mx-auto mt-10 bg-red-50 text-red-500 text-center text-lg md:text-xl italic font-semibold px-8 py-14 rounded-xl">
        {children}
      </p>
    </div>
  );
};

ErrorState.propTypes = {
  children: PropTypes.node,
};

export default ErrorState;

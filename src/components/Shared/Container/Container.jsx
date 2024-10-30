import PropTypes from "prop-types"; // ES6

const Container = ({ children }) => {
  return (
    <div className="max-w-[1600px] mx-auto xl:px-24 lg:px-12 md:px-5 px-2">
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;

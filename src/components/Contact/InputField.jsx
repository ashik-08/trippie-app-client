import PropTypes from "prop-types";

const InputField = ({ label, type, name, placeholder, required, rows }) => {
  return (
    <div className="mb-[22px]">
      <label
        htmlFor={name}
        className="mb-4 block text-sm md:text-base text-dark"
      >
        {label}*
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          rows={rows}
          placeholder={placeholder}
          className="w-full resize-none border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-dark placeholder:text-dark/60 focus:ring-0 focus:border-secondary-base"
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="w-full border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-dark placeholder:text-dark/60 focus:ring-0 focus:border-secondary-base"
          required={required}
        />
      )}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
};

export default InputField;

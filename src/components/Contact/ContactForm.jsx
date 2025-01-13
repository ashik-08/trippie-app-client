import toast from "react-hot-toast";
import InputField from "./InputField";

const ContactForm = () => {
  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast.success("We will reach you soon!");
    e.target.reset();
  };

  return (
    <div className="rounded-lg bg-white px-8 py-10 shadow-md sm:px-10 sm:py-12 md:p-[60px] lg:p-10 lg:px-10 lg:py-12 2xl:p-[60px]">
      <h3 className="mb-8 text-2xl font-semibold text-dark md:text-[28px] md:leading-[1.42]">
        Send us a Message
      </h3>
      <form onSubmit={handleContactSubmit}>
        <InputField
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Ashikur Rahman"
          required
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          placeholder="example@yourmail.com"
          required
        />
        <InputField
          label="Phone"
          type="number"
          name="phone"
          placeholder="+880 1745 555 222"
          required
        />
        <InputField
          label="Message"
          type="textarea"
          name="message"
          placeholder="type your message here"
          required
          rows={1}
        />
        <div className="mb-0">
          <button
            type="submit"
            className="bg-secondary-base px-10 py-3 text-white hover:bg-secondary-700 inline-flex rounded-md font-medium transition duration-300 ease-in-out"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

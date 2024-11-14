import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo/logo-group-white.svg";
import DribbleIcon from "../../SVG/DribbleIcon";
import FBIcon from "../../SVG/FBIcon";
import GithubIcon from "../../SVG/GithubIcon";
import InstagramIcon from "../../SVG/InstagramIcon";
import SendIcon from "../../SVG/SendIcon";
import TwitterIcon from "../../SVG/TwitterIcon";
import Container from "../Container/Container";

const Footer = () => {
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    toast.success("Email submitted successfully!");
    e.target.reset();
  };

  const LINKS = [
    {
      title: "Product",
      items: ["Overview", "Features", "Solutions", "Tutorials"],
    },
    {
      title: "Company",
      items: ["About us", "Careers", "Press", "News"],
    },
    {
      title: "Resource",
      items: ["Blog", "Newsletter", "Events", "Help center"],
    },
    {
      title: "Contact",
      items: ["Banani, Dhaka", "info@trippie.com", "01712-345678"],
    },
  ];

  return (
    <footer className="bg-neutralBlack py-16 px-2 md:px-3 lg:px-5">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-12 lg:gap-y-2 gap-x-8">
          {/* Footer Left Section */}
          <div className="lg:col-span-2">
            <Link to="/">
              <img className="w-28 xl:w-32" src={logo} alt="logo-img" />
            </Link>
            <p className="text-blue-gray-50 text-sm mt-4">
              ©2024 Trippie Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-6 text-blue-gray-100">
              <Link to="#" className="hover:text-white transition-colors">
                <FBIcon />
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                <TwitterIcon />
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                <InstagramIcon />
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                <DribbleIcon />
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                <GithubIcon />
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <h2 className="text-white text-xl font-semibold mb-4">
                  {title}
                </h2>
                {items.map((link) => (
                  <li key={link} className="mb-2">
                    <Link
                      to="#"
                      className="text-blue-gray-200 text-sm hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          {/* Stay Up to Date Section */}
          <div className="lg:col-span-2">
            <h2 className="text-white text-xl font-semibold mb-4">
              Stay up to date
            </h2>
            <form
              onSubmit={handleEmailSubmit}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-lg bg-outerSpace/40 text-sm text-gray-200 placeholder-blue-gray-300 border-0 ring-1 ring-inset ring-primary-base/50 focus:ring-2 focus:ring-inset focus:ring-primary-600"
                required
              />
              <button
                type="submit"
                className="flex items-center justify-center px-4 py-2 rounded-lg bg-primary-600 hover:bg-secondary-700 transition-colors"
              >
                <SendIcon />
              </button>
            </form>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

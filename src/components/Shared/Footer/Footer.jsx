import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo/logo-group.svg";
import DribbleIcon from "../../SVG/DribbleIcon";
import FBIcon from "../../SVG/FBIcon";
import GithubIcon from "../../SVG/GithubIcon";
import InstagramIcon from "../../SVG/InstagramIcon";
import TwitterIcon from "../../SVG/TwitterIcon";
import Container from "../Container/Container";

const Footer = () => {
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
      title: "Address",
      items: ["Banani, Dhaka", "info@trippie.com", "01712-345678"],
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-50 mt-24 md:mt-32 lg:mt-36 xl:mt-40">
      <Container>
        <div className="px-4 pt-20">
          <div className="grid grid-cols-1 justify-between gap-8 lg:gap-12 xl:gap-20 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-3">
              <Link to="/">
                <img className=" md:w-28 xl:w-32" src={logo} alt="logo-img" />
              </Link>
              <Typography
                color="blue-gray"
                className="text-sm md:text-base font-normal opacity-70"
              >
                Trippie is your go-to travel companion, offering comprehensive
                solutions for all your travel needs. Explore the world with ease
                and confidence.
              </Typography>
            </div>
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 justify-between gap-4">
              {LINKS.map(({ title, items }) => (
                <ul key={title}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-3 md:text-base font-medium opacity-40"
                  >
                    {title}
                  </Typography>
                  {items.map((link) => (
                    <li key={link}>
                      <Typography
                        as="a"
                        href="#"
                        color="gray"
                        className="py-1.5 text-sm md:text-base font-normal transition-colors hover:text-blue-gray-900"
                      >
                        {link}
                      </Typography>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
            <Typography
              variant="small"
              className="mb-4 text-center font-medium text-blue-gray-900 md:mb-0"
            >
              &copy; {currentYear} <a href="/">Trippie</a>. All Rights Reserved.
            </Typography>
            <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
              <Typography
                as="a"
                href="#"
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <FBIcon />
              </Typography>
              <Typography
                as="a"
                href="#"
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <InstagramIcon />
              </Typography>
              <Typography
                as="a"
                href="#"
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <TwitterIcon />
              </Typography>
              <Typography
                as="a"
                href="#"
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <GithubIcon />
              </Typography>
              <Typography
                as="a"
                href="#"
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <DribbleIcon />
              </Typography>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

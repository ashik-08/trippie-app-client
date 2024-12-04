import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../assets/logo/logo-group.svg";
import useAuth from "../../../hooks/useAuth";
import MenuIcon from "../../SVG/MenuIcon";
import Container from "../Container/Container";

const NavBar = () => {
  const { user, logOut, loading } = useAuth();

  const handleLogout = () => {
    const toastId = toast.loading("Logging Out...");
    logOut()
      .then(() => {
        toast.success("Logged Out Successfully", { id: toastId });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong!", { id: toastId });
      });
  };

  const navItems = [
    { to: "/", text: "Home" },
    { to: "/join-tour", text: "Join Tour" },
    { to: "/tour-guide", text: "Tour Guide" },
    { to: "/hotel/list", text: "Hotel" },
    // {
    //   text: "Bookings",
    //   dropdown: [
    //     { to: "/hotels/list", text: "Hotel" },
    //     { to: "/transport", text: "Transport" },
    //   ],
    // },
    {
      text: "Pages",
      dropdown: [
        { to: "/contact", text: "Contact" },
        { to: "/about-us", text: "About Us" },
        // { to: "/emergency-helpline", text: "Emergency Helpline" },
      ],
    },
  ];

  // Common NavLink style function
  const navStyle = (isActive) =>
    `text-sm sm:text-base xl:text-lg ${
      isActive
        ? "text-secondary-base font-semibold"
        : "text-outerSpace font-medium"
    }`;

  const links = (
    <>
      {navItems.map((item) => (
        <li
          key={item.to || item.text}
          className="border-t first:border-none lg:border-none"
        >
          {item.dropdown ? (
            <details>
              <summary className="text-outerSpace font-medium text-sm sm:text-base xl:text-lg">
                {item.text}
              </summary>
              <ul className="text-neutral-700 drop-shadow-lg w-max transition z-[1]">
                {item.dropdown.map((subItem) => (
                  <li key={subItem.to} className="border-t first:border-none">
                    <NavLink
                      to={subItem.to}
                      className={({ isActive }) => navStyle(isActive)}
                    >
                      {subItem.text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </details>
          ) : (
            <NavLink
              to={item.to}
              className={({ isActive }) => navStyle(isActive)}
            >
              {item.text}
            </NavLink>
          )}
        </li>
      ))}
    </>
  );

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed z-10 w-full transition-colors duration-300 ${
        scrolled && "bg-white/55 backdrop-blur-md"
      }`}
    >
      <Container>
        <div className="font-lato navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden -ml-6 sm:-ml-3"
              >
                <MenuIcon />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-1 -ml-2 p-1 drop-shadow-lg w-max"
              >
                {links}
              </ul>
            </div>
            <Link
              to="/"
              className="text-[#7cc4b0] md:text-3xl lg:text-4xl font-metal font-semibold -ml-2.5 sm:-ml-0"
            >
              <img className="md:w-28 xl:w-32" src={Logo} alt="logo" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal">{links}</ul>
          </div>
          <div className="navbar-end space-x-2 sm:space-x-5">
            {loading ? (
              <span className="loading loading-ring w-[50px] lg:w-[52px]"></span>
            ) : user?.email ? (
              // dropdown icon
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 md:w-14 lg:w-16 rounded-full ">
                    <img
                      className="text-[10px]"
                      src={user?.photoURL}
                      alt="img"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-2 z-[1] drop-shadow-lg bg-base-100 rounded-box"
                >
                  <div className="text-outerSpace font-medium 2xl:text-base">
                    <li className="pointer-events-none">
                      <p>{user?.displayName}</p>
                    </li>
                    <li className="pointer-events-none">
                      <p>{user?.email}</p>
                    </li>
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </div>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-white bg-primary-base hover:bg-primary-500 lg:text-lg px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;

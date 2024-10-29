import { NavLink } from "react-router-dom";

const NavBar = () => {
  //   const links = (
  //     <>
  //       <li>
  //         <NavLink
  //           to="/"
  //           className={({ isActive }) =>
  //             isActive
  //               ? "text-secondary-base text-sm md:text-lg font-bold"
  //               : "text-outerSpace text-sm md:text-lg"
  //           }
  //         >
  //           Home
  //         </NavLink>
  //       </li>
  //       <hr />
  //       <li>
  //         <NavLink
  //           to="/join-tour"
  //           className={({ isActive }) =>
  //             isActive
  //               ? "text-outerSpace text-sm md:text-lg font-bold"
  //               : "text-sm md:text-lg"
  //           }
  //         >
  //           Join Tour
  //         </NavLink>
  //       </li>
  //       <hr />
  //       <li>
  //         <NavLink
  //           to="/tour-guide"
  //           className={({ isActive }) =>
  //             isActive
  //               ? "text-outerSpace text-sm md:text-lg font-bold"
  //               : "text-sm md:text-lg"
  //           }
  //         >
  //           Tour Guides
  //         </NavLink>
  //       </li>
  //       <hr />

  //       <li>
  //         <details>
  //           <summary>Bookings</summary>

  //           <ul className="p-2 text-neutral-700">
  //             <li>
  //               <NavLink
  //                 to="/booked-transport"
  //                 className={({ isActive }) =>
  //                   isActive
  //                     ? "text-outerSpace text-sm md:text-lg font-bold"
  //                     : "text-sm md:text-lg"
  //                 }
  //               >
  //                 Transport
  //               </NavLink>
  //             </li>
  //             <hr />
  //             <li>
  //               <NavLink
  //                 to="/booked-restaurant"
  //                 className={({ isActive }) =>
  //                   isActive
  //                     ? "text-outerSpace text-sm md:text-lg font-bold"
  //                     : "text-sm md:text-lg"
  //                 }
  //               >
  //                 Restaurant
  //               </NavLink>
  //             </li>
  //             <hr />
  //             <li>
  //               <NavLink
  //                 to="/booked-hotel"
  //                 className={({ isActive }) =>
  //                   isActive
  //                     ? "text-outerSpace text-sm md:text-lg font-bold"
  //                     : "text-sm md:text-lg"
  //                 }
  //               >
  //                 Hotel
  //               </NavLink>
  //             </li>
  //           </ul>
  //         </details>
  //       </li>
  //       <hr />
  //       <li>
  //         <details>
  //           <summary>Pages</summary>

  //           <ul className="p-2 text-neutral-700">
  //             <li>
  //               <NavLink
  //                 to="/emergency-helpline"
  //                 className={({ isActive }) =>
  //                   isActive
  //                     ? "text-outerSpace text-sm md:text-lg font-bold"
  //                     : "text-sm md:text-lg"
  //                 }
  //               >
  //                 Emergency Helpline
  //               </NavLink>
  //             </li>
  //             <hr />
  //             <li>
  //               <NavLink
  //                 to="/about-us"
  //                 className={({ isActive }) =>
  //                   isActive
  //                     ? "text-outerSpace text-sm md:text-lg font-bold"
  //                     : "text-sm md:text-lg"
  //                 }
  //               >
  //                 About Us
  //               </NavLink>
  //             </li>
  //             <hr />
  //             <li>
  //               <NavLink
  //                 to="/contact"
  //                 className={({ isActive }) =>
  //                   isActive
  //                     ? "text-outerSpace text-sm md:text-lg font-bold"
  //                     : "text-sm md:text-lg"
  //                 }
  //               >
  //                 Contact
  //               </NavLink>
  //             </li>
  //           </ul>
  //         </details>
  //       </li>
  //     </>
  //   );

  //   const mainLinks = [
  //     { to: "/", text: "Home" },
  //     { to: "/join-tour", text: "Join Tour" },
  //   ];

  //   const bookingLinks = [
  //     { to: "/booked-transport", text: "Transport" },
  //     { to: "/booked-restaurant", text: "Restaurant" },
  //     { to: "/booked-hotel", text: "Hotel" },
  //   ];

  //   const pageLinks = [
  //     { to: "/emergency-helpline", text: "Emergency Helpline" },
  //     { to: "/about-us", text: "About Us" },
  //     { to: "/contact", text: "Contact" },
  //   ];

  //   const links = (
  //     <>
  //       {mainLinks.map(({ to, text }) => (
  //         <li key={to}>
  //           <NavLink to={to} className={({ isActive }) => navStyle(isActive)}>
  //             {text}
  //           </NavLink>
  //           {/* <hr /> */}
  //         </li>
  //       ))}

  //       <li>
  //         <details>
  //           <summary>Pages</summary>
  //           <ul className="p-2 text-neutral-700">
  //             {pageLinks.map(({ to, text }) => (
  //               <li key={to}>
  //                 <NavLink
  //                   to={to}
  //                   className={({ isActive }) => navStyle(isActive)}
  //                 >
  //                   {text}
  //                 </NavLink>
  //                 {/* <hr /> */}
  //               </li>
  //             ))}
  //           </ul>
  //         </details>
  //       </li>
  //     </>
  //   );

  // Common NavLink style function
  const navStyle = (isActive) =>
    `text-sm md:text-lg ${
      isActive ? "text-secondary-base font-bold" : "text-outerSpace"
    }`;

  const navItems = [
    { to: "/", text: "Home" },
    { to: "/join-tour", text: "Join Tour" },
    { to: "/tour-guide", text: "Tour Guides" },
    {
      text: "Bookings",
      dropdown: [
        { to: "/booked-transport", text: "Transport" },
        { to: "/booked-restaurant", text: "Restaurant" },
        { to: "/booked-hotel", text: "Hotel" },
      ],
    },
    {
      text: "Pages",
      dropdown: [
        { to: "/emergency-helpline", text: "Emergency Helpline" },
        { to: "/about-us", text: "About Us" },
        { to: "/contact", text: "Contact" },
      ],
    },
  ];

  const links = (
    <>
      {navItems.map((item) => (
        <li key={item.to} className="border-b lg:border-b-0">
          {item.dropdown ? (
            <details>
              <summary>{item.text}</summary>
              <ul className="p-2 text-neutral-700">
                {item.dropdown.map((subItem) => (
                  <li key={subItem.to}>
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

  return (
    <div className="font-lato navbar bg-base-100 container mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default NavBar;

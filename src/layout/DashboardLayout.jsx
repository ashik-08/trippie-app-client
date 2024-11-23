import toast from "react-hot-toast";
// import { AiFillHome } from "react-icons/ai";
import { BsDoorOpenFill } from "react-icons/bs";
// import { FaCalendarAlt, FaUsers } from "react-icons/fa";
// import { FaBus } from "react-icons/fa6";
// import { GiMoneyStack } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
// import { TbBrandBooking } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router-dom";
import Logo from "../assets/logo/logo-group.svg";
import LoadingSpinner from "../components/LoadingState/LoadingSpinner";
import DoorIcon from "../components/SVG/DoorIcon";
// import ManageServiceIcon from "../components/SVG/ManageServiceIcon";
import MenuIcon from "../components/SVG/MenuIcon";
import ProfileIcon from "../components/SVG/ProfileIcon";
// import TourIcon from "../components/SVG/TourIcon";
import useAuth from "../hooks/useAuth";
import useGetRole from "../hooks/useGetRole";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const DashboardLayout = () => {
  const [userRole, isLoading, isError] = useGetRole();

  const { logOut } = useAuth();

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const renderNavLinks = () => {
    const navLinkClass = ({ isActive }) =>
      isActive
        ? "bg-primary-base text-white text-base font-semibold hover:bg-primary-500 transition-colors"
        : "bg-slate/20 text-outerSpace text-base font-medium hover:bg-slate/30 transition-colors";

    switch (userRole) {
      // case "user":
      //   return (
      //     <>
      //       <li>
      //         <NavLink to="/dashboard/user-home" className={navLinkClass}>
      //           <AiFillHome />
      //           Dashboard
      //         </NavLink>
      //       </li>
      //       <li>
      //         <NavLink to="/dashboard/my-bookings" className={navLinkClass}>
      //           <TbBrandBooking />
      //           My Bookings
      //         </NavLink>
      //       </li>
      //       <li>
      //         <NavLink to="/dashboard/payment-history" className={navLinkClass}>
      //           <GiMoneyStack />
      //           Payment History
      //         </NavLink>
      //       </li>
      //       <li>
      //         <NavLink to="/dashboard/my-profile" className={navLinkClass}>
      //           <ProfileIcon />
      //           My Profile
      //         </NavLink>
      //       </li>
      //     </>
      //   );
      case "admin":
        return (
          <>
            {/* <li>
              <NavLink to="/dashboard/admin-home" className={navLinkClass}>
                <AiFillHome />
                Dashboard
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/dashboard/manage-users" className={navLinkClass}>
                <FaUsers />
                Manage Users
              </NavLink>
            </li>
          </>
        );
      case "hotel-manager":
        return (
          <>
            {/* <li>
              <NavLink to="/dashboard/hotel-home" className={navLinkClass}>
                <AiFillHome />
                Dashboard
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/dashboard/add-room" className={navLinkClass}>
                <BsDoorOpenFill />
                Add Room
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manage-rooms" className={navLinkClass}>
                <DoorIcon />
                Manage Rooms
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/hotel-profile" className={navLinkClass}>
                <ProfileIcon />
                My Profile
              </NavLink>
            </li>
          </>
        );
      // case "bus-operator":
      //   return (
      //     <>
      //       <li>
      //         <NavLink to="/dashboard/transport-home" className={navLinkClass}>
      //           <AiFillHome />
      //           Dashboard
      //         </NavLink>
      //       </li>
      //       <li>
      //         <NavLink to="/dashboard/add-vehicle" className={navLinkClass}>
      //           <FaBus />
      //           Add Vehicle
      //         </NavLink>
      //       </li>
      //       <li>
      //         <NavLink to="/dashboard/manage-vehicles" className={navLinkClass}>
      //           <MdBusAlert />
      //           Manage Vehicles
      //         </NavLink>
      //       </li>
      //       <li>
      //         <NavLink to="/dashboard/my-profile" className={navLinkClass}>
      //           <ProfileIcon />
      //           My Profile
      //         </NavLink>
      //       </li>
      //     </>
      //   );
      // case "tour-guide":
      //   return (
      //     <>
      //       <li>
      //         <NavLink to="/dashboard/guide-home" className={navLinkClass}>
      //           <AiFillHome />
      //           Dashboard
      //         </NavLink>
      //       </li>
      //       <li>
      //         <NavLink to="/dashboard/manage-services" className={navLinkClass}>
      //           <ManageServiceIcon />
      //           Manage Services
      //         </NavLink>
      //       </li>
      //       <li>
      //         <NavLink to="/dashboard/my-profile" className={navLinkClass}>
      //           <ProfileIcon />
      //           My Profile
      //         </NavLink>
      //       </li>
      //     </>
      //   );
      // case "tour-agent":
      //   return (
      //     <>
      //       <li>
      //         <NavLink to="/dashboard/agent-home" className={navLinkClass}>
      //           <AiFillHome />
      //           Dashboard
      //         </NavLink>
      //       </li>
      //       <li>
      //         <NavLink to="/dashboard/create-tour" className={navLinkClass}>
      //           <FaCalendarAlt />
      //           Create Tour
      //         </NavLink>
      //       </li>
      //       <li>
      //         <NavLink to="/dashboard/manage-tours" className={navLinkClass}>
      //           <TourIcon />
      //           Manage Tours
      //         </NavLink>
      //       </li>
      //       <li>
      //         <NavLink to="/dashboard/my-profile" className={navLinkClass}>
      //           <ProfileIcon />
      //           My Profile
      //         </NavLink>
      //       </li>
      //     </>
      //   );
      default:
        return null;
    }
  };

  return (
    <main className="font-lato drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <section className="drawer-content min-h-screen bg-slate/20">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden flex justify-end mr-2"
        >
          <MenuIcon />
        </label>
        <div className="py-8 lg:py-12">
          <div className="max-w-[1600px] mx-auto lg:px-8 md:px-6 sm:px-4 px-3">
            <Outlet />
          </div>
        </div>
      </section>
      <aside className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="bg-white w-64 px-3 py-12 min-h-screen flex flex-col justify-between">
          <div>
            <Link to="/">
              <img className="ml-6 w-28" src={Logo} alt="logo" />
            </Link>
            <ul className="menu mt-8 space-y-4">{renderNavLinks()}</ul>
          </div>
          <div className="mx-2 bg-slate/20 hover:bg-slate/30 transition-colors rounded-md">
            <button
              onClick={handleLogout}
              className="px-4 py-2 w-full text-start text-outerSpace text-base font-medium flex items-center gap-2"
            >
              <MdLogout />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default DashboardLayout;

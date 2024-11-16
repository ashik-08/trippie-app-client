// src/layouts/DashboardLayout.jsx
import toast from "react-hot-toast";
import { AiFillHome } from "react-icons/ai";
import { BiSolidContact, BiSolidWalletAlt } from "react-icons/bi";
import { FaCalendarAlt, FaListUl } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { PiUsersThreeFill } from "react-icons/pi";
import { SiFoodpanda } from "react-icons/si";
import { NavLink, Outlet } from "react-router-dom";
import LoadingSpinner from "../components/LoadingState/LoadingSpinner";
import Container from "../components/Shared/Container/Container";
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
    switch (userRole) {
      case "admin":
        return (
          <>
            <NavLink to="/dashboard/admin-home">
              <AiFillHome /> Dashboard
            </NavLink>
            <NavLink to="/dashboard/user-management">
              <PiUsersThreeFill /> User Management
            </NavLink>
          </>
        );
      case "user":
        return (
          <>
            <NavLink to="/dashboard/user-home">
              <AiFillHome /> Dashboard
            </NavLink>
            <NavLink to="/dashboard/payment-history">
              <BiSolidWalletAlt /> Payment History
            </NavLink>
            <NavLink to="/dashboard/my-profile">
              <BiSolidContact /> My Profile
            </NavLink>
          </>
        );
      case "hotel-manager":
        return (
          <>
            <NavLink to="/dashboard/hotel-home">
              <AiFillHome /> Dashboard
            </NavLink>
            <NavLink to="/dashboard/manage-rooms">
              <FaListUl /> Manage Rooms
            </NavLink>
            <NavLink to="/dashboard/my-profile">
              <BiSolidContact /> My Profile
            </NavLink>
          </>
        );
      case "bus-operator":
        return (
          <>
            <NavLink to="/dashboard/transport-home">
              <AiFillHome /> Dashboard
            </NavLink>
            <NavLink to="/dashboard/manage-vehicle">
              <FaListUl /> Manage Vehicle
            </NavLink>
            <NavLink to="/dashboard/my-profile">
              <BiSolidContact /> My Profile
            </NavLink>
          </>
        );
      case "tour-guide":
        return (
          <>
            <NavLink to="/dashboard/guide-home">
              <AiFillHome /> Dashboard
            </NavLink>
            <NavLink to="/dashboard/manage-service">
              <FaListUl /> Manage Service
            </NavLink>
            <NavLink to="/dashboard/my-profile">
              <BiSolidContact /> My Profile
            </NavLink>
          </>
        );
      case "tour-agent":
        return (
          <>
            <NavLink to="/dashboard/agent-home">
              <AiFillHome /> Dashboard
            </NavLink>
            <NavLink to="/dashboard/create-tour">
              <FaCalendarAlt /> Create Tour
            </NavLink>
            <NavLink to="/dashboard/manage-tour">
              <FaListUl /> Manage Tour
            </NavLink>
            <NavLink to="/dashboard/my-profile">
              <BiSolidContact /> My Profile
            </NavLink>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content min-h-screen bg-dash-bg">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost drawer-button lg:hidden flex justify-end mr-4 mt-2"
          >
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
          </label>
          <div className="mt-8 lg:mt-12 mb-20">
            <Container>
              <Outlet />
            </Container>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className="w-72 min-h-screen bg-dash py-12">
            <p className="text-2xl font-cinzel font-black uppercase ml-6">
              Bistro Boss
            </p>
            <p className="text-xl font-cinzel font-medium uppercase tracking-[3px] ml-6">
              Restaurant
            </p>
            <ul className="menu mt-16 space-y-2">{renderNavLinks()}</ul>
            <div className="divider px-5"></div>
            <ul className="menu space-y-2">
              <li>
                <NavLink
                  to="/"
                  className="text-lg md:text-xl font-cinzel font-medium uppercase"
                >
                  <AiFillHome /> Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/menu"
                  className="text-lg md:text-xl font-cinzel font-medium uppercase"
                >
                  <FiMenu /> Menu
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/order/offer"
                  className="text-lg md:text-xl font-cinzel font-medium uppercase"
                >
                  <SiFoodpanda /> Order Food
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact-us"
                  className="text-lg md:text-xl font-cinzel font-medium uppercase"
                >
                  <BiSolidContact /> Contact
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-lg md:text-xl font-cinzel font-medium uppercase"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;

import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";
import NavBar from "../components/Shared/NavBar/NavBar";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-[calc(100vh-388px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;

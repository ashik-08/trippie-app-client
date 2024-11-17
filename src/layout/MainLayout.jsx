import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";
import NavBar from "../components/Shared/NavBar/NavBar";

const MainLayout = () => {
  return (
    <div className="font-poppins">
      <NavBar />
      <main className="min-h-[calc(100vh-388px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

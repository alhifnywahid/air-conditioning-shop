import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavMobile from "../components/NavMobile";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <NavMobile />
    </>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import { Footer, Header, NavMobile } from "../components";

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

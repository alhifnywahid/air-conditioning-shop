import { useEffect } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import AccountIcon from "./AccountIcon";
import CartIcon from "./CartIcon";

export default function Header() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <div className="shadow w-full sticky top-0 z-10 bg-base-100">
        <div className="navbar 2xl:container rounded-md">
          <div className="navbar-start">
            <Link to="/" className="btn btn-ghost text-xl sm:text-2xl">
              Berkah Teknik
            </Link>
          </div>
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-1">
              <NavLinks />
            </ul>
          </div>
          <div className="navbar-end hidden md:flex">
            <AccountIcon />
            <CartIcon />
          </div>
        </div>
      </div>
    </>
  );
}

const NavLinks = () => {
  const navLink = [
    {
      title: "Home",
      path: "/",
      icon: <IoHomeOutline size="25" />,
    },
    {
      title: "Layanan",
      path: "layanan",
      icon: <IoHomeOutline size="25" />,
    },
    {
      title: "Galery",
      path: "galery",
      icon: <IoHomeOutline size="25" />,
    },
    {
      title: "Kerja Sama",
      path: "kerja-sama",
      icon: <IoHomeOutline size="25" />,
    },
    {
      title: "Kontak",
      path: "kontak",
      icon: <IoHomeOutline size="25" />,
    },
  ];
  return (
    <>
      {navLink.map((link, index) => (
        <li key={index}>
          <Link className="flex flex-col" to={link.path}>
            <span className="md:hidden pointer-events-none">{link.icon}</span>
            <span className="pointer-events-none">{link.title}</span>
          </Link>
        </li>
      ))}
    </>
  );
};

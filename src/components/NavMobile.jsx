import { BsMenuButton } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import AccountIcon from "./AccountIcon";
import Button from "./Button";
import CartIcon from "./CartIcon";

const NavMobile = () => {
  return (
    <>
      <div className="flex justify-evenly items-center fixed bottom-0 w-full z-10 shadow-inner p-2 md:hidden bg-blue-500 text-white font-bold">
        <Button className="flex flex-col h-fit">
          <IoHomeOutline size="25" />
        </Button>
        <Link className="btn btn-ghost" to="#">
          <BsMenuButton size="25" />
        </Link>
        <CartIcon />
        <AccountIcon />
      </div>
    </>
  );
};

export default NavMobile;
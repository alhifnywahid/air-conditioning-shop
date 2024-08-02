import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";

const AccountIcon = () => {
  return (
    <>
      <Link className="btn btn-ghost hidden md:inline-flex" to="/akun">
        <VscAccount size="25" />
      </Link>
      <Link
        className="btn btn-ghost flex h-fit flex-col gap-1 md:hidden"
        to="/akun"
      >
        <VscAccount size="25" />
        Akun
      </Link>
    </>
  );
};

export default AccountIcon;

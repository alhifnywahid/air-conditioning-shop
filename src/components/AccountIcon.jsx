import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";

const AccountIcon = () => {
  return (
    <Link className="btn btn-ghost" to="/akun">
      <VscAccount size="25" />
    </Link>
  );
};

export default AccountIcon
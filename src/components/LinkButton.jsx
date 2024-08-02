import { Link } from "react-router-dom";

function LinkButton({ className, children, ...props }) {
  return (
    <Link
      to={props.href}
      className={`btn border-none bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export default LinkButton;

import { Link } from "react-router-dom";

function LinkButton({ className, children, ...props }) {
  return (
    <Link
      to={props.href}
      className={`btn bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white border-none ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export default LinkButton;

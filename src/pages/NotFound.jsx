import { useEffect } from "react";
import { Link, useRouteError } from "react-router-dom";

function NotFound() {
  const error = useRouteError();
  useEffect(() => {
    console.log(error);
  });
  return (
    <>
      <div>Halaman yang ada cari tidak ada!</div>
      <Link to="/" className="btn bg-blue-500 text-white hover:bg-blue-600">
        Kembali ke halaman awal.
      </Link>
    </>
  );
}

export default NotFound;

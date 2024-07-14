import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layouts/Layout";
import {
  Account,
  Auth,
  DetailProduct,
  ForgetAccount,
  Galery,
  Home,
  KerjaSama,
  Kontak,
  Layanan,
  NotFound,
  Testing,
} from "../pages";
import Cart from "../pages/Cart";
import Protected from "./Protected";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product/:productId",
        element: <DetailProduct />,
      },
      {
        path: "layanan",
        element: <Layanan />,
      },
      {
        path: "galery",
        element: <Galery />,
      },
      {
        path: "kerja-sama",
        element: <KerjaSama />,
      },
      {
        path: "kontak",
        element: <Kontak />,
      },
      {
        path: "keranjang",
        element: (
          <Protected>
            <Cart />
          </Protected>
        ),
      },
      {
        path: "akun",
        element: (
          <Protected>
            <Account />
          </Protected>
        ),
      },
    ],
  },
  {
    path: "masuk",
    element: <Auth />,
  },
  {
    path: "daftar",
    element: <Auth />,
  },
  {
    path: "ganti-akun",
    element: <ForgetAccount />,
  },
  {
    path: "testing",
    element: <Testing />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;

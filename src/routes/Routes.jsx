import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "../context/CartProvider";
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
import Checkout from "../pages/Checkout";
import Akun from "../pages/OutletAkun/Akun";
import Alamat from "../pages/OutletAkun/Alamat";
import Pesanan from "../pages/OutletAkun/Pesanan";
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
        children: [
          {
            index: true,
            element: <Akun />,
          },
          {
            path: "pesanan",
            element: <Pesanan />,
          },
          {
            path: "alamat",
            element: <Alamat />,
          },
          {
            path: "keluar",
            element: <div>KELUAR</div>,
          },
        ],
      },
      {
        path: "checkout/*",
        element: (
          <Protected>
            <Checkout />
          </Protected>
        ),
      }
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
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
};

export default Routes;

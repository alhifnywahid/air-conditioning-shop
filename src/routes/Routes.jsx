import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Layanan from "../pages/Layanan";
import Kontak from "../pages/Kontak";
import Galery from "../pages/Galery";
import KerjaSama from "../pages/KerjaSama";
import NotFound from "../pages/NotFound";
import DetailProduct from "../pages/DetailProduct";
import Auth from "../pages/Auth";
import Account from "../pages/Account";
import AuthProtected from "./AuthProtected";
import ForgetAccount from "../pages/ForgetAccount";
import Header from "../components/Header";
import Testing from "../pages/Testing";
import Layout from "../layouts/Layout";
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
        path: "akun",
        element: (
          <AuthProtected>
            <Account />
          </AuthProtected>
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
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <>
//         <Layout>
//           <Home />
//         </Layout>
//       </>
//     ),
//   },
//   {
//     path: "product/:productId",
//     element: (
//       <>
//         <Layout>
//           <DetailProduct />
//         </Layout>
//       </>
//     ),
//   },
//   {
//     path: "layanan",
//     element: (
//       <>
//         <Layout>
//           <Layanan />
//         </Layout>
//       </>
//     ),
//   },
//   {
//     path: "galery",
//     element: (
//       <>
//         <Layout>
//           <Galery />
//         </Layout>
//       </>
//     ),
//   },
//   {
//     path: "kerja-sama",
//     element: (
//       <>
//         <Layout>
//           <KerjaSama />
//         </Layout>
//       </>
//     ),
//   },
//   {
//     path: "kontak",
//     element: (
//       <>
//         <Layout>
//           <Kontak />
//         </Layout>
//       </>
//     ),
//   },
//   {
//     path: "masuk",
//     element: <Auth />,
//   },
//   {
//     path: "daftar",
//     element: <Auth />,
//   },
//   {
//     path: "akun",
//     element: (
//       <AuthProtected>
//         <Layout>
//           <Account />
//         </Layout>
//       </AuthProtected>
//     ),
//   },
//   {
//     path: "ganti-akun",
//     element: <ForgetAccount />,
//   },
//   {
//     path: "*",
//     element: <NotFound />,
//   },
// ]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;

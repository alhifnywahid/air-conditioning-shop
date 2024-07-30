import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "./index.css";
import Routes from "./routes/Routes";

function App() {
  useEffect(() => {
    const snap = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = import.meta.env.VITE_MIDTRANS_CK;
    const script = document.createElement("script");
    script.src = snap;
    script.type = "text/javascript";
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <ToastContainer position="top-left" autoClose={2000} stacked={true} />
      <Routes />
    </>
  );
}

export default App;

import Input from "./../components/Input";
import Form from "./../components/Form";
import Button from "../components/Button";
import CrossfadeCarousel from "@notbaldrick/react-crossfade-carousel";
import { FaFacebook, FaKey } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../service/auth.services";
import { getImages } from "../service/getImages.services";

function AuthLayout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wEmail, setWEmail] = useState(false);
  const [wPassword, setWPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    document.title = "Login";

    const newImages = [];
    const allImage = async () => {
      newImages.push(await getImages("landscape", 1));
      newImages.push(await getImages("square", 1));
      newImages.push(await getImages("square", 2));
      newImages.push(await getImages("square", 3));
      newImages.push(await getImages("square", 4));
      newImages.push(await getImages("portrait", 1));
      newImages.push(await getImages("square", 5));
      setImages(newImages); 
    };
    allImage();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await auth(email, password);
    const status = res.status;
    if (status || !status) {
      setLoading(false);
    }
    if (!status)
      return res.message.includes("User")
        ? setWEmail(true)
        : setWPassword(true);
    const path = location.state?.from?.pathname || "/";
    navigate(path, { replace: true });
    localStorage.setItem("token", res.result);
  };

  const handleInput = () => {
    setWEmail(false);
    setWPassword(false);
    setGrayscale(true);
  };

  return (
    <section>
      <div className="w-full h-screen grid grid-cols-1 justify-center items-center xl:grid-cols-3">
        <div className="outlin flex flex-col justify-center items-center ">
          {images.length <= 0 && (
              <Form className="w-[75%] sm:w-[500px] xl:w-[80%] flex flex-col gap-3">
                <span className="min-h-12 skeleton my-10 rounded"></span>
                <span className="min-h-12 skeleton rounded"></span>
                <span className="min-h-12 skeleton rounded"></span>
                <span className="min-h-4 skeleton rounded"></span>
                <span className="min-h-12 skeleton rounded"></span>
                <span className="min-h-4 my-4 skeleton rounded"></span>
                <span className="min-h-12 skeleton rounded"></span>
                <span className="min-h-12 skeleton rounded"></span>
              </Form>
          )}
          {images.length > 0 && (
            <>
              <h1 className="text-4xl font-bold w-full my-10 text-center">
                Selamat Datang
              </h1>
              <Form
                onSubmit={(e) => handleAuth(e)}
                action=""
                method="post"
                className="w-[75%] sm:w-[500px] xl:w-[80%] flex flex-col gap-3"
              >
                <Input
                  type="email"
                  placeholder="Email"
                  icon={<MdEmail color="grey" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleInput}
                  onBlur={() => setGrayscale(false)}
                  required
                />
                <span
                  className={`${
                    wEmail ? "block" : "hidden"
                  } w-full text-sm text-red-600 -mt-2`}
                >
                  Email tidak terdaftar! silahkah daftar terlebih dahulu
                </span>
                <Input
                  type="text"
                  placeholder="Password"
                  icon={<FaKey color="grey" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handleInput}
                  onBlur={() => setGrayscale(false)}
                  required
                />
                <span
                  className={`${
                    wPassword ? "block" : "hidden"
                  } w-full text-sm text-red-600 -mt-2`}
                >
                  Password Salah!
                </span>
                <span className="w-full text-sm flex justify-end">
                  <Link to="/ganti-akun" className="w-fit h-fit text-blue-400">
                    Lupa kata sandi?
                  </Link>
                </span>
                <Button type="submit">
                  {loading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Masuk"
                  )}
                </Button>
                <div className="divider">atau</div>
                <Link to="/google" className="btn">
                  <FcGoogle size={25} />
                  Masuk dengan Google
                </Link>
                <Link to="/google" className="btn ">
                  <FaFacebook size={25} color="#3b82f6" />
                  Masuk dengan Facebook
                </Link>
              </Form>
            </>
          )}
        </div>

        <div className="hidden xl:grid grid-cols-4 grid-rows-4 gap-1 w-full h-screen col-span-2">
          {[...Array(7)].map((_,i) => (
            <FadeCarousel
              key={i}
              grayscale={grayscale}
              images={images}
              imgIndex={i}
              className={`${i == 0 && "row-span-2 col-span-3"} ${
                i == 4 && "row-span-2 col-span-2"
              } ${i == 5 && "row-span-2"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const FadeCarousel = ({ className = "", grayscale = false, images = [], imgIndex = 0 }) => {
  const isImages = images.length === 0;
  return (
    <CrossfadeCarousel
      className={`grayscale hover:grayscale-0 transition-all cursor-pointer rounded ${
        grayscale && "grayscale-0"
      } ${isImages && "skeleton"} ${className}`}
      interval={2000}
      transition={2000}
      images={isImages ? [] : images[imgIndex]}
    />
  );
};


export default AuthLayout;

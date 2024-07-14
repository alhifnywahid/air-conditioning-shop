import CrossfadeCarousel from "@notbaldrick/react-crossfade-carousel";
import { useEffect, useState } from "react";
import { FaFacebook, FaKey, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import { auth } from "../service/auth.services";
import { getImages } from "../service/getImages.services";
import { register } from "../service/resgister.services";

function Auth() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isInput, setIsInput] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [images, setImages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.includes("masuk") ? "Masuk" : "Daftar";
    document.title = path + " - Berkah Teknik";
  }, [location]);

  useEffect(() => {
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

  const handleInput = () => {
    setIsInput({ ...isInput, email: false, password: false });
    setGrayscale(true);
  };

  const restartForm = () => {
    setInput({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setIsInput({
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
  };

  return (
    <section>
      <div className="w-full h-screen grid grid-cols-1 justify-center items-center xl:grid-cols-3">
        <div className="outlin flex flex-col justify-center items-center ">
          {images.length <= 0 && (
            <>
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
            </>
          )}
          {images.length > 0 && (
            <>
              {location.pathname.includes("masuk") && (
                <LoginForm
                  input={input}
                  setInput={setInput}
                  isInput={isInput}
                  setIsInput={setIsInput}
                  handleInput={handleInput}
                  setGrayscale={setGrayscale}
                  loading={loading}
                  setLoading={setLoading}
                  restartForm={restartForm}
                />
              )}
              {location.pathname.includes("daftar") && (
                <RegisterForm
                  input={input}
                  setInput={setInput}
                  isInput={isInput}
                  setIsInput={setIsInput}
                  handleInput={handleInput}
                  setGrayscale={setGrayscale}
                  loading={loading}
                  setLoading={setLoading}
                  restartForm={restartForm}
                />
              )}
            </>
          )}
        </div>

        <div className="hidden xl:grid grid-cols-4 grid-rows-4 gap-1 w-full h-screen col-span-2">
          {[...Array(7)].map((_, i) => (
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

const Accordion = ({ isInput, text }) => {
  return (
    <span
      className={`${
        isInput ? "block" : "hidden"
      } w-full text-sm text-red-600 -mt-2`}
    >
      {text}
    </span>
  );
};

const FadeCarousel = ({
  className = "",
  grayscale = false,
  images = [],
  imgIndex = 0,
}) => {
  const isImages = images.length === 0;
  return (
    <CrossfadeCarousel
      className={`grayscale hover:grayscale-0 transition-all cursor-pointer rounded ${
        grayscale && "grayscale-0"
      } ${isImages && "skeleton"} ${className}`}
      interval={1500}
      transition={1500}
      images={isImages ? [] : images[imgIndex]}
    />
  );
};

const LoginForm = (props) => {
  const {
    input,
    setInput,
    isInput,
    setIsInput,
    handleInput,
    setGrayscale,
    loading,
    setLoading,
    restartForm,
  } = props;
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await auth(input.email, input.password);
    const status = res.status;
    if (status || !status) {
      setLoading(false);
    }
    if (!status)
      return res.message.includes("User")
        ? setIsInput({ ...isInput, email: true })
        : setIsInput({ ...isInput, password: true });
    const path = location.state?.from?.pathname || "/";
    navigate(path, { replace: true });
    localStorage.setItem("token", res.result);
  };

  return (
    <>
      <h1 className="text-4xl font-bold w-full my-10 text-center">
        Selamat Datang
      </h1>
      <Form
        onSubmit={(e) => handleLogin(e)}
        action=""
        method="post"
        className="w-[75%] sm:w-[500px] xl:w-[80%] flex flex-col gap-3"
      >
        <Input
          type="email"
          placeholder="Email"
          icon={<MdEmail color="grey" />}
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          onFocus={handleInput}
          onBlur={() => setGrayscale(false)}
          required
        />
        <Accordion
          isInput={isInput.email}
          text="Email tidak terdaftar! silahkah daftar terlebih dahulu"
        />
        <Input
          type="password"
          placeholder="Password"
          icon={<FaKey color="grey" />}
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          onFocus={handleInput}
          onBlur={() => setGrayscale(false)}
          required
        />
        <Accordion isInput={isInput.password} text="Password Salah!" />
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
        <div className="my-5 w-fit mx-auto">
          Belum punya akun?{" "}
          <Link onClick={restartForm} to="/daftar" className="text-blue-400">
            Daftar
          </Link>
        </div>
      </Form>
    </>
  );
};

const RegisterForm = (props) => {
  const {
    input,
    setInput,
    handleInput,
    isInput,
    setIsInput,
    setGrayscale,
    loading,
    setLoading,
    restartForm,
  } = props;
  const handleRegister = async (e) => {
    e.preventDefault();
    if (input.password !== input.confirmPassword)
      return setIsInput({ ...isInput, confirmPassword: true });
    setLoading(true);
    const res = await register(input.name, input.email, input.password);
    const status = res.status;
    if (status || !status) {
      setLoading(false);
    }
    if (!res.status) return setIsInput({ ...isInput, email: true });
    toast.success("Akun Berhasil di buat, Silahkan masuk.");
  };
  return (
    <>
      <h1 className="text-4xl font-bold w-full my-10 text-center">
        Selamat Datang
      </h1>
      <Form
        onSubmit={(e) => handleRegister(e)}
        className="w-[75%] sm:w-[500px] xl:w-[80%] flex flex-col gap-3"
      >
        <Input
          type="text"
          placeholder="Nama Lengkap"
          icon={<FaUser color="grey" />}
          value={input.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
          onFocus={handleInput}
          onBlur={() => setGrayscale(false)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          icon={<MdEmail color="grey" />}
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          onFocus={handleInput}
          onBlur={() => setGrayscale(false)}
          required
        />
        <Accordion
          isInput={isInput.email}
          text="Email tersebut sudah terdaftar! silahkan masuk."
        />
        <Input
          type="password"
          placeholder="Password"
          icon={<RiLockPasswordFill color="grey" />}
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          onFocus={handleInput}
          onBlur={() => setGrayscale(false)}
          minLength={8}
          maxLength={20}
          pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}"
          required
        />
        <Accordion
          isInput={isInput.password}
          text="Password harus terdiri dari 8-20 karakter!"
        />
        <Input
          type="password"
          placeholder="Ulangi Password"
          icon={<RiLockPasswordLine color="grey" />}
          value={input.confirmPassword}
          onChange={(e) =>
            setInput({ ...input, confirmPassword: e.target.value })
          }
          onFocus={handleInput}
          onBlur={() => setGrayscale(false)}
          minLength={8}
          maxLength={20}
          pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}"
          required
        />
        <Accordion
          isInput={isInput.confirmPassword}
          text="Password tidak cocok!"
        />
        <Button type="submit">
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Daftar"
          )}
        </Button>
        <div className="divider">atau daftar dengan</div>
        <div className="grid grid-cols-2 gap-2">
          <Link to="/google" className="btn w-full">
            <FcGoogle size={25} />
            Google
          </Link>
          <Link to="/google" className="btn w-full ">
            <FaFacebook size={25} color="#3b82f6" />
            Facebook
          </Link>
        </div>
        <div className="my-5 w-fit mx-auto">
          Sudah punya akun?{" "}
          <Link onClick={restartForm} to="/masuk" className="text-blue-400">
            Masuk
          </Link>
        </div>
      </Form>
    </>
  );
};

export default Auth;

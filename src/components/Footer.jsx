import { Link } from "react-router-dom";
import Button from "../components/Button";
function Footer() {
  const dataLink = ["Home", "Layanan", "Galery", "Kerja Sama", "Kontak"];

  return (
    <div className="pt-10 px-2 mb-20 md:px-6 md:mb-5">
      <div className="2xl:container">
        <div className="bg-blue-400 rounded-xl p-4 flex flex-col gap-1 md:gap-4 md:flex-row">
          <div className=" h-fit py-4 md:my-4 md:ms-4">
            <h2 className="font-bold text-xl text-white text-center md:text-left text-nowrap">
              Daftarkan Sekarang! <br /> Untuk mendapatkan update terbaru.
            </h2>
          </div>
          <div className="flex justify-between bg-white p-4 md:my-4 md:me-4 rounded-xl w-full gap-2 md:gap-4 md:justify-center md:items-center">
            <label htmlFor="subscirbe" className="w-full">
              <input
                type="email"
                id="subscirbe"
                className="input input-bordered w-full"
              />
            </label>
            <Button className="w-fit">Langaanan</Button>
          </div>
        </div>
        <ul className="hidden gap-3 md:flex my-4">
          {dataLink.map((item, index) => (
            <li key={index}>
              <Link className="hover:text-blue-400">{item}</Link>
            </li>
          ))}
        </ul>
        <div className="divider"></div>
        <div className="flex flex-col gap-2 items-center md:flex-row justify-between">
          <h3 className="order-3 md:order-1 text-sm md:flex-1">
            © 2024 BerkahTeknik. All rights reserved.
          </h3>
          <Link className="text-3xl font-bold order-1 ">Berkah Teknik</Link>
          <div className="order-2 flex gap-2 md:flex-1 justify-end">
            <Link className="hover:text-blue-400 text-sm" to="/">
              Terms of Service
            </Link>
            <Link className="hover:text-blue-400 text-sm" to="/">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

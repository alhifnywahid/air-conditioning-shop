import { Link } from "react-router-dom";
import Button from "../components/Button";
function Footer() {
  const dataLink = ["Home", "Layanan", "Galery", "Kerja Sama", "Kontak"];

  return (
    <div className="mb-20 px-2 pt-10 md:mb-5 md:px-6">
      <div className="2xl:container">
        <div className="flex flex-col gap-1 rounded-xl bg-blue-400 p-4 md:flex-row md:gap-4">
          <div className="h-fit py-4 md:my-4 md:ms-4">
            <h2 className="text-nowrap text-center text-xl font-bold text-white md:text-left">
              Daftarkan Sekarang! <br /> Untuk mendapatkan update terbaru.
            </h2>
          </div>
          <div className="flex w-full justify-between gap-2 rounded-xl bg-white p-4 md:my-4 md:me-4 md:items-center md:justify-center md:gap-4">
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
        <ul className="my-4 hidden gap-3 md:flex">
          {dataLink.map((item, index) => (
            <li key={index}>
              <Link className="hover:text-blue-400">{item}</Link>
            </li>
          ))}
        </ul>
        <div className="divider"></div>
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <h3 className="order-3 text-sm md:order-1 md:flex-1">
            © 2024 BerkahTeknik. All rights reserved.
          </h3>
          <Link className="order-1 text-3xl font-bold">Berkah Teknik</Link>
          <div className="order-2 flex justify-end gap-2 md:flex-1">
            <Link className="text-sm hover:text-blue-400" to="/">
              Terms of Service
            </Link>
            <Link className="text-sm hover:text-blue-400" to="/">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

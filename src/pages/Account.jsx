import { Fragment, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import { changePicture } from "../service/changePicture";
import { getUser } from "../service/getUser.service";
import { base64 } from "../utils/Function";

function Account() {
  const links = ["/akun", "alamat", "pesanan"];
  const [profile, setProfile] = useState({});
  const [file, setFile] = useState(null);
  const { pathname } = useLocation();
  const refModal = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    getUser(token).then((res) => setProfile(res));
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll("ul li a[data-link]");
    const styles = [
      "bg-blue-400",
      "text-white",
      "hover:bg-blue-500",
      "active:bg-blue-600",
    ];
    links.forEach((el) => {
      if (pathname.endsWith(el.getAttribute("href"))) {
        el.classList.add(...styles);
      } else {
        el.classList.remove(...styles);
      }
    });
  }, [pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/masuk");
  };

  const uploadImage = async (e) => {
    const base = await base64(e.target.files[0]);
    changePicture(base, profile.id).then((e) =>
      toast.success("Gambar berhasil di ubah."),
    );
    setFile(base);
  };

  return (
    <>
      {profile && (
        <section className="bg-base-200 2xl:py-2">
          <div className="mb-2 flex justify-center rounded-xl bg-base-100 p-5 2xl:container">
            <h2 className="text-2xl font-bold">Akun Saya</h2>
          </div>
          <div className="flex flex-col justify-center gap-2 rounded-xl 2xl:container lg:flex-row">
            <div className="sticky top-20 flex h-fit basis-1/5 flex-col items-center gap-2 rounded-xl bg-base-100 p-6">
              <div className="avatar">
                <label
                  htmlFor="profile"
                  className="group relative block w-24 cursor-pointer overflow-hidden rounded-full border shadow"
                >
                  <span className="absolute right-0 top-0 hidden h-full w-full items-center justify-center text-white backdrop-blur-[1px] group-hover:flex">
                    Ganti
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    id="profile"
                    onChange={uploadImage}
                  />
                  <img
                    src={file || profile.profile_pic}
                    className="aspect-square w-full rounded-full object-contain"
                  />
                </label>
              </div>
              <h2 className="w-full text-center text-xl font-bold">
                {profile.name}
              </h2>
              <span className="divider m-0"></span>
              <ul className="flex w-full flex-col gap-1">
                {links.map((item, i) => (
                  <Fragment key={i}>
                    <li>
                      <Link
                        to={item}
                        className="link-nav btn btn-ghost w-full justify-start capitalize"
                        data-link={item.replace("/", "")}
                      >
                        {item.replace("/", "")}
                      </Link>
                    </li>
                  </Fragment>
                ))}
              </ul>
              <button
                className="link-nav btn btn-ghost w-full justify-start capitalize"
                onClick={() => refModal.current.showModal()}
              >
                Keluar
              </button>
            </div>
            <Outlet />
          </div>
          <dialog ref={refModal} className="modal">
            <div className="modal-box">
              <h3 className="w-full text-center text-lg font-bold">Pesan</h3>
              <p className="my-6 w-full py-4 text-center">
                Apakah anda yakin ingin keluar?
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => refModal.current.close()}>Tidak</Button>
                <Button onClick={logout}>Ya</Button>
              </div>
            </div>
          </dialog>
        </section>
      )}
    </>
  );
}

export default Account;

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
          <div className="2xl:container bg-base-100 rounded-xl p-5 flex justify-center mb-2">
            <h2 className="font-bold text-2xl">Akun Saya</h2>
          </div>
          <div className="2xl:container rounded-xl flex flex-col justify-center lg:flex-row gap-2">
            <div className="flex flex-col gap-2 basis-1/5 p-6 rounded-xl bg-base-100 items-center h-fit sticky top-20">
              <div className="avatar">
                <label
                  htmlFor="profile"
                  className="group w-24 block cursor-pointer relative rounded-full shadow border  overflow-hidden"
                >
                  <span className="absolute top-0 right-0 w-full h-full hidden justify-center items-center group-hover:flex backdrop-blur-[1px] text-white">
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
                    className="rounded-full w-full aspect-square object-contain"
                  />
                </label>
              </div>
              <h2 className="font-bold w-full text-center text-xl">
                {profile.name}
              </h2>
              <span className="divider m-0"></span>
              <ul className="w-full flex flex-col gap-1">
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
              <h3 className="font-bold text-lg w-full text-center">Pesan</h3>
              <p className="py-4 w-full text-center my-6">
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

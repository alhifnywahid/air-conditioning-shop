import { useRef } from "react";
import { BsFillMenuButtonWideFill, BsMenuButton, BsMenuUp } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";
import { GrContactInfo, GrGallery } from "react-icons/gr";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { RiServiceLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import AccountIcon from "./AccountIcon";
import CartIcon from "./CartIcon";
const NavMobile = () => {
  const modalRef = useRef(null);
  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  return (
    <>
      <div className="flex justify-evenly items-center fixed bottom-0 w-full z-10 shadow-inner p-2 md:hidden bg-blue-500 text-white font-bold">
        <Link to="/" className="btn btn-ghost flex flex-col gap-1 h-fit">
          <IoHomeOutline size="25" />
          Beranda
        </Link>
        <button onClick={openModal} className="btn btn-ghost flex flex-col gap-1 h-fit" to="#">
          <BsFillMenuButtonWideFill size="25" />
          Menu
        </button>
        <CartIcon />
        <AccountIcon />
        <dialog ref={modalRef} className="modal" onClick={closeModal}>
          <div className="modal-box bg-base text-black fixed bottom-0 left-0 w-full rounded-xl rounded-b-none flex flex-col gap-1">
            <GoTo onClick={closeModal} />
            <button
              className="btn btn-ghost w-full flex justify-start gap-3 shadow"
              onClick={closeModal}
            >
              <IoMdCloseCircleOutline size={25} />
              <span className="capitalize">Kembali</span>
            </button>
          </div>
        </dialog>
      </div>
    </>
  );
};

const GoTo = ({ onClick }) => {
  const dataLinks = [
    {
      icon: <RiServiceLine size={25} />,
      link: "/layanan",
    },
    {
      icon: <GrGallery size={25} />,
      link: "/galery",
    },
    {
      icon: <FaRegHandshake size={25} />,
      link: "/kerja-sama",
    },
    {
      icon: <GrContactInfo size={25} />,
      link: "/kontak",
    },
  ];
  return dataLinks.map(({ icon, link }, i) => (
    <Link
      key={i}
      to={link}
      className="btn btn-ghost w-full flex justify-start gap-3 shadow"
      onClick={onClick}
    >
      {icon}
      <span className="capitalize">
        {link.replace("/", "").replace("-", " ")}
      </span>
    </Link>
  ));
};

export default NavMobile;

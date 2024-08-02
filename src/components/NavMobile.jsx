import { useRef } from "react";
import {
  BsFillMenuButtonWideFill,
  BsMenuButton,
  BsMenuUp,
} from "react-icons/bs";
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
      <div className="fixed bottom-0 z-10 flex w-full items-center justify-evenly bg-blue-500 p-2 font-bold text-white shadow-inner md:hidden">
        <Link to="/" className="btn btn-ghost flex h-fit flex-col gap-1">
          <IoHomeOutline size="25" />
          Beranda
        </Link>
        <button
          onClick={openModal}
          className="btn btn-ghost flex h-fit flex-col gap-1"
          to="#"
        >
          <BsFillMenuButtonWideFill size="25" />
          Menu
        </button>
        <CartIcon />
        <AccountIcon />
        <dialog ref={modalRef} className="modal" onClick={closeModal}>
          <div className="bg-base modal-box fixed bottom-0 left-0 flex w-full flex-col gap-1 rounded-xl rounded-b-none text-black">
            <GoTo onClick={closeModal} />
            <button
              className="btn btn-ghost flex w-full justify-start gap-3 shadow"
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
      className="btn btn-ghost flex w-full justify-start gap-3 shadow"
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

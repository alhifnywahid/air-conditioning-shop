import { useContext, useEffect, useRef, useState } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { Button } from "../../components";
import { CartContext } from "../../context/CartProvider";
import { dateFormat } from "../../utils/Function";
import { FaVoicemail } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

function Akun() {
  const { user, setUpdateUser } = useContext(CartContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    setData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone_number || "",
    });
  }, [user]);
  const dialogRef = useRef(null);
  const addAddress = () => {};
  return (
    <div className="sticky top-20 flex basis-4/5 flex-col gap-4 rounded-xl bg-base-100 p-6">
      <h2 className="w-full text-left text-lg font-bold">Detail Akun</h2>
      <div className="overflow-x-auto">
        <table className="table w-fit">
          <tbody>
            <Tr title="Nama" value={user.name} />
            <Tr title="Email" value={user.email} />
            <Tr title="No Telepon" value={user.phone_number || "-"} />
            <Tr title="Terdaftar pada" value={dateFormat(user.createdAt)} />
          </tbody>
        </table>
      </div>
      <Button className="w-1/5" onClick={() => dialogRef.current.showModal()}>
        Ubah
      </Button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="w-full text-center text-lg font-bold">Ubah Data</h3>
          <form
            method="post"
            action=""
            onSubmit={addAddress}
            className="my-4 flex flex-col gap-2"
          >
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Nama Lengkap"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              <MdDriveFileRenameOutline size={20} />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="email"
                className="grow"
                placeholder="Email Aktif"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <FaVoicemail size={20} />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Nomor Telepon"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
              <FiPhone size={20} />
            </label>
          </form>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => dialogRef.current.close()}>Tidak</Button>
            <Button type="submit">Ya</Button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

const Tr = ({ title, value }) => {
  return (
    <tr>
      <th>{title}</th>
      <td>:</td>
      <td>{value}</td>
    </tr>
  );
};

export default Akun;

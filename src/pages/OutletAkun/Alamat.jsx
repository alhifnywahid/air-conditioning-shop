import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { Button } from "../../components";
import { CartContext } from "../../context/CartProvider";
import { addAdress, delAddress } from "../../service/address.services";
import { getsAddress } from "../../service/thecloudalert";
import Select from "../../components/Select";
import TextField from "../../components/TextField";

const changesAddress = (e, setFullAddress, selector) => {
  const { name } = e.target;
  const el = document.querySelectorAll(selector);
  const selected = [...el].map((item) => {
    return item.value;
  });
  if (/provinsi/i.test(name)) {
    getsAddress(selected[0]).then((res) => setFullAddress(res));
  } else if (/kab|kota/i.test(name)) {
    getsAddress(selected[0], selected[1]).then((res) => setFullAddress(res));
  } else if (/kecamatan/i.test(name)) {
    getsAddress(selected[0], selected[1], selected[2]).then((res) =>
      setFullAddress(res),
    );
  }
};

const onSubmit = (e, setUpdateUser, dialogRef, selector, addressId = null) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const input = [...document.querySelectorAll(selector)].map((item) => {
    return item.lastChild.nodeName == "SELECT"
      ? [item.lastChild.value, item.lastChild.selectedOptions[0].text].join("-")
      : item.lastChild.value;
  });
  const data = {
    nama_alamat: input[0],
    penerima: input[1],
    no_penerima: input[2],
    desa: input[6],
    kecamatan: input[5],
    kabupaten: input[4],
    provinsi: input[3],
    kodepos: input[7],
    alamat_detail: input[8],
  };
  addAdress(token, data, addressId).then(() => {
    setUpdateUser((prev) => !prev);
  });
  dialogRef.current.close();
};

function Alamat() {
  const { user, setUpdateUser } = useContext(CartContext);
  const dialogRef = useRef(null);
  const [dAddress, setDAddress] = useState([]);
  const [fullAddress, setFullAddress] = useState({
    provinsi: null,
    kabkota: null,
    kecamatan: null,
    kelurahan: null,
    kodepos: null,
  });

  useEffect(() => {
    getsAddress().then((res) => setFullAddress(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user.alamat) return setDAddress(user);
  }, [user]);

  const deleteAddress = (e) => {
    const userId = localStorage.getItem("token");
    const addressId = e.target.value;
    delAddress(userId, addressId).then(() => {
      e.target.parentElement.parentElement.parentElement.removeAttribute(
        "open",
      );
      setUpdateUser((prev) => !prev);
    });
  };

  const changeFullAdd = (e) => {
    changesAddress(e, setFullAddress, "#add select");
  };

  const submitAddress = (e) => {
    onSubmit(e, setUpdateUser, dialogRef, "#add label");
  };

  return (
    <div className="sticky top-20 flex basis-4/5 flex-col gap-4 rounded-xl bg-base-100 p-6">
      <h2 className="w-full text-left text-lg font-bold">
        <Button onClick={() => dialogRef.current.showModal()}>
          Tambah Alamat
        </Button>
      </h2>
      {dAddress.length != 0 ? (
        <div className="flex flex-wrap gap-4">
          {dAddress.alamat.map((data, i) => (
            <Fragment key={i}>
              <CardAddress
                data={data}
                handlerDelete={deleteAddress}
                changeFullAdd={changeFullAdd}
                fullAddress={fullAddress}
                setFullAddress={setFullAddress}
                setUpdateUser={setUpdateUser}
              />
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="flex h-56 w-full flex-col items-center justify-center gap-4">
          <h3 className="text-lg">Belum ada alamat.</h3>
          <Button className="">Tambah Alamat</Button>
        </div>
      )}

      <dialog id="add" ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="w-full text-lg font-bold">Tambah Alamat</h3>
          <form onSubmit={submitAddress} className="my-4 flex flex-col gap-2">
            <Div>
              <TextField title="Nama Alamat" placeholder="Kantor" />
              <TextField title="Nama Penerima" placeholder="C Ronaldo" />
            </Div>
            <Div>
              <TextField
                title="Nomor Penerima"
                placeholder="0856xxxxxxxx"
                pattern="^[0-9]{10,15}$"
              />
              <Select
                title="Provinsi"
                data={fullAddress.provinsi}
                onChange={changeFullAdd}
              />
            </Div>
            <Div>
              <Select
                title="Kab/Kota"
                data={fullAddress.kabkota}
                onChange={changeFullAdd}
              />
              <Select
                title="Kecamatan"
                data={fullAddress.kecamatan}
                onChange={changeFullAdd}
              />
            </Div>
            <Div>
              <Select
                title="Desa/Kelurahan"
                data={fullAddress.kelurahan}
                onChange={changeFullAdd}
              />
              <Select
                title="Kode Pos"
                data={fullAddress.kodepos}
                onChange={changeFullAdd}
              />
            </Div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Alamat Detail</span>
              </div>
              <textarea
                data-input
                className="textarea textarea-bordered"
                placeholder="Jl. Cisarua No. 1..."
              ></textarea>
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button type="reset" onClick={() => dialogRef.current.close()}>
                Batal
              </Button>
              <Button type="submit">Tambah</Button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

const CardAddress = (props) => {
  const { data, handlerDelete, fullAddress, setFullAddress, setUpdateUser } =
    props;
  const dialogRef = useRef(null);
  const alamat = [
    data.desa.split("-")[1],
    data.kecamatan.split("-")[1],
    data.kabupaten.split("-")[1],
    data.provinsi.split("-")[1],
    data.kodepos.split("-")[1],
    data.alamat_detail,
  ];
  const [value, setValue] = useState({});

  const showModal = () => {
    setFullAddress({});
    const { provinsi, kabupaten, kecamatan, desa, kodepos } = data;
    getsAddress(
      provinsi.split("-")[0],
      kabupaten.split("-")[0],
      kecamatan.split("-")[0],
    ).then((res) => setFullAddress(res));
    setValue({
      provinsi: provinsi.split("-")[0],
      kabkota: kabupaten.split("-")[0],
      kecamatan: kecamatan.split("-")[0],
      kelurahan: desa.split("-")[0],
      kodepos: kodepos.split("-")[0],
    });
    dialogRef.current.showModal();
  };

  const changeFullAdd = (e) => {
    changesAddress(e, setFullAddress, "#change select");
  };

  const handlerChange = (e) => {
    e.preventDefault();
    onSubmit(e, setUpdateUser, dialogRef, "#change label", data._id);
  };

  return (
    <div className="w-80 rounded-xl bg-base-100 p-4 shadow shadow-blue-100">
      <div className="relative">
        <h1 className="text-lg font-semibold">{data.nama_alamat}</h1>
        <h3>{data.penerima}</h3>
        <h3>{data.no_penerima}</h3>
        <p className="line-clamp-2">{alamat.join(", ")}</p>
        <details className="dropdown dropdown-end absolute right-0 top-0">
          <summary className="btn btn-sm m-1">
            <HiOutlineDotsCircleHorizontal size={20} />
          </summary>
          <ul className="menu dropdown-content z-[1] w-fit rounded-box bg-base-100 p-2 shadow">
            <li>
              <button value={data._id} onClick={handlerDelete}>
                Hapus
              </button>
            </li>
            <li>
              <button onClick={showModal}>Ubah</button>
            </li>
          </ul>
        </details>
      </div>
      <dialog ref={dialogRef} className="modal">
        {fullAddress.provinsi ? (
          <div className="modal-box">
            <h3 className="w-full text-lg font-bold">Ubah Alamat</h3>
            <form
              id="change"
              onSubmit={handlerChange}
              className="my-4 flex flex-col gap-2"
            >
              <Div>
                <TextField
                  title="Nama Alamat"
                  placeholder="Kantor"
                  defaultValue={data.nama_alamat}
                />
                <TextField
                  title="Nama Penerima"
                  placeholder="C Ronaldo"
                  defaultValue={data.penerima}
                />
              </Div>
              <Div>
                <TextField
                  title="Nomor Penerima"
                  placeholder="0856xxxxxxxx"
                  pattern="^[0-9]{10,15}$"
                  defaultValue={data.no_penerima}
                />
                <Select
                  title="Provinsi"
                  data={fullAddress.provinsi}
                  onChange={changeFullAdd}
                  defaultValue={value.provinsi}
                />
              </Div>
              <Div>
                <Select
                  title="Kab/Kota"
                  data={fullAddress.kabkota}
                  onChange={changeFullAdd}
                  defaultValue={value.kabkota}
                />
                <Select
                  title="Kecamatan"
                  data={fullAddress.kecamatan}
                  onChange={changeFullAdd}
                  defaultValue={value.kecamatan}
                />
              </Div>
              <Div>
                <Select
                  title="Desa/Kelurahan"
                  data={fullAddress.kelurahan}
                  onChange={changeFullAdd}
                  defaultValue={value.kelurahan}
                />
                <Select
                  title="Kode Pos"
                  data={fullAddress.kodepos}
                  onChange={changeFullAdd}
                  defaultValue={value.kodepos}
                />
              </Div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Alamat Detail</span>
                </div>
                <textarea
                  data-input
                  className="textarea textarea-bordered"
                  placeholder="Jl. Cisarua No. 1..."
                  defaultValue={data.alamat_detail}
                ></textarea>
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  onClick={async () => dialogRef.current.close()}
                >
                  Batal
                </Button>
                <Button type="submit">Ubah</Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex min-h-full min-w-full items-center justify-center">
            <span className="loading loading-spinner w-20 text-base-300"></span>
          </div>
        )}
      </dialog>
    </div>
  );
};

const Div = ({ children }) => {
  return <div className="grid grid-cols-2 gap-2">{children}</div>;
};

export default Alamat;

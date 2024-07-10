import { CiUser } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import Button from "../components/Button";
function Layanan() {
  const dataLayanan = [
    {
      src: "/layanan/1.png",
      title: "Pemilihan Unit",
      desc: "Konsultasi tentang apa yang dibutuhkan klien dan pelanggan untuk ruangan mereka. Kami memberikan saran dari berbagai produk dan premium kami. ",
    },
    {
      src: "/layanan/2.png",
      title: "Instalasi",
      desc: "Instalasi produk oleh para ahli kami pada bangunan klien dan pelanggan. Kami memastikan pekerjaan kami benar-benar berhasil dengan memberikan jaminan. ",
    },
    {
      src: "/layanan/3.png",
      title: "Reparasi Unit",
      desc: "Reparasi produk oleh tenaga ahli kami untuk klien dan pelanggan AC kami. Kami memastikan setiap produk yang diperbaiki akan bekerja dengan optimal. ",
    },
    {
      src: "/layanan/4.png",
      title: "Perawatan Berkala",
      desc: "Pemeliharaan bulanan atau tahunan oleh para ahli kami untuk memastikan AC klien dan pelanggan kami bekerja sebaik mungkin. ",
    },
    {
      src: "/layanan/5.png",
      title: "Cek Unit",
      desc: "Pemecahan masalah oleh para ahli kami untuk setiap masalah pada berbagai AC. Dengan alat dan keterampilan lengkap kami, kami memastikan solusi untuk klien dan pelanggan kami. ",
    },
    {
      src: "/layanan/6.png",
      title: "Pergantian Unit",
      desc: "Penggantian produk oleh tenaga ahli kami untuk mengganti AC lama dengan yang baru dan efisien. ",
    },
    {
      src: "/layanan/7.png",
      title: "Sewa Unit",
      desc: "Persewaan produk untuk perusahaan, institusi atau organisasi yang membutuhkan Air Conditioner dalam waktu singkat. ",
    },
    {
      src: "/layanan/8.png",
      title: "Tukar Tambah",
      desc: "Kami menerima tukar tambah semua merk AC bekas baik satuan maupun borongan. ",
    },
    {
      src: "/layanan/9.png",
      title: "Jual Beli AC Baru / Bekas Sparepart",
      desc: "Kami menerima penjualan unit AC bekas berbagai merk, kapasitas dan type baik satuan maupun borongan. ",
    },
  ];

  return (
    <div className="2xl:container mx-4 mt-4 md:px-8">
      <div className="flex flex-col-reverse gap-4 justify-center items-center mb-4 md:flex-row rounded-xl p-4">
        <div className="flex flex-col gap-4 justify-center items-center md:flex-1 md:items-start">
          <h2 className="text-3xl font-bold w-fit md:text-3xl">Layanan Kami</h2>
          <p className="w-fit text-justify md:text-left md:text-xl">
            Kami dengan bangga menyediakan berbagai layanan berkualitas tinggi
            terkait dengan sistem pendingin udara (AC) Anda. Dengan pengalaman
            bertahun-tahun dalam industri ini, kami telah menjadi tujuan utama
            bagi individu dan bisnis yang membutuhkan solusi AC yang andal dan
            efisien. Berikut adalah beberapa layanan unggulan yang kami tawarkan
          </p>
          <Button
            onClick={() => document.getElementById("modal_layanan").showModal()}
          >
            Pesan Layanan Sekarang!
          </Button>
        </div>
        <div className="md:flex-1">
          <img src="/public/paid-2.jpg" alt="" />
        </div>
      </div>
      <div className="divider"></div>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dataLayanan.map((item, index) => (
          <div
            key={index}
            className="shadow-custom-1 border overflow-hidden rounded-md flex flex-col hover:shadow-blue-100 hover:shadow-xl"
          >
            <img
              className="aspect-[3/2] object-cover pt-4 px-4 xs:p-0"
              src={item.src}
            />
            <div className="flex flex-col gap-2 p-4 justify-center">
              <h3 className="text-xl font-semibold line-clamp-1">
                {item.title}
              </h3>
              <p className="line-clamp-5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <dialog id="modal_layanan" className="modal">
        <div className="modal-box">
          <div>
            <h1 className="font-bold text-2xl m-4 text-center">
              Pesan layanan kami
            </h1>
            <form className=" flex flex-col gap-4">
              <label className="input input-bordered flex items-center gap-2">
                <CiUser />
                <input
                  type="text"
                  className="grow"
                  placeholder="Nama Lengkap"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <MdAlternateEmail />
                <input type="text" className="grow" placeholder="Email Aktif" />
              </label>
              <label className="form-control">
                <select className="select select-bordered">
                  <option disabled selected>
                    Pilih Layanan
                  </option>
                  {dataLayanan.map((item, index) => (
                    <option key={index} value={item}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Pesan Tambahan"
              ></textarea>
              <Button type="submit">Pesan</Button>
            </form>
            <form method="dialog" className="mt-2">
              <Button className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700">
                Batal
              </Button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Layanan;
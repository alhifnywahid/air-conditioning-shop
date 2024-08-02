import LinkButton from "../components/LinkButton";
function KerjaSama() {
  const dataKerjaSama = [
    {
      src: "/layanan/1.png",
      title: "Berpengalaman",
      desc: "Kami berpengalaman sejak tahun 1998 dalam bisnis penerimaan AC bekas, kami siap memberikan penawaran menarik dalam setiap transaksi. ",
    },
    {
      src: "/layanan/2.png",
      title: "Mitra Terbaik",
      desc: "Kami siap memberikan solusi bagi Anda yang ingin menjual AC bekas dan AC rusak berapapun jumlahnya.",
    },
    {
      src: "/layanan/3.png",
      title: "Terpercaya",
      desc: "Kami selalu memberikan pelayanan sepenuh hati agar tercipta rasa aman dan nyaman saat bertransaksi sehingga akan terjalin kerjasama yang baik.",
    },
    {
      src: "/layanan/3.png",
      title: "Terpercaya",
      desc: "Kami selalu memberikan pelayanan sepenuh hati agar tercipta rasa aman dan nyaman saat bertransaksi sehingga akan terjalin kerjasama yang baik.",
    },
  ];

  return (
    <>
      <section className="bg-base-200 2xl:py-2">
        <div className="flex flex-col-reverse items-center justify-center rounded-xl bg-base-100 p-5 2xl:container lg:flex-row">
          <div className="box-border flex flex-col items-center justify-center gap-4 lg:m-6 lg:flex-1 lg:items-start">
            <h2 className="w-fit text-3xl font-bold md:text-3xl">Kerja Sama</h2>
            <p className="w-fit text-center xs:w-[90%] sm:w-[70%] lg:w-[85%] lg:text-left xl:text-xl">
              berkomitmen dalam memberikan pelayanan & penawaran harga terbaik
            </p>
          </div>
          <div className="md:flex-1">
            <img
              loading="lazy"
              className="mx-auto md:w-[85%] lg:w-full"
              src="/banner.png"
            />
          </div>
        </div>
      </section>
      <section className="bg-base-200 2xl:pb-2">
        <div className="grid grid-cols-1 gap-6 rounded-xl p-5 2xl:container xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:bg-base-100">
          {dataKerjaSama.map((item, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-md border shadow-custom-1 hover:shadow-xl hover:shadow-blue-100"
            >
              <img
                loading="lazy"
                className="aspect-[3/2] object-cover px-4 pt-4 xs:p-0"
                src={item.src}
              />
              <div className="flex flex-col justify-center gap-2 p-4">
                <h3 className="line-clamp-1 text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="line-clamp-5">{item.desc}</p>
              </div>
            </div>
          ))}
          <div className="col-span-full flex items-center justify-center">
            <LinkButton to="/kontak">Hubungi Kami Sekarang!</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

export default KerjaSama;

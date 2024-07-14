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
        <div className="2xl:container bg-base-100 rounded-xl p-5 flex flex-col-reverse justify-center items-center lg:flex-row">
          <div className="flex flex-col gap-4 justify-center items-center lg:flex-1 box-border lg:m-6 lg:items-start">
            <h2 className="text-3xl font-bold w-fit md:text-3xl">Kerja Sama</h2>
            <p className="w-fit text-center lg:text-left xl:text-xl xs:w-[90%] sm:w-[70%] lg:w-[85%]">
              berkomitmen dalam memberikan pelayanan & penawaran harga terbaik
            </p>
          </div>
          <div className="md:flex-1">
            <img
              loading="lazy"
              className="md:w-[85%] mx-auto lg:w-full"
              src="/public/banner.png"
            />
          </div>
        </div>
      </section>
      <section className="bg-base-200 2xl:pb-2">
        <div className="2xl:container xl:bg-base-100 p-5 rounded-xl grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dataKerjaSama.map((item, index) => (
            <div
              key={index}
              className="shadow-custom-1 border overflow-hidden rounded-md flex flex-col hover:shadow-blue-100 hover:shadow-xl"
            >
              <img
                loading="lazy"
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
          <div className="col-span-full flex justify-center items-center">
            <LinkButton to="/kontak">Hubungi Kami Sekarang!</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

export default KerjaSama;

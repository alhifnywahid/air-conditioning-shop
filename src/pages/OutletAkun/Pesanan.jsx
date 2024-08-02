import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Tabs } from "../../components/Tabs";
import { CartContext } from "../../context/CartProvider";
import { formatIDR } from "../../utils/Function";

function Pesanan() {
  const { user, cart, setUpdateUser } = useContext(CartContext);
  const [data, setData] = useState({
    semua: [],
    belum: [],
    diproses: [],
    dikirim: [],
    selesai: [],
    dibatalkan: [],
  });
  const tabsData = [
    {
      label: "Semua",
      content: <SemuaPesanan data={data.semua} />,
    },
    {
      label: "Belum Bayar",
      content: <BelumBayar data={data.belum} />,
    },
    {
      label: "Diproses",
      content: <DiProses data={data.diproses} />,
    },
    {
      label: "Dikirim",
      content: <Dikirim data={data.dikirim} />,
    },
    {
      label: "Selesai",
      content: <Selesai data={data.selesai} />,
    },
    {
      label: "Dibatalkan",
      content: <Dibatalkan data={data.dibatalkan} />,
    },
  ];

  useEffect(() => {
    if (user.orders) {
      setData({
        semua: user.orders,
        belum: user.orders.filter((v) => v.status == "pending"),
        diproses: user.orders.filter((v) => v.status == "settlement"),
        dikirim: user.orders.filter((v) => v.status == "kirim"),
        selesai: user.orders.filter((v) => v.status == "selesai"),
        dibatalkan: user.orders.filter((v) => v.status == "batal"),
      });
    }
  }, [user]);

  return (
    <div className="relative flex basis-4/5 flex-col gap-4 rounded-xl bg-base-100 p-6">
      <Tabs tabsData={tabsData} className="h-full" />
    </div>
  );
}

const Nothing = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <img
        className="aspect-square w-32"
        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/orderlist/5fafbb923393b712b964.png"
      />
      <h3>Belum ada pesanan</h3>
    </div>
  );
};

const SemuaPesanan = ({ data }) => {
  return data.length != 0 ? (
    data.map((v, i) => (
      <Fragment key={i}>
        <div className="flex flex-col gap-2">
          <OrderList key={i} data={v} />
        </div>
      </Fragment>
    ))
  ) : (
    <Nothing />
  );
};
const BelumBayar = ({ data }) => {
  return data.length != 0 ? (
    data.map((v, i) => (
      <Fragment key={i}>
        <div className="flex flex-col gap-2">
          <OrderList key={i} data={v} />
        </div>
      </Fragment>
    ))
  ) : (
    <Nothing />
  );
};
const DiProses = ({ data }) => {
  return data.length != 0 ? (
    data.map((v, i) => (
      <Fragment key={i}>
        <div className="flex flex-col gap-2">
          <OrderList key={i} data={v} />
        </div>
      </Fragment>
    ))
  ) : (
    <Nothing />
  );
};
const Dikirim = ({ data }) => {
  return data.length != 0 ? (
    data.map((v, i) => (
      <Fragment key={i}>
        <div className="flex flex-col gap-2">
          <OrderList key={i} data={v} />
        </div>
      </Fragment>
    ))
  ) : (
    <Nothing />
  );
};
const Selesai = ({ data }) => {
  return data.length != 0 ? (
    data.map((v, i) => (
      <Fragment key={i}>
        <div className="flex flex-col gap-2">
          <OrderList key={i} data={v} />
        </div>
      </Fragment>
    ))
  ) : (
    <Nothing />
  );
};
const Dibatalkan = ({ data }) => {
  return data.length != 0 ? (
    data.map((v, i) => (
      <Fragment key={i}>
        <div className="flex flex-col gap-2">
          <OrderList key={i} data={v} />
        </div>
      </Fragment>
    ))
  ) : (
    <Nothing />
  );
};

const OrderList = ({ data }) => {
  return (
    <Link
      onClick={() => toast.error("Fitur ini belum tersedia")}
      className="relative border border-gray-300 hover:border-blue-300"
    >
      <div className="flex justify-between border-b px-4 py-2 font-semibold">
        <p>{data.date}</p>
        <p className="capitalize">
          {data.status == "pending" ? "Menunggu Pembayaran" : "Diproses"}
        </p>
      </div>
      {data.data.map((v, i) => (
        <Fragment key={i}>
          <div className="flex items-center justify-between gap-4 rounded-lg p-4">
            <img
              className="w-1/12 overflow-hidden rounded-md border object-cover"
              src={v.image[0]}
            />
            <p className="line-clamp-3 w-7/12 overflow-hidden">{v.title}</p>
            <p className="w-1/12 text-center">{formatIDR(v.price)}</p>
            <p className="w-1/12 text-center">{v.brand.split(" ")[0]}</p>
          </div>
        </Fragment>
      ))}
    </Link>
  );
};

export default Pesanan;

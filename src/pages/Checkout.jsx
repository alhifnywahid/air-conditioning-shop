import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components";
import Select from "../components/Select";
import { Tabs } from "../components/Tabs";
import TextField from "../components/TextField";
import { CartContext } from "../context/CartProvider";
import { delFromCart } from "../service/cartUser";
import { midtrans } from "../service/midtrans.services";
import { getsAddress } from "../service/thecloudalert";
import { orders } from "../service/user.services";
import { formatIDR } from "../utils/Function";

const Checkout = () => {
  const navigate = useNavigate();
  const { user, setUpdateUser, setChange } = useContext(CartContext);
  const { "*": params } = useParams();
  const [products, setProducts] = useState(null);
  // const [payOpt, setPayOpt] = useState("QRIS");
  // const [adrOpt, setAdrOpt] = useState("pay-1");
  const [address, setAddress] = useState({});
  const [totals, setTotals] = useState({
    subTotal: 0,
    admin: 0,
    totals: 0,
  });

  useEffect(() => {
    getsAddress().then((res) => setAddress(res));
  }, []);

  useEffect(() => {
    const uriPro = params.split("/");
    if (user.cart) {
      const filter = user.cart.filter((v) => uriPro.includes(v.productId));
      const subTotal = filter.reduce((acc, vc) => acc + vc.data.price, 0);
      setTotals((prev) => ({ ...prev, subTotal }));
      setProducts(filter);
    }
  }, [params, user, user.cart]);

  const dataTabs = [
    {
      label: "Alamat yang sudah ada",
      content: <PrevAddress />,
    },
    {
      label: "Alamat Baru",
      content: <NextAddress address={address} setAddress={setAddress} />,
    },
  ];

  // const paymentList = [
  //   {
  //     title: "QRIS",
  //     path: "/payment-logo/QRIS.png",
  //     admin: AdminFee(totals.subTotal, 0.78),
  //   },
  //   {
  //     title: "Shopeepay",
  //     path: "/payment-logo/Shopeepay.png",
  //     admin: AdminFee(totals.subTotal, 1.66),
  //   },
  //   {
  //     title: "LinkAja",
  //     path: "/payment-logo/LinkAja.png",
  //     admin: AdminFee(totals.subTotal, 4),
  //   },
  //   {
  //     title: "Dana",
  //     path: "/payment-logo/DANA.png",
  //     admin: AdminFee(totals.subTotal, 3),
  //   },
  //   {
  //     title: "OVO",
  //     path: "/payment-logo/OVO.png",
  //     admin: AdminFee(totals.subTotal, 2),
  //   },
  //   {
  //     title: "Gopay",
  //     path: "/payment-logo/Gopay.png",
  //     admin: AdminFee(totals.subTotal, 2),
  //   },
  // ];

  // const payChange = (e) => {
  //   setPayOpt(e.target.value);
  //   const admin = Number(e.target.dataset.adm);
  //   setTotals((prev) => ({ ...prev, admin }));
  // };

  const createPayment = () => {
    // const paylist = document.querySelectorAll("[data-adm]:checked")[0];
    // if (!paylist) return toast.error("Pilih pembayaran terlebih dahulu.");
    // const uriPro = params.split("/");
    const gotoOrder = async (res) => {
      const data = {
        id: res.order_id,
        status: res.transaction_status,
        date: res.transaction_time,
        data: products.map((v) => ({ ...v.data, id: v.productId })),
      };
      const productsId = products.map((v) => v.productId);
      const refOrder = await orders(user.id, { data });
      if (refOrder.status) {
        const refCart = await delFromCart(user.id, productsId);
        setUpdateUser((prev) => !prev);
        setChange((prev) => !prev);
        navigate("/akun/pesanan", { replace: true });
      }
    };
    const adrChecked = document.querySelectorAll(
      "[name='addresslist']:checked",
    )[0].value;
    const cartFilter = user.alamat.filter((v) => v._id === adrChecked)[0];
    const config = {
      amount: totals.subTotal,
      fn: cartFilter.penerima.split(" ")[0],
      ln: cartFilter.penerima.split(" ")[1],
      email: user.email,
      phone: cartFilter.no_penerima,
    };
    midtrans(config).then((token) => {
      window.snap.pay(token, {
        onSuccess: gotoOrder,
        onPending: gotoOrder,
        onError: () => toast.success("Pembayaran gagal."),
      });
    });
  };

  return (
    <section className="bg-base-200 2xl:py-2">
      <div className="flex min-h-[60vh] flex-col justify-center gap-4 rounded-xl bg-base-100 p-5 2xl:container lg:flex-row">
        <div className="w-full">
          <p className="text-xl font-medium">Detail Pembayaran</p>
          <Tabs tabsData={dataTabs} className="mt-4" />
          {/* <p className="mt-8 text-lg font-medium">Metode Pembayaran</p>
          <form className="mt-3 grid gap-3">
            {paymentList.map((v, i) => (
              <Fragment key={i}>
                <CardList
                  data={v}
                  name="paymentlist"
                  value={v.title}
                  onChange={payChange}
                  data-adm={v.admin}
                />
              </Fragment>
            ))}
          </form> */}
        </div>
        <div className="h-fit w-full rounded-lg bg-gray-50 p-4 shadow">
          <p className="text-xl font-medium">Detail Pesanan</p>
          <div className="mt-3 space-y-3 rounded-lg border px-2 py-4 sm:px-6">
            {products &&
              products.map((v, i) => <ProductList key={i} data={v.data} />)}
          </div>
          <div className="mt-6 border-b border-t py-2">
            <FooterPay title="Total" value={totals.subTotal} />
            {/* <FooterPay title="Admin Pembayaran" value={totals.admin} /> */}
            <FooterPay title="Pengiriman" value={0} />
          </div>
          <FooterPay
            title="Total Keseluruhan"
            value={totals.subTotal + totals.admin}
            v={true}
          />
          <Button onClick={createPayment} className="mt-4 w-full">
            Buat Pesanan
          </Button>
        </div>
      </div>
    </section>
  );
};

const CardList = ({ data, name, ...props }) => {
  return (
    <div className="relative">
      <input
        className="peer hidden"
        id={data.title}
        type="radio"
        name={name}
        {...props}
      />
      <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-blue-500" />
      <label
        className="flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border peer-checked:border-blue-500 peer-checked:bg-gray-50"
        htmlFor={data.title}
      >
        {data.path && <img className="w-14 object-contain" src={data.path} />}
        <div className={data.path && "ml-5"}>
          <span className="mt-2 font-semibold">{data.title}</span>
          {data.admin ? (
            <p className="text-sm leading-6 text-slate-500">
              Biaya admin: {formatIDR(data.admin)}
            </p>
          ) : (
            <p className="text-sm leading-6 text-slate-500">{data.phone}</p>
          )}
          {data.address && (
            <p className="text-sm leading-6 text-slate-500">{data.address}</p>
          )}
        </div>
      </label>
    </div>
  );
};

const ProductList = ({ data }) => {
  return (
    <div className="flex flex-col rounded-lg sm:flex-row">
      <img
        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
        src={data.image[0]}
      />
      <div className="flex w-full flex-col px-4 py-4">
        <span className="line-clamp-1 font-medium">{data.title}</span>
        <span className="float-right text-gray-400">{data.brand}</span>
        <p className="font-medium">{formatIDR(data.price)}</p>
      </div>
    </div>
  );
};

const PrevAddress = () => {
  const { user } = useContext(CartContext);
  const [address, setAddress] = useState([]);
  const [adrOpt, setAdrOpt] = useState();

  useEffect(() => {
    const split = (v) => v.split("-")[1];
    if (user.alamat) {
      const mapping = user.alamat.map((v) => {
        return {
          id: v._id,
          title: `${v.nama_alamat} - ${v.penerima}`,
          phone: v.no_penerima,
          address: [
            split(v.desa),
            split(v.kecamatan),
            split(v.kabupaten),
            split(v.provinsi),
            split(v.kodepos),
            split(v.alamat_detail),
          ].join(", "),
        };
      });
      setAddress(mapping);
      setAdrOpt(mapping[0].id);
    }
  }, [user.alamat]);

  return (
    user?.alamat && (
      <form className="mt-3 grid gap-3">
        {address.map((v) => (
          <Fragment key={v.id}>
            <CardList
              data={v}
              name="addresslist"
              value={v.id}
              checked={adrOpt === v.id}
              onChange={() => setAdrOpt(v.id)}
            />
          </Fragment>
        ))}
      </form>
    )
  );
};

const NextAddress = (props) => {
  const { address, setAddress, cart } = props;
  const addressChange = (e) => {};
  return (
    <div id="change" className="flex flex-col gap-2">
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
          data={address.provinsi}
          onChange={addressChange}
        />
      </Div>
      <Div>
        <Select
          title="Kab/Kota"
          data={address.kabkota}
          onChange={addressChange}
        />
        <Select
          title="Kecamatan"
          data={address.kecamatan}
          onChange={addressChange}
        />
      </Div>
      <Div>
        <Select
          title="Desa/Kelurahan"
          data={address.kelurahan}
          onChange={addressChange}
        />
        <Select
          title="Kode Pos"
          data={address.kodepos}
          onChange={addressChange}
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
          // defaultValue={data.alamat_detail}
        ></textarea>
      </label>
    </div>
  );
};

const Div = ({ children }) => {
  return <div className="grid grid-cols-2 gap-2">{children}</div>;
};

const FooterPay = ({ title, value, v }) => {
  return (
    <div className={`${v && "mt-6"} flex items-center justify-between`}>
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className={`${v && "text-xl"} font-semibold text-gray-900`}>
        {formatIDR(value)}
      </p>
    </div>
  );
};

export default Checkout;

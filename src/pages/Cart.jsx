import { useContext, useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import { CartContext } from "../context/CartProvider";
import { delFromCart } from "../service/cartUser";
import { formatIDR } from "../utils/Function";
function Cart() {
  const { setUpdateUser } = useContext(CartContext);
  const [listCart, setListCart] = useState([]);
  const navigate = useNavigate();

  const handlerBuyNow = () => {
    if (listCart.length <= 0) return toast.error("Silahkah pilih product");
    setUpdateUser((prev) => !prev);
    const uriCart = listCart.join("/");
    navigate(`/checkout/${uriCart}`);
  };

  return (
    <>
      <section className="bg-base-200 2xl:py-2">
        <div className="2xl:container bg-base-100 rounded-xl p-5 flex flex-col justify-center lg:flex-row gap-4 min-h-[60vh]">
          <div className="flex flex-col gap-4 basis-3/4 p-6 shadow-custom-1 rounded-xl">
            <h2 className="text-xl font-bold w-fit md:text-3xl">Keranjang</h2>
            <div className="overflow-x-auto w-full">
              <TableProduct setListCart={setListCart} listCart={listCart} />
            </div>
          </div>
          <div className="flex flex-col gap-4 basis-2/4 p-6 sticky top-20 shadow-custom-1 rounded-xl h-fit">
            <h2 className="text-xl font-bold w-fit md:text-3xl">Checkout</h2>
            <TablePayment listCart={listCart} />
            <Button onClick={handlerBuyNow}>Beli Sekarang</Button>
          </div>
        </div>
      </section>
    </>
  );
}

const TablePayment = (props) => {
  const { listCart } = props;
  const { cart } = useContext(CartContext);
  const [listPay, setListPay] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cart) {
      const payFilter = cart.filter((product) => {
        return listCart.some((item) => item === product.productId);
      });
      const sumTotal = payFilter.reduce((acc, vc) => acc + vc.data.price, 0);
      setTotal(sumTotal);
      setListPay(payFilter);
    }
  }, [listCart, cart]);

  return (
    <table className="table">
      <tbody>
        {listPay.length != 0 &&
          listPay.map((product, i) => (
            <tr key={i}>
              <td>
                <span className="line-clamp-1">
                  {formatIDR(product.data.title)}
                </span>
              </td>
              <td className="text-right">{formatIDR(product.data.price)}</td>
            </tr>
          ))}
        <tr className="">
          <th>Total</th>
          <th className="text-right">{formatIDR(total)}</th>
        </tr>
      </tbody>
    </table>
  );
};
const TableProduct = (props) => {
  const navigate = useNavigate();
  const { setListCart, listCart } = props;
  const { setChange, cart } = useContext(CartContext);

  const handlerInput = (e) => {
    if (e.target.checked) {
      const thereIs = listCart.some((item) => item === e.target.value);
      if (!thereIs) {
        setListCart((prev) => [...prev, e.target.value]);
      }
    } else {
      const cartFilter = listCart.filter((id) => {
        return id != e.target.value;
      });
      setListCart(cartFilter);
    }
  };

  const handlerDelete = async (e) => {
    const token = localStorage.getItem("token");
    const deleteProduct = await delFromCart(token, e.target.value);
    if (deleteProduct.status) return setChange((p) => !p);
  };

  return cart && cart.length != 0 ? (
    <table className="table">
      <thead>
        <tr>
          <th className="text-center"></th>
          <th>Produk</th>
          <th className="text-center">Harga</th>
          <th className="text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((product, i) => (
          <tr key={i}>
            <th className="text-center">
              <label>
                <input
                  type="checkbox"
                  className="cx checkbox"
                  value={product.productId}
                  onChange={handlerInput}
                />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar shadow relative">
                  <div className="mask mask-squircle w-16 h-16 md:h-28 md:w-28">
                    <img src={product.data.image[0]} />
                  </div>
                </div>
                <div>
                  <div className="font-bold line-clamp-2">
                    {product.data.title}
                  </div>
                  <div className="text-sm opacity-50">- 2 PK</div>
                  <div className="text-sm opacity-50">
                    - {product.data.brand}
                  </div>
                </div>
              </div>
            </td>
            <td className="text-center">{formatIDR(product.data.price)}</td>
            <th>
              <div className="flex gap-2 justify-center items-center">
                <Button
                  className="btn-square disabled:bg-gray-500 disabled:color-black"
                  onClick={handlerDelete}
                  value={product.productId}
                >
                  <MdDeleteForever className="pointer-events-none" size={20} />
                </Button>
                <Button
                  className="btn-square"
                  value={product.productId}
                  onClick={(e) => {
                    navigate(`/product/${e.target.value}`);
                  }}
                >
                  <IoEye size={20} />
                </Button>
              </div>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="h-64 lg:h-96 w-full flex justify-center items-center">
      <p>Keranjang Kosong...</p>
    </div>
  );
};

export default Cart;

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
        <div className="flex min-h-[60vh] flex-col justify-center gap-4 rounded-xl bg-base-100 p-5 2xl:container lg:flex-row">
          <div className="flex basis-3/4 flex-col gap-4 rounded-xl p-6 shadow-custom-1">
            <h2 className="w-fit text-xl font-bold md:text-3xl">Keranjang</h2>
            <div className="w-full overflow-x-auto">
              <TableProduct setListCart={setListCart} listCart={listCart} />
            </div>
          </div>
          <div className="sticky top-20 flex h-fit basis-2/4 flex-col gap-4 rounded-xl p-6 shadow-custom-1">
            <h2 className="w-fit text-xl font-bold md:text-3xl">Checkout</h2>
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
                <div className="avatar relative shadow">
                  <div className="mask mask-squircle h-16 w-16 md:h-28 md:w-28">
                    <img src={product.data.image[0]} />
                  </div>
                </div>
                <div>
                  <div className="line-clamp-2 font-bold">
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
              <div className="flex items-center justify-center gap-2">
                <Button
                  className="disabled:color-black btn-square disabled:bg-gray-500"
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
    <div className="flex h-64 w-full items-center justify-center lg:h-96">
      <p>Keranjang Kosong...</p>
    </div>
  );
};

export default Cart;

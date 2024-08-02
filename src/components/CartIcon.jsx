import { useContext, useState } from "react";
import { BsCartX, BsMinecartLoaded } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartProvider";
import { formatIDR } from "../utils/Function";
import LinkButton from "./LinkButton";

const CartIcon = () => {
  const { cart } = useContext(CartContext);
  const [onHover, setOnHover] = useState(false);

  return (
    <>
      <Link
        to="/keranjang"
        className="btn btn-ghost indicator flex h-fit flex-col gap-1 md:hidden"
      >
        <span className="badge indicator-item badge-primary left-11 top-2 rounded-full p-1">
          {cart ? cart.length : 0}
        </span>
        <BsMinecartLoaded size="25" />
        Keranjang
      </Link>
      <Link
        to="/keranjang"
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        className="group btn dropdown dropdown-end dropdown-bottom dropdown-hover btn-ghost indicator hidden justify-center gap-1 md:inline-flex"
      >
        <span className="badge indicator-item badge-primary left-5 top-3 rounded-full p-1">
          {cart ? cart.length : 0}
        </span>
        <BsMinecartLoaded size="25" />
        <span className="absolute -bottom-10 hidden h-full w-full group-hover:block"></span>
      </Link>
      <div
        className={`z-1 menu dropdown-content absolute right-0 top-11 mt-5 w-80 gap-2 rounded-box bg-base-100 p-2 shadow ${
          onHover ? "flex" : "hidden"
        }`}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        {cart && cart.length != 0 ? (
          <>
            <div className="flex max-h-60 flex-col gap-2 overflow-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {cart.map((item, i) => (
                <CartCard
                  key={i}
                  to={`/product/${item.productId}`}
                  onClick={() => setOnHover(false)}
                  product={item.data}
                />
              ))}
            </div>
            <LinkButton href="/keranjang">Lihat Semua</LinkButton>
          </>
        ) : (
          <div className="btn btn-ghost">
            <BsCartX size={25} />
            Keranjang Kosong
          </div>
        )}
      </div>
    </>
  );
};

function CartCard({ to, product, ...props }) {
  return (
    <Link
      {...props}
      to={to}
      className="flex h-20 gap-2 rounded-lg border p-1 hover:border-blue-400 hover:bg-base-200"
    >
      <img className="aspect-square h-full rounded" src={product.image[0]} />
      <div className="flex w-fit flex-col justify-between overflow-hidden p-2">
        <h2 className="line-clamp-1 text-ellipsis text-base">
          {product.title}
        </h2>
        <h2 className="text-base">{formatIDR(product.price)}</h2>
      </div>
    </Link>
  );
}

export default CartIcon;

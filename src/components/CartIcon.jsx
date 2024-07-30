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
        className="btn btn-ghost indicator flex md:hidden h-fit gap-1 flex-col"
      >
        <span className="indicator-item badge badge-primary rounded-full left-11 p-1 top-2">
          {cart ? cart.length : 0}
        </span>
        <BsMinecartLoaded size="25" />
        Keranjang
      </Link>
      <Link
        to="/keranjang"
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        className="group btn btn-ghost justify-center dropdown dropdown-bottom dropdown-end dropdown-hover indicator gap-1 hidden md:inline-flex"
      >
        <span className="indicator-item p-1 badge badge-primary rounded-full left-5 top-3">
          {cart ? cart.length : 0}
        </span>
        <BsMinecartLoaded size="25" />
        <span className="hidden group-hover:block w-full h-full absolute -bottom-10"></span>
      </Link>
      <div
        className={`mt-5 absolute dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-80 gap-2 top-11 right-0 ${
          onHover ? "flex" : "hidden"
        }`}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        {cart && cart.length != 0 ? (
          <>
            <div className="flex flex-col gap-2 max-h-60 overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
      className="border hover:bg-base-200 hover:border-blue-400 rounded-lg h-20 flex p-1 gap-2"
    >
      <img className="rounded aspect-square h-full" src={product.image[0]} />
      <div className="overflow-hidden flex flex-col justify-between p-2 w-fit">
        <h2 className="line-clamp-1 text-ellipsis text-base">
          {product.title}
        </h2>
        <h2 className="text-base">{formatIDR(product.price)}</h2>
      </div>
    </Link>
  );
}

export default CartIcon;

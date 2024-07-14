import { BsMinecartLoaded } from "react-icons/bs";
import Button from "./Button";

const CartIcon = () => {
  return (
    <a
      className="group btn btn-ghost flex justify-center dropdown dropdown-bottom dropdown-end dropdown-hover indicator"
      href="#"
    >
      <span className="indicator-item badge badge-primary rounded-full left-4 top-2">
        2
      </span>
      <BsMinecartLoaded size="25" />
      <span className="hidden group-hover:block w-full h-full absolute -bottom-10"></span>
      <ul className="mt-5 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80 gap-3">
        <li>
          <CartCard />
        </li>
        <li>
          <CartCard />
        </li>
        <li>
          <CartCard />
        </li>
        <li>
          <Button>Lihat Semua</Button>
        </li>
      </ul>
    </a>
  );
};

function CartCard() {
  return (
    <div href="#" className="p-0 shadow">
      <div className="flex shadow p-2">
        <figure className="w-24">
          <img
            className="rounded h-full"
            src="https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//catalog-image/94/MTA-112159381/sharp_sharp_ah-a5zcy_ac_split_0-5_pk_standard_turbo_cool_new_1-2_pk_-unit_only-_full01_umlusqb4.jpg"
          />
        </figure>
        <div className="overflow-hidden flex flex-col justify-between p-2 w-fit">
          <h2 className="line-clamp-1 text-ellipsis text-base">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quo,
            quia possimus veritatis tenetur neque.
          </h2>
          <h2 className="text-base">Rp. 100.000.00</h2>
        </div>
      </div>
    </div>
  );
}

export default CartIcon;

import React, { useContext, useEffect, useState } from "react";
import { BsCartPlusFill } from "react-icons/bs";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaRegCheckCircle,
  FaWhatsappSquare,
} from "react-icons/fa";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, CardProduct, SkeletonProducts } from "../components";
import Spinner from "../components/Spinner";
import { CartContext } from "../context/CartProvider";
import { addToCart } from "../service/cartUser";
import { product } from "../service/product.services";
import { searchProducts } from "../service/searchproducts.services";
import { formatIDR } from "../utils/Function";
function DetailProduct() {
  const { productId } = useParams();
  const [products, setProducts] = useState(null);
  const [imgActive, setImgActive] = useState("");
  const [images, setImages] = useState([]);
  const [productsRecommend, setProductsRecommend] = useState([]);

  const resetState = () => {
    setProducts(null);
    setImgActive("");
    setImages([]);
    setProductsRecommend([]);
  };

  const getProductsRecommend = async (product) => {
    const response = await searchProducts(product.brand.split(" ")[0]);
    setProductsRecommend(response.products);
  };

  useEffect(() => {
    resetState();
    product(productId).then((product) => {
      setProducts(product);
      setImages(product.image);
      setImgActive(product.image[0]);
      getProductsRecommend(product);
    });
  }, [productId]);

  return (
    <>
      <section className="bg-base-200 2xl:py-2">
        <div className="flex flex-col-reverse items-center justify-center rounded-xl bg-base-100 p-5 2xl:container lg:flex-row">
          <div className="w-full flex-1 gap-4 lg:flex xl:gap-8 xl:px-6">
            <div className="flex flex-1 flex-col gap-3 md:flex-row lg:flex-col">
              <ImagePriview
                imgActive={imgActive}
                productsRec={productsRecommend}
              />
              <ListImages
                images={images}
                setImgActive={setImgActive}
                imgActive={imgActive}
                productsRec={productsRecommend}
              />
              <ShareProduct
                className="md:hidden lg:flex"
                productsRec={productsRecommend}
              />
            </div>
            <div className="flex-1">
              <ShareProduct
                className="hidden md:flex lg:hidden"
                productsRec={productsRecommend}
              />
              <span className="divider lg:hidden"></span>
              <div>
                <TitlePrduct
                  product={products}
                  productsRec={productsRecommend}
                />
                <div className="w-full overflow-x-auto">
                  <TableDescription
                    products={products}
                    productsRec={productsRecommend}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductsRecommend productsRec={productsRecommend} />
    </>
  );
}

const ShareProduct = ({ className, productsRec }) => {
  return (
    productsRec.length != 0 && (
      <div className={`my-4 flex gap-2 xl:my-0 ${className}`}>
        <span>Bagikan ke : </span>
        <Link to="#">
          <FaFacebookSquare
            size={25}
            className="rounded fill-blue-400 outline-2 outline-gray-400 hover:outline"
          />
        </Link>
        <Link to="#">
          <FaWhatsappSquare
            size={25}
            className="rounded fill-green-400 outline-2 outline-gray-400 hover:outline"
          />
        </Link>
        <Link to="#">
          <FaInstagramSquare
            size={25}
            className="rounded fill-red-500 outline-2 outline-gray-400 hover:outline"
          />
        </Link>
      </div>
    )
  );
};

const ImagePriview = ({ imgActive, productsRec }) => {
  return productsRec.length != 0 ? (
    <div className="w-full rounded-xl border">
      <img
        src={imgActive}
        loading="lazy"
        alt="image priview"
        className="mx-auto aspect-square w-full rounded-lg object-contain xl:w-[70%]"
      />
    </div>
  ) : (
    <div className="skeleton mx-auto aspect-[4/3] w-full rounded-lg"></div>
  );
};
const ListImages = (props) => {
  const { images, imgActive, setImgActive, productsRec } = props;
  return (
    <div className="flex gap-2 overflow-x-scroll md:flex-col md:overflow-auto lg:flex-row lg:overflow-x-scroll">
      {productsRec.length != 0
        ? images.map((img, i) => (
            <img
              key={i}
              src={img}
              className={`my-4 aspect-square w-24 cursor-pointer rounded-md border-2 object-contain hover:border-blue-400 md:my-0 lg:my-4 ${
                img == imgActive && "border-blue-400"
              }`}
              onClick={(e) => setImgActive(e.target.src)}
            />
          ))
        : [...Array(6)].map((_, i) => (
            <div key={i} className="skeleton aspect-square w-24 rounded"></div>
          ))}
    </div>
  );
};

const TableDescription = ({ productsRec, products }) => {
  return productsRec.length != 0 ? (
    <table className="table w-full">
      <tbody>
        {Object.entries(products.specification).map(
          (desc, i) =>
            i != 9 && (
              <tr key={i} className="w-fit">
                <th className="w-fit capitalize lg:text-nowrap lg:p-0">
                  {desc[0].replaceAll("_", " ")}
                </th>
                <td>:</td>
                <td className="w-full">{desc[1]}</td>
              </tr>
            ),
        )}
      </tbody>
    </table>
  ) : (
    <div className="mt-8">
      {[...Array(7)].map((_, i) => (
        <div key={i} className="flex gap-4 p-2 ps-0">
          <span className="skeleton block h-6 w-60 rounded"></span>
          <span className="skeleton block h-6 w-60 rounded"></span>
        </div>
      ))}
    </div>
  );
};

const ProductsRecommend = ({ productsRec }) => {
  return (
    <section className="bg-base-200 pb-2">
      <div className="flex flex-col rounded-xl bg-base-100 2xl:container">
        {productsRec.length != 0 ? (
          <h2 className="px-5 pt-5 text-2xl font-bold">Produk Serupa</h2>
        ) : (
          <span className="skeleton mx-5 block h-6 w-60 rounded"></span>
        )}
        <div className="relative grid grid-cols-2 gap-3 rounded-xl bg-base-100 p-5 2xl:container sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {productsRec.length != 0
            ? productsRec.map((product, i) => (
                <CardProduct key={i} item={product} />
              ))
            : [...Array(12)].map((_, i) => <SkeletonProducts key={i} />)}
        </div>
      </div>
    </section>
  );
};
const TitlePrduct = (props) => {
  const navigate = useNavigate();
  const icon = [
    <BsCartPlusFill key={0} size={20} />,
    <FaRegCheckCircle key={0} size={20} />,
  ];
  const { product, productsRec } = props;
  const { productId } = useParams();
  const { cart, setChange, load, setLoad, setUpdateUser } =
    useContext(CartContext);
  const [inner, setInner] = useState(icon[0]);

  const buttonValidation = () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  };
  const handlreToCart = () => {
    if (!buttonValidation()) return navigate("/masuk");
    const isTrue = cart.some((i) => i.productId == productId);
    if (isTrue) return toast.warning("Produk sudah ada di keranjang");
    setLoad(true);
    addToCart(localStorage.getItem("token"), productId).then(() => {
      setChange((prev) => !prev);
      setInner(icon[1]);
      setTimeout(() => setInner(icon[0]), 1000);
    });
  };
  const handlerBuy = () => {
    if (!buttonValidation()) return navigate("/masuk");
    addToCart(localStorage.getItem("token"), productId).then(() => {
      setChange((prev) => !prev);
      setUpdateUser((prev) => !prev);
    });
    navigate(`/checkout/${productId}`);
  };

  return (
    <div className="flex flex-col gap-2">
      {productsRec.length != 0 ? (
        <>
          <h1 className="text-xl font-bold">{product.title}</h1>
          <p className="text-lg font-bold">{formatIDR(product.price)}</p>
          <div className="my-4 flex gap-2">
            <Button
              className="flex-1 md:w-60 md:flex-initial"
              onClick={handlerBuy}
            >
              Beli Sekarang
            </Button>
            <Button
              disabled={!load}
              className="flex-1 md:w-60 md:flex-initial"
              onClick={handlreToCart}
            >
              {!load ? <Spinner size="md" /> : inner}
            </Button>
          </div>
        </>
      ) : (
        <>
          <span className="skeleton h-8 w-full rounded"></span>
          <span className="skeleton h-8 w-60 rounded"></span>
          <div className="flex gap-4">
            <span className="skeleton h-12 w-36 rounded"></span>
            <span className="skeleton h-12 w-36 rounded"></span>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailProduct;

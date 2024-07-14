import React, { useEffect, useState } from "react";
import { BsCartPlusFill } from "react-icons/bs";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useParams } from "react-router-dom";
import { Button, CardProduct, SkeletonProducts } from "../components";
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
    const response = await searchProducts(product.brand);
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
        <div className="2xl:container bg-base-100 rounded-xl p-5 flex flex-col-reverse justify-center items-center lg:flex-row">
          <div className="w-full lg:flex gap-4 flex-1 xl:px-6 xl:gap-8">
            <div className="flex flex-col md:flex-row gap-3 lg:flex-col flex-1">
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
                <div className="overflow-x-auto w-full">
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
      <div className={`flex gap-2 my-4 xl:my-0 ${className}`}>
        <span>Bagikan ke : </span>
        <Link to="#">
          <FaFacebookSquare
            size={25}
            className="fill-blue-400 hover:outline rounded outline-gray-400 outline-2"
          />
        </Link>
        <Link to="#">
          <FaWhatsappSquare
            size={25}
            className="fill-green-400 hover:outline rounded outline-gray-400 outline-2"
          />
        </Link>
        <Link to="#">
          <FaInstagramSquare
            size={25}
            className="fill-red-500 hover:outline rounded outline-gray-400 outline-2"
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
        className="w-full aspect-square object-contain rounded-lg xl:w-[70%] mx-auto"
      />
    </div>
  ) : (
    <div className="skeleton w-full aspect-[4/3] rounded-lg mx-auto"></div>
  );
};
const ListImages = ({ images, imgActive, setImgActive, productsRec }) => {
  return (
    <div className="flex gap-2 overflow-x-scroll md:flex-col md:overflow-auto lg:flex-row lg:overflow-x-scroll">
      {productsRec.length != 0
        ? images.map((img, i) => (
            <img
              key={i}
              src={img}
              className={`border-2 w-24 aspect-square object-contain hover:border-blue-400 cursor-pointer rounded-md my-4 md:my-0 lg:my-4 ${
                img == imgActive && "border-blue-400"
              }`}
              onClick={(e) => setImgActive(e.target.src)}
            />
          ))
        : [...Array(6)].map((_, i) => (
            <div key={i} className="skeleton rounded w-24 aspect-square"></div>
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
                <th className="capitalize lg:p-0 w-fit lg:text-nowrap">
                  {desc[0].replaceAll("_", " ")}
                </th>
                <td>:</td>
                <td className="w-full">{desc[1]}</td>
              </tr>
            )
        )}
      </tbody>
    </table>
  ) : (
    <div className="mt-8">
      {[...Array(7)].map((_, i) => (
        <div key={i} className="flex gap-4 p-2 ps-0">
          <span className="skeleton block w-60 h-6 rounded"></span>
          <span className="skeleton block w-60 h-6 rounded"></span>
        </div>
      ))}
    </div>
  );
};

const ProductsRecommend = ({ productsRec }) => {
  return (
    <section className="bg-base-200 pb-2">
      <div className="2xl:container bg-base-100 rounded-xl flex flex-col">
        {productsRec.length != 0 ? (
          <h2 className="text-2xl font-bold pt-5 px-5">Produk Serupa</h2>
        ) : (
          <span className="block skeleton rounded w-60 h-6 mx-5"></span>
        )}
        <div className="2xl:container bg-base-100 rounded-xl p-5 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 relative">
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
const TitlePrduct = ({ product, productsRec }) => {
  return (
    <div className="flex flex-col gap-2">
      {productsRec.length != 0 ? (
        <>
          <h1 className="text-xl font-bold">{product.title}</h1>
          <p className="text-lg font-bold">{formatIDR(product.price)}</p>
          <div className="flex gap-2 my-4">
            <Button className="flex-1 md:flex-initial md:w-60">
              Beli Sekarang
            </Button>
            <Button className="flex-1 md:flex-initial md:w-60">
              <BsCartPlusFill size={20} />
            </Button>
          </div>
        </>
      ) : (
        <>
          <span className="skeleton w-full h-8 rounded"></span>
          <span className="skeleton w-60 h-8 rounded"></span>
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

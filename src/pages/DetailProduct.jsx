import React, { useEffect, useState } from "react";
import { BsCartPlusFill } from "react-icons/bs";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components";
import ListProducts from "../components/ListProducts";
import { product } from "../service/product.services";
import { formatIDR } from "../utils/Function";
import { SearchProvider } from "../context/SearchContext";
function DetailProduct() {
  const { productId } = useParams();
  const [products, setProducts] = useState(null);
  const [imgActive, setImgActive] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    product(productId).then((product) => {
      setTimeout(() => {
        setProducts(product);
      }, 3000);
      setImages(product.image);
      setImgActive(product.image[0]);
    });
  }, [productId]);

  return (
    <>
      <section className="bg-base-200 2xl:py-2">
        <div className="2xl:container bg-base-100 rounded-xl p-5 flex flex-col-reverse justify-center items-center lg:flex-row">
          <div className="w-full">
            {products ? (
              <img
                src={imgActive}
                loading="lazy"
                alt="image priview"
                className="border-2 w-full aspect-square object-contain rounded-lg"
              />
            ) : (
              <div className="skeleton w-full aspect-square"></div>
            )}
            <div className="flex gap-1 overflow-x-scroll">
              {products
                ? images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className={`border-2 w-24 aspect-square object-contain my-4 hover:border-blue-400 cursor-pointer rounded-md ${
                        img == imgActive && "border-blue-400"
                      }`}
                      onClick={(e) => setImgActive(e.target.src)}
                    />
                  ))
                : [...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="h-24 w-24 aspect-square my-4 skeleton rounded-md"
                    ></div>
                  ))}
            </div>
            {products ? <ShareProduct /> : <Skeleton />}
            <span className="divider"></span>
            <div>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">{products?.title}</h1>
                <p className="text-lg font-bold">
                  {products && formatIDR(products?.price)}
                </p>
                <div className="flex gap-2 my-4">
                  <Button className="flex-1">Beli Sekarang</Button>
                  <Button className="flex-1">
                    <BsCartPlusFill size={20} />
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="table w-full">
                  <tbody>
                    {products != null
                      ? Object.entries(products.specification).map(
                          (key, value) =>
                            value != 9 && (
                              <tr key={value}>
                                <th className="capitalize">
                                  {key[0].replaceAll("_", " ")}
                                </th>
                                <td>:</td>
                                <td>{key[1]}</td>
                              </tr>
                            )
                        )
                      : [...Array(9)].map((_, i) => (
                          <tr key={i}>
                            <th>
                              <Skeleton height={10} />
                            </th>
                            <td>
                              <Skeleton height={10} />
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-base-200">
        <div className="2xl:container bg-base-100 rounded-xl flex flex-col">
          <h2 className="text-2xl font-bold pt-5 px-5">Produk Serupa</h2>
          <SearchProvider>
            <ListProducts productClick={() => {}} />
          </SearchProvider>
        </div>
      </section>
    </>
  );
}

const ShareProduct = () => {
  return (
    <div className="flex gap-2 my-4">
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
  );
};

const ImagePriview = () => {
  return;
};

const ListImages = () => {
  return;
};

const s = () => {
  return;
};

export default DetailProduct;

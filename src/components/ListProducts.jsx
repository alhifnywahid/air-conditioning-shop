import React, { useContext, useEffect, useState } from "react";
import { BiFileFind } from "react-icons/bi";
import { SearchContext } from "../context/SearchProvider";
import { products } from "../service/products.services";
import { searchProducts } from "../service/searchproducts.services";
import CardProduct from "./CardProduct";
import Pagination from "./Pagination";
import SkeletonProducts from "./SkeletonProducts";

function ListProducts({ productClick }) {
  const [listProducts, setListProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState({});
  const { searchQuery } = useContext(SearchContext);

  const loadProducts = (page) => {
    setListProducts([]);
    if (searchQuery) {
      searchProducts(searchQuery, page, 12).then((item) => {
        if (!item.products) {
          setListProducts(null);
        } else {
          setListProducts(item.products);
          setPages(item);
        }
      });
    } else {
      products(page, 12).then((item) => {
        setListProducts(item.products);
        setPages(item);
      });
    }
  };

  useEffect(() => {
    loadProducts(activePage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, searchQuery]);

  return (
    <section className="bg-base-200 pb-2">
      <div
        className={`relative grid grid-cols-2 gap-3 rounded-xl bg-base-100 p-5 2xl:container sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ${
          listProducts === null || (listProducts.length === 0 && "p-20")
        }`}
      >
        {listProducts === null && (
          <div className="col-span-full flex w-full flex-col items-center justify-center p-10">
            <BiFileFind size={150} />
            <h2 className="text-xl font-bold">Produk tidak di temukan!</h2>
          </div>
        )}

        {listProducts !== null &&
          listProducts.length === 0 &&
          [...Array(12)].map((_, i) => <SkeletonProducts key={i} />)}

        {listProducts !== null &&
          listProducts.length > 0 &&
          listProducts.map((item, index) => (
            <CardProduct key={index} item={item} productClick={productClick} />
          ))}
        <div
          className={`col-span-full mt-5 flex w-full flex-col items-center justify-center ${
            listProducts === null && "hidden"
          }`}
        >
          <Pagination
            pages={pages}
            onPageChange={(page) => setActivePage(page.selected + 1)}
          />
        </div>
      </div>
    </section>
  );
}

export default ListProducts;

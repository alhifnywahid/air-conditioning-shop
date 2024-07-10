import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatIDR } from "../utils/Function";
import Skeleton from "react-loading-skeleton";

function DetailProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch(
      `https://gist.githubusercontent.com/alhifnywahid/0d58fcea7f29b0a7dbb7526156189803/raw/57916552249b834c1b35804473f06fdee33615a8/blibli.json`
    )
      .then((res) => res.json())
      .then((data) => {
        const filter = data.filter((item) => item.id === productId);
        setProduct(filter);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <section className="bg-base-200 py-2">
        <div className="lg:container bg-base-100 rounded-xl p-5  flex gap-2">
          <div className="overflow-x-auto my-10 lg:container">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>Gambar</th>
                  <th>Nama Produk</th>
                  <th>Harga</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {product.map((product, index) => (
                  <tr key={index}>
                    <th>
                      {<img className="w-24 rounded-xl shadow" src={product.image[0]}/> || <Skeleton />}
                    </th>
                    <td>{product.title || <Skeleton />}</td>
                    <td>{formatIDR(product.price) || <Skeleton />}</td>
                    <td>
                      <Link
                        className="btn btn-primary"
                        to={`/product/${product.id}`}
                      >
                        Lihat
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailProduct;

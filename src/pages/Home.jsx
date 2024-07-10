import SearchProduct from "../components/SearchProduct";
import SkeletonProducts from "../components/SkeletonProducts";
import CardProduct from "../components/CardProduct";
import Pagination from "../components/Pagination";
import Button from "../components/Button";
import { products } from "../service/products.services";
import { product } from "../service/product.services";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgArrowsExchange } from "react-icons/cg";
import { LuFilter } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { CiSquarePlus } from "react-icons/ci";
import { formatIDR } from "../utils/Function";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "rc-pagination/assets/index.css";
import { SearchContext, SearchProvider } from "../context/SearchContext";
import { searchProducts } from "../service/searchproducts.services";
import { BiFileFind } from "react-icons/bi";

function Home() {
  const imageIndexes = Array.from({ length: 10 }, (_, index) => index + 1);
  const [comparation, setComparation] = useState(false);
  const [listComparation, setListComparation] = useState([
    {
      id: "",
      src: "",
    },
    {
      id: "",
      src: "",
    },
    {
      id: "",
      src: "",
    },
  ]);

  const productClick = (e) => {
    if (!comparation) return false
    e.preventDefault();
    const id = e.target.getAttribute("data-id");
    const src = e.target.getAttribute("data-src");
    if (listComparation.some((item) => item.id === id))
      return toast.error("Produk sudah ada.");
    const emptyIndex = listComparation.findIndex((item) => item.id === "");
    if (emptyIndex !== -1) {
      const newList = [...listComparation];
      newList[emptyIndex] = { id, src };
      setListComparation(newList);
      toast.success("Produk berhasil di tambahkan.");
    } else {
      toast.error("Produk maksimal 3.");
    }
  };

  return (
    <SearchProvider>
      <section className="bg-base-200 2xl:py-2">
        <div className="hero w-full 2xl:container">
          <div className="hero-content flex-col justify-between items-center lg:flex-row-reverse min-w-full relative 2xl:rounded-xl overflow-hidden p-0">
            <img src="/2.avif" className="w-full hidden lg:block" />
            <img src="/mobile.avif" className="w-full lg:hidden" />
            <div className="absolute grid grid-cols-1 lg:grid-cols-2 m-5">
              <div className="lg:pl-10 lg:pr-36">
                <p className="py-6 w-[80%] mx-auto text-center lg:w-full lg:text-left font-bold text-2xl md:text-3xl text-white sm:mt-32 md:mt-24 sm:mb-4 lg:m-0">
                  Menyediakan berbagai layanan berkualitas tinggi terkait dengan
                  sistem pendingin udara (AC) Anda.
                </p>
                <div className="flex gap-3 w-fit mx-auto lg:w-full">
                  <Link
                    to="/layanan"
                    className="btn bg-blue-500 btn-sm md:btn-md hover:bg-blue-600 text-white border-none rounded md:rounded-md md:text-lg"
                  >
                    Layanan
                  </Link>
                  <Link
                    to="/kontak"
                    className="btn bg-blue-500 btn-sm md:btn-md hover:bg-blue-600 text-white border-none rounded md:rounded-md md:text-lg"
                  >
                    Hubungi Kami
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="hero-content flex-col justify-between items-center lg:flex-row-reverse min-w-full">
            <div className="flex-1">
              <img src="/banner-home.png" />
            </div>
            <div className="flex-1">
              <h1 className="lg:text-5xl text-3xl font-bold mx-auto w-fit lg:w-full">
                Berkah Teknik
              </h1>
              <p className="py-6 text-xl w-[80%] mx-auto text-center lg:w-full lg:text-left">
                Menyediakan berbagai layanan berkualitas tinggi terkait dengan
                sistem pendingin udara (AC) Anda.
              </p>
              <div className="flex gap-3 w-fit mx-auto lg:w-full">
                <Link
                  to="/layanan"
                  className="btn bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Layanan
                </Link>
                <Link
                  to="/kontak"
                  className="btn bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      <section className="bg-base-200 ">
        <div className="2xl:container bg-base-100 rounded-xl p-10 flex flex-col gap-6">
          <h1 className="text-center text-xl md:text-2xl font-bold text-slate-800">
            Temukan berbagai macam Air Conditioner dengan merk terbaik hanya di
            sini!
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-5 w-fit gap-2 mx-auto">
            {imageIndexes.map((index) => (
              <img
                key={index}
                className="rounded-md shadow border w-44"
                src={`/brand/${index}.png`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base-200 2xl:py-2">
        <div className="2xl:container bg-base-100 rounded-xl p-5 grid grid-cols-2 gap-2 md:flex">
          <FilterProduct />
          <ComparisonProduct
            setShowModal={setComparation}
            showModal={comparation}
            listItem={listComparation}
            setListItem={setListComparation}
          />
          <SearchProduct />
        </div>
      </section>

      <ListProducts productClick={productClick} />
    </SearchProvider>
  );
}
``
const ComparisonProduct = (props) => {
  const { showModal, setShowModal, listItem, setListItem } = props;

  const [loader, setLoader] = useState(false);
  const [dataComparation, setDataComparation] = useState([]);

  const handlerStartComparation = async () => {
    console.log(listItem);
    const filledItems = listItem.filter((item) => item.id !== "");
    if (filledItems.length < 2) {
      toast.error("Item minimal 2 dan maksimal 3.");
    } else {
      setShowModal(!showModal);
      document.getElementById("start-comparation").showModal();
      setLoader(true);
      const newData = [];
      for (let i = 0; i < filledItems.length; i++) {
        const data = await product(filledItems[i].id);
        newData.push(data);
      }
      setDataComparation(newData);
      setLoader(false);
    }
  };

  const handlerDeItem = async (index) => {
    const newList = [...listItem];
    newList[index] = { id: "", src: "" };
    setListItem(newList);
  };

  return (
    <>
      <Button
        className="shadow-blue-300"
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        <CgArrowsExchange size={25} />
        Bandingkan
      </Button>
      <div
        className={`${
          showModal ? "flex" : "hidden"
        } fixed w-full bottom-0 right-0 sm:w-auto sm:bottom-4 sm:right-4 z-20 bg-base-100 p-4 sm:rounded-xl shadow border-2 flex-col gap-3`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Bandingkan Produk</h1>
          <Button
            className="btn-circle btn-sm bg-red-500 hover:bg-red-700"
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            <IoClose className="text-2xl" color="white" />
          </Button>
        </div>
        <span>Pilih maksimum 3 produk untuk di bandingkan</span>
        <div className="flex justify-between items-center">
          <ItemComparation
            handlerDeItem={() => handlerDeItem(0)}
            listItem={listItem[0].src}
          />
          <span className="font-bold mx-4">+</span>
          <ItemComparation
            handlerDeItem={() => handlerDeItem(1)}
            listItem={listItem[1].src}
          />
          <span className="font-bold mx-4">+</span>
          <ItemComparation
            handlerDeItem={() => handlerDeItem(2)}
            listItem={listItem[2].src}
          />
        </div>
        <Button onClick={handlerStartComparation}>Bandingkan</Button>
      </div>

      <dialog id="start-comparation" className="modal backdrop-blur-sm">
        {loader && (
          <div className="flex justify-center items-center min-h-full min-w-full">
            <span className="loading loading-spinner w-20"></span>
          </div>
        )}

        {!loader && (
          <div className="modal-box min-h-screen min-w-full rounded-none lg:min-w-fit lg:min-h-[85%] lg:rounded-md">
            <div className="overflow-x-auto p-2">
              <table className="table lg:w-fit">
                <thead>
                  <tr>
                    <th className="aspect-square w-48"></th>
                    {dataComparation.map((item, index) => (
                      <th
                        key={index}
                        className="aspect-square w-40 h-w-40 lg:w-60"
                      >
                        <img src={item.image[0]} className="shadow border-2" />
                      </th>
                    ))}
                  </tr>
                </thead>
                <Tbody data={dataComparation} />
              </table>
            </div>
            <div className="modal-action sticky bottom-0">
              <form method="dialog">
                <Button>Keluar</Button>
              </form>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
};

const Tbody = ({ data }) => {
  const listTitle = [
    "Produk",
    "Harga",
    "Brand",
    "Besaran PK",
    "Teknologi AC",
    "Konsumsi Daya",
    "Dimensi Produk",
    "Berat",
    "Kelengkapan Paket",
    "Lain-Lain",
    "Nomor Sertifikat SNI",
    "Nomor Pendaftaran Barang",
  ];

  return (
    <tbody>
      {listTitle.map((item, index) => (
        <tr key={index}>
          <th>{item}</th>
          {index === 0 && data.map((a, b) => <td key={b}>{a.title}</td>)}
          {index === 1 &&
            data.map((a, b) => <td key={b}>{formatIDR(a.price)}</td>)}
          {index === 2 &&
            data.map((a, b) => <td key={b}>{formatIDR(a.brand)}</td>)}
          {index === 3 &&
            data.map((a, b) => <td key={b}>{a.specification.besaran_pk}</td>)}
          {index === 4 &&
            data.map((a, b) => <td key={b}>{a.specification.teknologi_ac}</td>)}
          {index === 5 &&
            data.map((a, b) => (
              <td key={b}>{a.specification.konsumsi_daya}</td>
            ))}
          {index === 6 &&
            data.map((a, b) => (
              <td key={b}>{a.specification.dimensi_produk}</td>
            ))}
          {index === 7 &&
            data.map((a, b) => <td key={b}>{a.specification.berat}</td>)}
          {index === 8 &&
            data.map((a, b) => (
              <td key={b}>
                {a.specification.kelengkapan_paket.replace(",", " - ")}
              </td>
            ))}
          {index === 9 &&
            data.map((a, b) => <td key={b}>{a.specification.lain_lain}</td>)}
          {index === 10 &&
            data.map((a, b) => (
              <td key={b}>{a.specification.nomor_sertifikat_sni}</td>
            ))}
          {index === 11 &&
            data.map((a, b) => (
              <td key={b}>{a.specification.nomor_pendaftaran_barang}</td>
            ))}
        </tr>
      ))}
    </tbody>
  );
};

const ItemComparation = ({ listItem, handlerDeItem }) => {
  return (
    <div className="group avatar w-full h-full aspect-square">
      <div className="sm:w-32 rounded shadow border-2 overflow-hidden">
        <button
          className={`hidden btn-error btn-sm ${
            listItem && "group-hover:block"
          } btn absolute bottom-0 left-0 w-full rounded`}
          value={listItem}
          onClick={handlerDeItem}
        >
          Hapus
        </button>

        {listItem ? (
          <img src={listItem} />
        ) : (
          <span className="flex justify-center items-center w-full h-full">
            <CiSquarePlus size={30} />
          </span>
        )}
      </div>
    </div>
  );
};

const FilterProduct = () => {
  const [cx, setCx] = useState([
    {
      title: "Brand",
      list: [
        {
          title: "Panasonic",
          checked: false,
        },
        {
          title: "Sharp",
          checked: false,
        },
        {
          title: "Daikin",
          checked: false,
        },
        {
          title: "Mitsubishi",
          checked: false,
        },
        {
          title: "Akari",
          checked: false,
        },
        {
          title: "Hisense",
          checked: false,
        },
        {
          title: "Midea",
          checked: false,
        },
        {
          title: "Polytron",
          checked: false,
        },
        {
          title: "TCL",
          checked: false,
        },
      ],
    },
    {
      title: "Kondisi",
      list: [
        {
          title: "Baru",
          checked: false,
        },
        {
          title: "Bekas",
          checked: false,
        },
      ],
    },
    {
      title: "Harga",
      list: [
        {
          id: 1,
          title: "Rp545,2 rb - Rp1,8 jt",
          checked: false,
        },
        {
          id: 2,
          title: "Rp3,1 jt - Rp4,4 jt",
          checked: false,
        },
        {
          id: 3,
          title: "Rp4,4 jt - Rp5,7 jt",
          checked: false,
        },
        {
          id: 4,
          title: "Rp7,4 jt - Rp15,7 jt",
          checked: false,
        },
      ],
    },
  ]);

  const handlerReset = () => {
    const updatedCx = cx.map((category) => ({
      ...category,
      list: category.list.map((list) => ({
        ...list,
        checked: false,
      })),
    }));
    setCx(updatedCx);
  };

  const handleCheckboxChange = (categoryTitle, itemTitle) => {
    setCx((prevState) =>
      prevState.map((category) =>
        category.title === categoryTitle
          ? {
              ...category,
              list: category.list.map((item) =>
                item.title === itemTitle
                  ? { ...item, checked: !item.checked }
                  : item
              ),
            }
          : category
      )
    );
  };
  return (
    <>
      <Button
        className="shadow-blue-300"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        <LuFilter size={20} />
        Filter
      </Button>
      <dialog id="my_modal_5" className="modal modal-middle">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-2xl">Semua Filter</h3>
            <form method="dialog">
              <button className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white p-1 rounded-full">
                <IoClose size={25} />
              </button>
            </form>
          </div>
          <div className="py-4 h-60 overflow-y-scroll overflow-x-hidden flex flex-col gap-4">
            {cx.map((category, index) => (
              <div key={index + category.title}>
                <h3 className="font-bold">{category.title}</h3>
                <ul className="flex gap-2 my-2 flex-wrap">
                  {category.list.map((item) => (
                    <li key={item.id || item.title}>
                      <label
                        className={`rounded font-normal text-sm border shadow-md cursor-pointer p-1 ${
                          item.checked && "bg-green-300 text-white"
                        }`}
                        htmlFor={item.title}
                      >
                        {item.title}
                        <input
                          className="hidden"
                          type="checkbox"
                          id={item.title}
                          checked={item.checked}
                          onChange={() =>
                            handleCheckboxChange(category.title, item.title)
                          }
                        />
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button onClick={handlerReset}>Reset</Button>
            <form method="dialog">
              <Button className="w-full">Tampilkan</Button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

const ListProducts = ({ productClick }) => {
  const [listProducts, setListProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState({});
  const skeletonIndex = Array.from({ length: 12 }, (_, index) => index + 1);
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
    <section className="bg-base-200">
      <div
        className={`2xl:container bg-base-100 rounded-xl p-5 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 relative ${
          listProducts === null || (listProducts.length === 0 && "p-20")
        }`}
      >
        {listProducts === null && (
          <div className="w-full p-10 flex justify-center items-center col-span-full flex-col">
            <BiFileFind size={150} />
            <h2 className="font-bold text-xl">Produk tidak di temukan!</h2>
          </div>
        )}

        {listProducts !== null &&
          listProducts.length === 0 &&
          skeletonIndex.map((item) => <SkeletonProducts key={item} />)}

        {listProducts !== null &&
          listProducts.length > 0 &&
          listProducts.map((item, index) => (
            <CardProduct key={index} item={item} productClick={productClick} />
          ))}

        {/* {listProducts !== null && listProducts.length > 0 && ( */}
          <div className={`mt-5 flex justify-center items-center w-full col-span-full flex-col ${listProducts === null && "hidden"}`}>
            <Pagination
              pages={pages}
              onPageChange={(page) => setActivePage(page.selected + 1)}
            />
          </div>
        {/* )} */}
      </div>
    </section>
  );
};

export default Home;

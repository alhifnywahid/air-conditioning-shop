import "rc-pagination/assets/index.css";
import { useContext, useEffect, useState } from "react";
import { BiFileFind } from "react-icons/bi";
import { CgArrowsExchange } from "react-icons/cg";
import { CiSquarePlus } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  Button,
  CardProduct,
  Pagination,
  SearchProduct,
  SkeletonProducts,
} from "../components";
import { SearchContext, SearchProvider } from "../context/SearchProvider";
import { product } from "../service/product.services";
import { products } from "../service/products.services";
import { searchProducts } from "../service/searchproducts.services";
import { formatIDR } from "../utils/Function";

function Home() {
  const [isComparation, setIsComparation] = useState(false);
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
    if (!isComparation) return false;
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
          <div className="hero-content relative min-w-full flex-col items-center justify-between overflow-hidden p-0 lg:flex-row-reverse 2xl:rounded-xl">
            <img src="/2.avif" className="hidden w-full lg:block" />
            <img src="/mobile.avif" className="w-full lg:hidden" />
            <div className="absolute m-5 grid grid-cols-1 lg:grid-cols-2">
              <div className="lg:pl-10 lg:pr-36">
                <p className="mx-auto w-[80%] py-6 text-center text-2xl font-bold text-white sm:mb-4 sm:mt-32 md:mt-24 md:text-3xl lg:m-0 lg:w-full lg:text-left">
                  Menyediakan berbagai layanan berkualitas tinggi terkait dengan
                  sistem pendingin udara (AC) Anda.
                </p>
                <div className="mx-auto flex w-fit gap-3 lg:w-full">
                  <Link
                    to="/layanan"
                    className="btn btn-sm rounded border-none bg-blue-500 text-white md:btn-md hover:bg-blue-600 md:rounded-md md:text-lg"
                  >
                    Layanan
                  </Link>
                  <Link
                    to="/kontak"
                    className="btn btn-sm rounded border-none bg-blue-500 text-white md:btn-md hover:bg-blue-600 md:rounded-md md:text-lg"
                  >
                    Hubungi Kami
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-200">
        <div className="flex flex-col gap-6 rounded-xl bg-base-100 p-10 2xl:container">
          <h1 className="text-center text-xl font-bold text-slate-800 md:text-2xl">
            Temukan berbagai macam Air Conditioner dengan merk terbaik hanya di
            sini!
          </h1>
          <div className="mx-auto grid w-fit grid-cols-2 gap-2 md:grid-cols-5">
            {[...Array(10)].map((_, i) => (
              <img
                key={i + 1}
                className="w-44 rounded-md border shadow"
                src={`/brand/${i + 1}.png`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base-200 2xl:py-2">
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-base-100 p-5 2xl:container md:flex">
          <FilterProduct />
          <ComparisonProduct
            setShowModal={setIsComparation}
            showModal={isComparation}
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
``;
const ComparisonProduct = (props) => {
  const { showModal, setShowModal, listItem, setListItem } = props;

  const [loader, setLoader] = useState(false);
  const [dataComparation, setDataComparation] = useState([]);

  const handlerStartComparation = async () => {
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
        } fixed bottom-0 right-0 z-20 w-full flex-col gap-3 border-2 bg-base-100 p-4 shadow sm:bottom-4 sm:right-4 sm:w-auto sm:rounded-xl`}
      >
        <div className="flex items-center justify-between">
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
        <div className="flex items-center justify-between">
          <ItemComparation
            handlerDeItem={() => handlerDeItem(0)}
            listItem={listItem[0].src}
          />
          <span className="mx-4 font-bold">+</span>
          <ItemComparation
            handlerDeItem={() => handlerDeItem(1)}
            listItem={listItem[1].src}
          />
          <span className="mx-4 font-bold">+</span>
          <ItemComparation
            handlerDeItem={() => handlerDeItem(2)}
            listItem={listItem[2].src}
          />
        </div>
        <Button onClick={handlerStartComparation}>Bandingkan</Button>
      </div>

      <dialog id="start-comparation" className="modal backdrop-blur-sm">
        {loader && (
          <div className="flex min-h-full min-w-full items-center justify-center">
            <span className="loading loading-spinner w-20"></span>
          </div>
        )}

        {!loader && (
          <div className="modal-box min-h-screen min-w-full rounded-none lg:min-h-[85%] lg:min-w-fit lg:rounded-md">
            <div className="overflow-x-auto p-2">
              <table className="table lg:w-fit">
                <thead>
                  <tr>
                    <th className="aspect-square w-48"></th>
                    {dataComparation.map((item, index) => (
                      <th
                        key={index}
                        className="h-w-40 aspect-square w-40 lg:w-60"
                      >
                        <img src={item.image[0]} className="border-2 shadow" />
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
  const titleDescription = [
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
      {titleDescription.map((item, index) => (
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
    <div className="group avatar aspect-square h-full w-full">
      <div className="overflow-hidden rounded border-2 shadow sm:w-32">
        <button
          className={`btn-error btn-sm hidden ${
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
          <span className="flex h-full w-full items-center justify-center">
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
                  : item,
              ),
            }
          : category,
      ),
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
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Semua Filter</h3>
            <form method="dialog">
              <button className="rounded-full bg-red-500 p-1 text-white hover:bg-red-600 active:bg-red-700">
                <IoClose size={25} />
              </button>
            </form>
          </div>
          <div className="flex h-60 flex-col gap-4 overflow-x-hidden overflow-y-scroll py-4">
            {cx.map((category, index) => (
              <div key={index + category.title}>
                <h3 className="font-bold">{category.title}</h3>
                <ul className="my-2 flex flex-wrap gap-2">
                  {category.list.map((item) => (
                    <li key={item.id || item.title}>
                      <label
                        className={`cursor-pointer rounded border p-1 text-sm font-normal shadow-md ${
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
          <div className="mt-4 grid grid-cols-2 gap-2">
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
            <CardProduct key={index} item={item} onClick={productClick} />
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
};

export default Home;

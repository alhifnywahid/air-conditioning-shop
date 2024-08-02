import { useContext, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiDelete } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { SearchContext } from "../context/SearchProvider";
import Button from "./Button";

function SearchProduct() {
  const { setSearchQuery } = useContext(SearchContext);
  const [disabled, setDisabled] = useState(true);
  const [focus, setFocus] = useState(false);
  const [listSearch, setListSearch] = useState([]);
  const [search, setSearch] = useState("");
  const inputValueRef = useRef("");
  const containerRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem("listsearch")) {
      localStorage.setItem("listsearch", JSON.stringify([]));
    } else {
      setListSearch(JSON.parse(localStorage.getItem("listsearch")).sort());
    }
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (containerRef.current && containerRef.current.contains(event.target)) {
        setFocus(true);
      } else {
        setFocus(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleSubmitSearch = async () => {
    const db = JSON.parse(localStorage.getItem("listsearch"));
    const input = document.getElementById("input-search").value;
    const filter = db.filter((item) => item === input);
    if (filter.length == 0) {
      db.push(input);
      localStorage.setItem("listsearch", JSON.stringify(db));
    }
    setListSearch(JSON.parse(localStorage.getItem("listsearch")));
    setSearchQuery(input);
  };

  const handlerSearchChange = () => {
    inputValueRef.current.value.trim().length > 0
      ? setDisabled(false)
      : setDisabled(true);
    setSearch(inputValueRef.current.value);
  };

  return (
    <div className="join relative col-span-3 w-full shadow md:col-span-1">
      <label
        ref={containerRef}
        className={`input join-item input-bordered relative flex w-full items-center gap-2`}
      >
        <input
          id="input-search"
          type="text"
          value={search}
          className="grow"
          placeholder="Cari Produk..."
          ref={inputValueRef}
          onChange={handlerSearchChange}
        />
        <SearchModal
          listSearch={listSearch}
          setListSearch={setListSearch}
          focus={focus}
          setSearch={setSearch}
          setDisabled={setDisabled}
        />
      </label>
      <Button
        id="search"
        className="join-item font-bold disabled:bg-blue-300 disabled:text-white"
        disabled={disabled}
        onClick={handleSubmitSearch}
      >
        <IoSearch size={20} />
      </Button>
    </div>
  );
}

const SearchModal = (props) => {
  const { listSearch, setListSearch, focus, setSearch, setDisabled } = props;
  const handlerItem = (e) => {
    const data = JSON.parse(localStorage.getItem("listsearch"));
    const newData = data.filter((item) => {
      return item != e.target.value;
    });
    localStorage.setItem("listsearch", JSON.stringify(newData));
    setListSearch(JSON.parse(localStorage.getItem("listsearch")));
  };

  const handlerSetInput = (e) => {
    setSearch(e.target.value);
    setDisabled(false);
  };

  return (
    <div
      id="search-modal"
      className={`absolute left-0 top-14 z-10 w-full rounded-md border bg-base-100 p-3 shadow ${
        focus ? "block" : "hidden"
      }`}
    >
      <h1 className="mb-2">Pencarian Terakhir</h1>
      {listSearch.length > 0 ? (
        <div className="flex w-full flex-col gap-2">
          {listSearch.map((item, index) => (
            <div key={index} className="flex gap-2 overflow-hidden">
              <button
                className="btn btn-ghost join-item btn-sm flex w-full flex-initial items-center justify-start gap-2 font-light"
                value={item}
                onClick={handlerSetInput}
              >
                <CiSearch size={20} />
                {item}
              </button>
              <button
                className="btn join-item btn-sm w-fit flex-none hover:bg-red-500 hover:text-white"
                value={item}
                onClick={handlerItem}
              >
                <FiDelete className="pointer-events-none" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Tidak ada hasil pencarian...</p>
      )}
    </div>
  );
};

export default SearchProduct;

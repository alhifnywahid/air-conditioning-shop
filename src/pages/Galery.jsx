import { getImages } from "./../service/getImages.services";
import Button from "../components/Button";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FcNext, FcPrevious } from "react-icons/fc";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
function Galery() {
  const [imageHeader, setImageHeader] = useState([]);
  const [imgBody, setImgBody] = useState([]);
  let sliderRef = useRef(null);
  const skeleton = Array.from({ length: 50 }, (_, index) => index + 1);

  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //     console.log(window.innerWidth);
  //   };

  //   window.addEventListener('resize', handleResize);

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  useEffect(() => {
    getImages("panoramic", 1).then((images) => setImageHeader(images));
    getImages("square", 1).then((images) => setImgBody(images));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  return (
    <>
      <section className="bg-base-200 2xl:py-2">
        <div className="2xl:container bg-base-100 p-5 flex flex-col gap-4 justify-center items-center rounded-xl">
          <div className="flex flex-col gap-4 justify-center items-center">
            <h2 className="text-3xl font-bold w-fit md:text-3xl">Galery</h2>
            <p className="w-fit text-justify md:text-left md:text-xl">
              Dokumentasi proyek yang telah kami tangani.
            </p>
          </div>
          <div className="rounded-md w-full aspect-[4/1] relative overflow-hidden">
            <Slider
              ref={(slider) => {
                sliderRef = slider;
              }}
              {...settings}
              className="rounded-md w-full aspect-[4/1]"
            >
              {imageHeader.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  className="aspect-[4/2] object-cover"
                />
              ))}
            </Slider>
            <Arrow onClick={() => sliderRef.slickPrev()} type="prev" />
            <Arrow onClick={() => sliderRef.slickNext()} type="next" />
          </div>
        </div>
      </section>
      <section className="bg-base-200 2xl:pb-2">
        <div className="2xl:container bg-base-100 p-5 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 rounded-xl">
          {imageHeader.length <= 0 &&
            imgBody.length <= 0 &&
            skeleton.map((item, index) => (
              <div
                key={index}
                className="w-full aspect-square bg-slate-200 rounded-md skeleton"
              />
            ))}

          {imageHeader.length >= 1 && imgBody.length >= 1 && (
            <PhotoProvider>
              {imgBody.map((item, index) => (
                <PhotoView key={index} src={item}>
                  <img
                    loading="lazy"
                    className="rounded-md shadow hover:border border-blue-400 cursor-zoom-in"
                    src={item}
                  />
                </PhotoView>
              ))}
            </PhotoProvider>
          )}
        </div>
      </section>
      
    </>
  );
}

const Arrow = ({ onClick, type }) => {
  return (
    <button
      className={`bg-white absolute ${
        type === "prev" ? "left-5" : "right-5"
      } top-1/2 transform -translate-y-1/2 btn border-none btn-circle bg-[rgba(0,0,0,0.3)]`}
      onClick={onClick}
    >
      {type === "prev" ? <FcPrevious /> : <FcNext />}
    </button>
  );
};

export default Galery;

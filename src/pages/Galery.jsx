import { useEffect, useRef, useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import "react-loading-skeleton/dist/skeleton.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getImages } from "./../service/getImages.services";
function Galery() {
  const [imageHeader, setImageHeader] = useState([]);
  const [imgBody, setImgBody] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let sliderRef = useRef(null);

  useEffect(() => {
    getImages("panoramic", 1).then((images) => setImageHeader(images));
    getImages("square", 1).then((images) => setImgBody(images));
  }, []);

  useEffect(() => {
    setIsLoading(imageHeader.length >= 1 && imgBody.length);
  }, [imageHeader, imgBody]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <section className="bg-base-200 2xl:py-2">
        <div className="2xl:container bg-base-100 p-5 flex flex-col gap-4 justify-center items-center rounded-xl">
          <div className="flex flex-col gap-4 justify-center items-center">
            {!isLoading ? (
              <>
                <div className="h-10 w-96 skeleton rounded"></div>
                <div className="h-10 w-96 skeleton rounded"></div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold w-fit md:text-3xl">Galery</h2>
                <p className="w-fit text-justify md:text-left md:text-xl">
                  Dokumentasi proyek yang telah kami tangani.
                </p>
              </>
            )}
          </div>
          {!isLoading ? (
            <div className="skeleton aspect-[4/2] xl:aspect-[4/1] w-full h-96"></div>
          ) : (
            <div className="rounded-md w-full aspect-[4/2] xl:aspect-[4/1] relative overflow-hidden skeleton">
              <Slider
                ref={(slider) => {
                  sliderRef = slider;
                }}
                {...settings}
                className="rounded-md w-full aspect-[4/2] xl:aspect-[4/1]"
              >
                {imageHeader.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    loading="lazy"
                    className="aspect-[4/2] xl:aspect-[4/1] object-cover"
                  />
                ))}
              </Slider>
              <Arrow onClick={() => sliderRef.slickPrev()} type="prev" />
              <Arrow onClick={() => sliderRef.slickNext()} type="next" />
            </div>
          )}
        </div>
      </section>
      <section className="bg-base-200 2xl:pb-2">
        <div className="2xl:container bg-base-100 p-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 rounded-xl">
          {imageHeader.length <= 0 &&
            imgBody.length <= 0 &&
            [...Array(50)].map((_, i) => (
              <div
                key={i}
                className="w-full aspect-square bg-slate-200 rounded-md skeleton"
              />
            ))}

          {imageHeader.length >= 1 && imgBody.length >= 1 && (
            <PhotoProvider>
              {imgBody.map((img, i) => (
                <PhotoView key={i} src={img}>
                  <img
                    loading="lazy"
                    className="rounded-md shadow hover:border border-blue-400 cursor-zoom-in"
                    src={img}
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

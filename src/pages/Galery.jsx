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
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-base-100 p-5 2xl:container">
          <div className="flex flex-col items-center justify-center gap-4">
            {!isLoading ? (
              <>
                <div className="skeleton h-10 w-96 rounded"></div>
                <div className="skeleton h-10 w-96 rounded"></div>
              </>
            ) : (
              <>
                <h2 className="w-fit text-3xl font-bold md:text-3xl">Galery</h2>
                <p className="w-fit text-justify md:text-left md:text-xl">
                  Dokumentasi proyek yang telah kami tangani.
                </p>
              </>
            )}
          </div>
          {!isLoading ? (
            <div className="skeleton aspect-[4/2] h-96 w-full xl:aspect-[4/1]"></div>
          ) : (
            <div className="skeleton relative aspect-[4/2] w-full overflow-hidden rounded-md xl:aspect-[4/1]">
              <Slider
                ref={(slider) => {
                  sliderRef = slider;
                }}
                {...settings}
                className="aspect-[4/2] w-full rounded-md xl:aspect-[4/1]"
              >
                {imageHeader.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    loading="lazy"
                    className="aspect-[4/2] object-cover xl:aspect-[4/1]"
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
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-base-100 p-5 2xl:container lg:grid-cols-3 xl:grid-cols-4">
          {imageHeader.length <= 0 &&
            imgBody.length <= 0 &&
            [...Array(50)].map((_, i) => (
              <div
                key={i}
                className="skeleton aspect-square w-full rounded-md bg-slate-200"
              />
            ))}

          {imageHeader.length >= 1 && imgBody.length >= 1 && (
            <PhotoProvider>
              {imgBody.map((img, i) => (
                <PhotoView key={i} src={img}>
                  <img
                    loading="lazy"
                    className="cursor-zoom-in rounded-md border-blue-400 shadow hover:border"
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
      className={`absolute bg-white ${
        type === "prev" ? "left-5" : "right-5"
      } btn btn-circle top-1/2 -translate-y-1/2 transform border-none bg-[rgba(0,0,0,0.3)]`}
      onClick={onClick}
    >
      {type === "prev" ? <FcPrevious /> : <FcNext />}
    </button>
  );
};

export default Galery;

import { Link } from "react-router-dom";
import Slider from "react-slick/lib/slider";
import { formatIDR } from "../utils/Function";

function CardProduct({ item, ...props }) {
  const settings = () => ({
    dots: false,
    infinite: true,
    fade: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  });
  return (
    <Link
      {...props}
      to={`/product/${item._id}`}
      data-id={item._id}
      data-src={item.image[0]}
      className={`overflow-hidden rounded-xl border shadow-custom-1 transition-all hover:shadow-blue-400`}
    >
      <div className={`pointer-events-none aspect-[1/1] overflow-hidden`}>
        <Slider {...settings()}>
          {item.image.map((image) => (
            <div key={`${item.id}`}>
              <img
                loading="lazy"
                src={image}
                className="pointer-events-none w-full"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="pointer-events-none flex flex-col gap-3 p-4">
        <h3 className="pointer-events-none line-clamp-2">{item.title}</h3>
        <div className="pointer-events-none flex gap-2">
          <div className="badge pointer-events-none flex justify-center rounded bg-blue-400 text-white">
            {item.brand.split(" ")[0]}
          </div>
          <div className="badge pointer-events-none flex justify-center rounded bg-blue-400 text-white">
            Bekas
          </div>
        </div>
        <p className="pointer-events-none font-bold">{formatIDR(item.price)}</p>
      </div>
    </Link>
  );
}

export default CardProduct;

import { Link } from "react-router-dom";
import { formatIDR } from "../utils/Function";
import Slider from "react-slick/lib/slider";

function CardProduct({ item, productClick, ...props }) {
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
      onClick={productClick}
      to={`product/${item._id}`}
      data-id={item._id}
      data-src={item.image[0]}
      className={`shadow rounded-xl p-4 border hover:shadow-blue-400 transition-all`}
    >
      <div className={`aspect-[1/1] overflow-hidden mb-2 pointer-events-none`}>
        <Slider {...settings()}>
          {item.image.map((image) => (
            <div key={`${item.id}`}>
              <img
                loading="lazy"
                src={image}
                className="w-full rounded pointer-events-none"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex flex-col gap-3 pointer-events-none">
        <h3 className="line-clamp-2 pointer-events-none">{item.title}</h3>
        <div className="flex gap-2 pointer-events-none">
          <div className="badge bg-blue-400 text-white rounded flex justify-center pointer-events-none">
            {item.brand.split(" ")[0]}
          </div>
          <div className="badge bg-blue-400 text-white rounded flex justify-center pointer-events-none">
            Bekas
          </div>
        </div>
        <p className="font-bold pointer-events-none">{formatIDR(item.price)}</p>
      </div>
    </Link>
  );
}

export default CardProduct;

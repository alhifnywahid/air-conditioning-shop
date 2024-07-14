import { FaPhoneSquareAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import Button from "../components/Button";
function Kontak() {
  const listContact = [
    {
      icon: <FaPhoneSquareAlt size={30} />,
      title: "Kontak",
      desc: "08123456789",
    },
    {
      icon: <MdOutlineMailOutline size={30} />,
      title: "Email",
      desc: "adminbt@gmail.com",
    },
  ];

  function formMessage(e) {
    e.preventDefault();
    const typeMessage = e.target.children[0].value;
    const name = e.target.children[1].lastChild.value;
    const email = e.target.children[2].lastChild.value;
    const message = e.target.children[3].value;

    // const contactMethod = document.getElementById("contactMethod").value;
    // const name = document.getElementById("name").value;
    // const email = document.getElementById("email").value;
    // const message = document.getElementById("message").value;

    // if (contactMethod === "WhatsApp") {
    //   const phoneNumber = "085655207366";
    //   const whatsappMessage = `Nama lengkap: ${name}%0AEmail: ${email}%0APesan: ${message}`;
    //   const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    //   window.open(whatsappURL, "_blank");
    // } else {
    //   // Handle other contact methods like Email
    //   alert("Fitur pengiriman email belum tersedia.");
    // }
  }

  return (
    <>
      <section className="bg-base-200 2xl:py-2">
        <div className="2xl:container bg-base-100 rounded-xl p-5 flex flex-col-reverse justify-center items-center lg:flex-row">
          <div className="flex flex-col gap-4 justify-center items-center md:flex-1 lg:items-start box-border lg:m-6">
            <h2 className="text-3xl font-bold w-fit md:text-3xl">
              Kontak Kami
            </h2>
            <p className="w-fit text-center lg:text-left xl:text-xl xs:w-[90%] sm:w-[70%] lg:w-[85%]">
              Jangan ragu untuk menghubungi kami kapan saja. Kami akan
              menghubungi Anda sesegera mungkin.
            </p>
            <div className="flex-1 flex justify-center items-start gap-1 mt-2 w-full lg:justify-start">
              {listContact.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 p-4 bg-base-100 rounded-xl cursor-pointer border hover:border-blue-300 xs:w-full lg:w-fit"
                >
                  <div className="flex gap-3 justify-center items-center">
                    {item.icon}
                    <div>
                      <h3 className="text-md font-semibold">{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:flex-1">
            <img loading="lazy" src="/kontak-banner.png" className="w-full" />
          </div>
        </div>
      </section>
      <section className="bg-base-200 2xl:pb-2">
        <div className="2xl:container bg-base-200 2xl:bg-base-100 rounded-xl p-5 flex flex-col md:flex-row gap-3">
          <form onSubmit={formMessage} className="flex flex-col gap-2 flex-1">
            <select
              className="select select-bordered"
              required
              defaultValue="none"
            >
              <option disabled value="none">
                Pesan via
              </option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">Email</option>
            </select>
            <label className="input input-bordered flex items-center gap-2">
              <FaRegUser size={25} />
              <input
                type="text"
                className="grow h-[3rem]"
                placeholder="Nama lengkap"
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <MdOutlineMailOutline size={25} />
              <input
                type="email"
                className="grow h-[3rem]"
                placeholder="Email aktif"
                required
              />
            </label>
            <textarea
              className="textarea textarea-bordered h-full"
              placeholder="Pesan"
              required
            ></textarea>
            <Button type="submit">Kirim</Button>
          </form>

          <div className="flex-1 lg:flex-auto rounded-md overflow-hidden shadow border-2 h-[400px] ">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Jl.%20Kihajar%20Dewantoro%20No.64,%20RT.003/RW.003,%20Gondrong,%20Kec.%20Cipondoh,%20Kota%20Tangerang,%20Banten%2015146+(Berkah%20Teknik)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}

export default Kontak;

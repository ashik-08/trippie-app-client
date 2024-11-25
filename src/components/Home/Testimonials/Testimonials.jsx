import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import user1 from "../../../assets/home/user-1.jpg";
import user2 from "../../../assets/home/user-2.jpg";
import user3 from "../../../assets/home/user-3.jpg";
import user4 from "../../../assets/home/user-4.jpg";
import user5 from "../../../assets/home/user-5.jpg";
import Container from "../../Shared/Container/Container";
import "./Testimonials.css";

const Testimonials = () => {
  return (
    <Container>
      <div className="mt-4 mb-20 md:mb-24 lg:mb-28 xl:mb-32 p-2">
        <h1 className="text-center text-outerSpace text-3xl md:text-4xl font-semibold">
          Testimonials
        </h1>
        <p className="text-center text-sm md:text-base text-gray-600 mt-2 font-medium italic mb-8 md:mb-10 lg:mb-12 xl:mb-14">
          What Our Customers Say About Us ...
        </p>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={40}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="space-y-1 md:space-y-1.5 lg:space-y-2.5 xl:space-y-4 p-5 md:pl-16 lg:pl-28 xl:pl-36 mb-10 border rounded-lg shadow-sm">
              <img
                className="w-12 md:w-20 xl:w-28 drop-shadow-md rounded-lg"
                src={user1}
                alt="user-img"
              />
              <p className="text-primary-base text-sm md:text-base lg:text-xl xl:text-2xl font-semibold">
                Tousif S.
              </p>
              <p className="text-gray-900 text-sm md:text-base font-semibold">
                Review 1 - From a Frequent Traveler
              </p>
              <p className="max-w-xs lg:max-w-sm text-gray-600 md:text-sm lg:text-base md:font-medium">
                This app has revolutionized my travel planning! The hotel
                booking feature is seamless, and joining tours hosted by local
                agents has added an authentic touch to my trips. The interface
                is incredibly user-friendly, and I feel secure using it. Highly
                recommended for hassle-free travels!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="space-y-1 md:space-y-1.5 lg:space-y-2.5 xl:space-y-4 p-5 md:pl-16 lg:pl-28 xl:pl-36 mb-10 border rounded-lg shadow-sm">
              <img
                className="w-12 md:w-20 xl:w-28 drop-shadow-md rounded-lg"
                src={user2}
                alt="user-img"
              />
              <p className="text-primary-base text-sm md:text-base lg:text-xl xl:text-2xl font-semibold">
                Mahfuj P.
              </p>
              <p className="text-gray-900 text-sm md:text-base font-semibold">
                Review 2 - From a Travel Enthusiast
              </p>
              <p className="max-w-xs lg:max-w-sm text-gray-600 md:text-sm lg:text-base md:font-medium">
                As someone who loves to explore, this app is a game-changer. The
                integration with travel guides helped me discover hidden gems,
                and the security features give me peace of mind. Booking hotels
                and connecting with tour agents is effortless. It’s everything a
                traveler needs in one place!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="space-y-1 md:space-y-1.5 lg:space-y-2.5 xl:space-y-4 p-5 md:pl-16 lg:pl-28 xl:pl-36 mb-10 border rounded-lg shadow-sm">
              <img
                className="w-12 md:w-20 xl:w-28 drop-shadow-md rounded-lg"
                src={user3}
                alt="user-img"
              />
              <p className="text-primary-base text-sm md:text-base lg:text-xl xl:text-2xl font-semibold">
                Ayesha S.
              </p>
              <p className="text-gray-900 text-sm md:text-base font-semibold">
                Review 3 - From a Family Traveler
              </p>
              <p className="max-w-xs lg:max-w-sm text-gray-600 md:text-sm lg:text-base md:font-medium">
                Planning family vacations has never been easier. The app’s hotel
                booking and tour integration features are top-notch. My kids
                loved the personalized experiences offered by the tour agents.
                The app’s simplicity and reliability make it a must-have for
                every family trip.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="space-y-1 md:space-y-1.5 lg:space-y-2.5 xl:space-y-4 p-5 md:pl-16 lg:pl-28 xl:pl-36 mb-10 border rounded-lg shadow-sm">
              <img
                className="w-12 md:w-20 xl:w-28 drop-shadow-md rounded-lg"
                src={user4}
                alt="user-img"
              />
              <p className="text-primary-base text-sm md:text-base lg:text-xl xl:text-2xl font-semibold">
                Syed N.
              </p>
              <p className="text-gray-900 text-sm md:text-base font-semibold">
                Review 4 - From a Solo Traveler
              </p>
              <p className="max-w-xs lg:max-w-sm text-gray-600 md:text-sm lg:text-base md:font-medium">
                Traveling solo has its challenges, but this app made it so much
                easier. I found trustworthy travel guides, secure bookings, and
                amazing tour options hosted by local experts. It’s become an
                essential companion for all my adventures!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="space-y-1 md:space-y-1.5 lg:space-y-2.5 xl:space-y-4 p-5 md:pl-16 lg:pl-28 xl:pl-36 mb-10 border rounded-lg shadow-sm">
              <img
                className="w-12 md:w-20 xl:w-28 drop-shadow-md rounded-lg"
                src={user5}
                alt="user-img"
              />
              <p className="text-primary-base text-sm md:text-base lg:text-xl xl:text-2xl font-semibold">
                Arunima D.
              </p>
              <p className="text-gray-900 text-sm md:text-base font-semibold">
                Review 5 - From a Travel Blogger
              </p>
              <p className="max-w-xs lg:max-w-sm text-gray-600 md:text-sm lg:text-base md:font-medium">
                As a travel blogger, this app is a treasure trove of
                opportunities. From securing the best hotels to finding
                authentic tour experiences, it’s made my job easier and my
                travels more enjoyable. The secure and intuitive interface is a
                cherry on top!
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </Container>
  );
};

export default Testimonials;

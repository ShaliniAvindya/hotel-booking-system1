import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './OffersSection.css';

const offers = [
  {
    title: "Island Villa Retreat",
    description: "Enjoy the luxury of space, comfort, and tranquility, with 41% off your stay and daily breakfast included.",
    imageUrl: "https://i.postimg.cc/jdmBc0Mv/1.png",
    link: "none",
  },
  {
    title: "Poolside Paradise & Island Adventures",
    description: "Relax by the stunning pool and enjoy our exclusive day-out package, featuring unforgettable excursions.",
    imageUrl: "https://i.postimg.cc/nz3PQ6s4/2.png",
    link: "none",
  },
  {
    title: "Kayaking Adventure",
    description: "Paddle through the crystal-clear waters of the Maldives with a thrilling kayaking experience.",
    imageUrl: "https://i.postimg.cc/jjQ9RWtk/4.png",
    link: "none",
  },
  {
    title: "Wave Runner Thrills",
    description: "Experience the thrill of the open sea with an exciting wave runner ride. Book your luxury stay at LUXURY.",
    imageUrl: "https://i.postimg.cc/2y3Xd2vP/3.png",
    link: "none",
  },
  {
    title: "Moments of Romance",
    description: "Create unforgettable memories with our bespoke romantic experiences.",
    imageUrl: "https://i.postimg.cc/t46wmSfb/5.png",
    link: "none",
  },
  {
    title: "Underwater Exploration",
    description: "Discover the vibrant marine life of the Maldives with our world-class diving experiences.",
    imageUrl: "https://i.postimg.cc/cJN2q7yn/6.png",
    link: "none",
  },
];


const OffersSection = () => {
  return (
    <div className="offers-section-wrapper">
      <div className="offers-section">
        <div className="offers-header">
          <h2 className="offers-title">Exclusive LUXURY Offers</h2>
          <p className="offers-subtitle">
            Benefits and best available rates
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          loop={true} // Enables infinite looping
          className="swiper-container"
        >
          {offers.map((offer, index) => (
            <SwiperSlide key={index}>
              <a href={offer.link} className="offer-link" title={offer.title}>
                <div className="offer-image">
                  <img src={offer.imageUrl} alt={offer.title} className="offer-img" />
                </div>
                <div className="offer-text">
                  <h3 className="offer-title">{offer.title}</h3>
                  <p className="offer-description">{offer.description}</p>
                  <a href={offer.link} className="offer-btn">Discover More</a>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OffersSection;

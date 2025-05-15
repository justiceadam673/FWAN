import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: "Esther Olabode",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/29/Profile_picture_Craig_Fagan.jpg",
      quote:
        "Fwan has transformed how I sell my produce. I've expanded my customer base and increased my profits by 30% in just six months.",
    },
    {
      name: "Umar Ahmad",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c6/Paul_Benioff_profile_picture_with_glasses.jpg",
      quote:
        "The platform's transparency and direct communication with buyers has helped me better understand market demands and adjust my farming accordingly.",
    },
    {
      name: "Sarah Johnson",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d4/Picture_Pascal_Remy_SNF.jpg",
      quote:
        "As a small business owner, this platform has been a game-changer for connecting with local farmers and getting fresh produce.",
    },
  ];

  return (
    <section className='max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8'>
      <h1 className='text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800'>
        What Our Users Say
      </h1>

      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={2}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className='bg-white p-6 h-full rounded-3xl shadow-lg flex flex-col justify-center space-y-4'>
              <div className='flex items-center space-x-4'>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className='w-16 h-16 rounded-full object-cover'
                />
                <h3 className='text-xl font-semibold text-gray-800'>
                  {testimonial.name}
                </h3>
              </div>
              <p className='text-sm text-gray-600 leading-relaxed'>
                {testimonial.quote}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TestimonialCarousel;

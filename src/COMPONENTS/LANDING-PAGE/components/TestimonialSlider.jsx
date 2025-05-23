import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Esther Olabode",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    message:
      "Fwan has transformed how I sell my produce. I've expanded my customer base and increased my profits by 30% in just six months.",
  },
  {
    id: 2,
    name: "Rejoice Bamidele",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    message:
      "Using Fwan has made transactions smoother and helped me reach new markets I never imagined.",
  },
  {
    id: 3,
    name: "Daniel Danladi",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    message:
      "Fwan has made it easier for me to connect with buyers. My business is thriving.",
  },
  {
    id: 4,
    name: "Grace John",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    message:
      "Thanks to Fwan, my farm produce reaches more customers. It's been a game changer.",
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const step = isMobile ? 1 : 2;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + step) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - step + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className='bg-[#E4DBDB] py-12 px-4' {...handlers}>
      <h2 className='text-[20px] lg:text-[45px] font-semibold text-center mb-[28px] text-[#1E1E1E] font-[kodchasan]'>
        What Our Users Say
      </h2>

      <div className='relative max-w-6xl mx-auto'>
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className='absolute hidden md:flex left-0 top-1/2 transform -translate-y-1/2 z-10 p-2'
        >
          <ChevronLeft size={32} />
        </button>

        {/* Testimonial Cards */}
        <div className='flex justify-center gap-8 transition-all duration-500'>
          {(isMobile ? [0] : [0, 1]).map((offset) => {
            const index = (currentIndex + offset) % testimonials.length;
            const testimonial = testimonials[index];
            if (!testimonial) return null;

            const { id, name, image, message } = testimonial;

            return (
              <div
                key={id}
                className='bg-white rounded-[2rem] shadow-md w-full max-w-[300px] md:max-w-md p-4 md:p-6 flex flex-col justify-start items-start'
              >
                <div className='flex items-center gap-4 mb-4'>
                  <img
                    src={image}
                    alt={name}
                    className='w-14 h-14 rounded-full object-cover'
                  />
                  <p className='font-semibold text-[16px] md:text-lg'>{name}</p>
                </div>
                <p className='text-gray-800 max-md:text-[12px]'>{message}</p>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className='absolute hidden md:flex right-0 top-1/2 transform -translate-y-1/2 z-10 p-2'
        >
          <ChevronRight size={32} />
        </button>

        {/* Pagination Dots */}
        <div className='flex justify-center mt-6 space-x-2'>
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex ? "bg-green-600" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;

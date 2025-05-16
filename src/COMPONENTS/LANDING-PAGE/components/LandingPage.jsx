import React from "react";
import Navbar from "./NavBer";
import Herosection from "./HeroSection";
import AboutUs from "./Aboutus";
import ProductGrid from "./ProductGrid";
import TestimonialCarousel from "./TestimonialCarousel";
import FAQSection from "./FAQSection ";
import Footer from "./footer";
const LandingPage = () => {
  return (
    <div>
      <Navbar />

      <div className='bg-[#EAEAEA]'>
        <Herosection />
        <AboutUs />
        <ProductGrid />
        <TestimonialCarousel />
        <FAQSection />
        <Footer/>
      </div>
    </div>
  );
};

export default LandingPage;

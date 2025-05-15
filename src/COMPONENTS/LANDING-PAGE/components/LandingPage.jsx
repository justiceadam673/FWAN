import React from "react";
import Navbar from "./NavBer";
import Herosection  from './HeroSection'
import  AboutUs from "./Aboutus";
import ProductGrid from "./ProductGrid";
import TestimonialCarousel from "./TestimonialCarousel";
import FAQSection from "./FAQSection ";
const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Herosection/>
      < AboutUs/>
      <ProductGrid/>
      <TestimonialCarousel/>
      <FAQSection/>
    </div>
  );
};

export default LandingPage;

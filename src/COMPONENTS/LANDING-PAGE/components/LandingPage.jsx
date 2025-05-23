import React from "react";
import Navbar from "./NavBer";
import Herosection from "./HeroSection";
import AboutUs from "./Aboutus";
import ProductGrid from "./ProductGrid";
import TestimonialCarousel from "./TestimonialCarousel";
import FAQSection from "./FAQSection ";
import { Element } from "react-scroll";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className='bg-[#EAEAEA]'>
        <Herosection />

        <Element name='about'>
          <AboutUs />
        </Element>

        <Element name='collections'>
          <ProductGrid />
        </Element>

        <Element name='testimonials'>
          <TestimonialCarousel />
        </Element>

        <Element name='faqs'>
          <FAQSection />
        </Element>
        <Element>
          <Footer />
        </Element>

        {/* <Element name='collections'>
          <CollectionSection />
        </Element> */}
      </div>
    </div>
  );
};

export default LandingPage;

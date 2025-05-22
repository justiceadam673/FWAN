import React from "react";
import Navbar from "../components/NavBer";
import Herosection from "../components/HeroSection";
import AboutUs from "../components/Aboutus";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import OurFeatures from "../components/OurFeatures";
import TestimonialSlider from "../components/TestimonialSlider";
import FAQ from "../components/FAQ";
import ContactUs from "../pages/ContactUs";


const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className='bg-white'>
        <Herosection />

        <OurFeatures />

        <AboutUs />

        <ContactUs/>

        <ProductGrid />

        <TestimonialSlider />

        <FAQ />

        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;

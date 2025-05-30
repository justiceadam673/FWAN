import React from "react";
import ProductCard from "../utility/ProductCard";
import Tomatoes from "../../../assets/img/tomatoes.png";
import Potatoes from "../../../assets/img/potatoes.png";
import Pepper from "../../../assets/img/peppers.png";
// import BellPeppers from "../../../assets/img/bells.png";

const ProductGrid = () => {
  return (
    <div className='   md:w-3/4 flex flex-col items-center justify-center mx-auto  py-6'>
      <h1 className=' text-[20px] lg:text-[45px] text-[#1E1E1E] max-lg:mt-[20px]  leading-normal font-[Kodchasan] font-semibold mb-4'>
        Our Collections
      </h1>
      <div className='grid grid-cols-2  lg:grid-cols-3  lg:w-[1234px]  gap-6 justify-center'>
        <ProductCard
          title={"Tomato"}
          image={Tomatoes}
          seller={"Joshua Davis"}
          rating={4.6}
          quantity={"6kg"}
          price={"₦20,000"}
        />
        <ProductCard
          title={"Bell Pepper"}
          image={Pepper}
          seller={"Joshua Davis"}
          rating={4.6}
          quantity={"20kg"}
          price={"₦100,000"}
        />
        <ProductCard
          title={"Potatoes"}
          image={Potatoes}
          seller={"Joshua Davis"}
          rating={4.6}
          quantity={"6kg"}
          price={"₦20,000"}
        />
        <ProductCard
          title={"Tomato"}
          image={Tomatoes}
          seller={"Joshua Davis"}
          rating={4.6}
          quantity={"6kg"}
          price={"₦20,000"}
        />
        <ProductCard
          title={"Bell Pepper"}
          image={Pepper}
          seller={"Joshua Davis"}
          rating={4.6}
          quantity={"20kg"}
          price={"₦100,000"}
        />
        <ProductCard
          title={"Potatoes"}
          image={Potatoes}
          seller={"Joshua Davis"}
          rating={4.6}
          quantity={"6kg"}
          price={"₦20,000"}
        />
        <ProductCard
          title={"Tomato"}
          image={Tomatoes}
          seller={"Joshua Davis"}
          rating={4.6}
          quantity={"6kg"}
          price={"₦20,000"}
        />
        <ProductCard
          title={"Bell Pepper"}
          image={Pepper}
          seller={"Joshua Davis"}
          rating={4.6}
          quantity={"20kg"}
          price={"₦100,000"}
        />
        <ProductCard
          title={"Potatoes"}
          image={Potatoes}
          seller={"Joshua Davis"}
          rating={4.6}
          quantity={"6kg"}
          price={"₦20,000"}
        />
      </div>
    </div>
  );
};

export default ProductGrid;

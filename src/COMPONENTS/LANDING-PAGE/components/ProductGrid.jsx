import React from "react";
import ProductCard from "./ProductCard";
import Tomatoes from "../../../assets/img/tomato.png";
import Avocados from "../../../assets/img/avocado.png";
import Potatoes from "../../../assets/img/poat.png";
// import BellPeppers from "../../../assets/img/bells.png";

const products = [
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/Stashed_bell_pepper_ready_for_to_be_transported_03.jpg",
    title: "Bell Peppers",
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "6kg",
    price: "₦20,000",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/61/Mercado_Modelo_de_Huancayo_Peru-_Solanum_tuberosum_varieties_VI.jpg",
    title: "Potatoes",
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "9kg",
    price: "₦31,000",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f2/Persea_americana_fruit_2.JPG",
    title: "Avocados",
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "6kg",
    price: "₦20,000",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Pomodorini_sulla_pianta.jpg",
    title: "Tomatoes",
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "9kg",
    price: "₦21,000",
  },
];

const ProductGrid = () => {
  return (
    <div className=' lg:w-3/4 flex flex-col items-center mx-auto p-6'>
      <h1 className='text-[23px] lg:text-[38px] font-bold mb-4'>
        Our Collections
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2    gap-6'>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            image={product.image}
            seller={product.seller}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

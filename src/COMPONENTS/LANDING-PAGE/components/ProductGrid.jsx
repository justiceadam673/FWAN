

import React from "react";
import ProductCard from "./productcard";

const products = [
  {
    image:
      "https://images.unsplash.com/photo-1608139750070-b019f1e6a937?auto=format&fit=crop&w=400&q=80",
    title: "Bell Peppers",
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "6kg",
    price: "₦20,000",
  },
  {
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=400&q=80",
    title: "Potatoes",
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "9kg",
    price: "₦31,000",
  },
  {
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80",
    title: "Avocados",
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "6kg",
    price: "₦20,000",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
    title: "Tomatoes",
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "9kg",
    price: "₦21,000",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
    title: "Tomatoes",
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "9kg",
    price: "₦21,000",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
    title: "Tomatoes",
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "9kg",
    price: "₦21,000",
  },
];

const ProductGrid = () => {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Latest Produce</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3  gap-6'>
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
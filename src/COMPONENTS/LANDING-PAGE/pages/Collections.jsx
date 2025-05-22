import React, { useState } from "react";
import CollectionsCard from "../utility/CollectionsCard";
import Tomatoes from "../../../assets/img/tomatoes.png";
import Potatoes from "../../../assets/img/potatoes.png";
import Pepper from "../../../assets/img/peppers.png";
import { Icon } from "@iconify/react";

const productsData = [
  {
    title: "Tomato",
    image: Tomatoes,
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "6kg",
    price: "₦20,000",
  },
  {
    title: "Bell Pepper",
    image: Pepper,
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "20kg",
    price: "₦100,000",
  },
  {
    title: "Potatoes",
    image: Potatoes,
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "6kg",
    price: "₦20,000",
  },
  {
    title: "Tomato",
    image: Tomatoes,
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "6kg",
    price: "₦20,000",
  },
  {
    title: "Bell Pepper",
    image: Pepper,
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "20kg",
    price: "₦100,000",
  },
  {
    title: "Potatoes",
    image: Potatoes,
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "6kg",
    price: "₦20,000",
  },
  {
    title: "Tomato",
    image: Tomatoes,
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "6kg",
    price: "₦20,000",
  },
  {
    title: "Bell Pepper",
    image: Pepper,
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "20kg",
    price: "₦100,000",
  },
  {
    title: "Potatoes",
    image: Potatoes,
    seller: "Joshua Davis",
    rating: 4.6,
    quantity: "6kg",
    price: "₦20,000",
  },
  // Add more products as needed
];

const Collections = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");

  const filteredProducts = productsData.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLetter = selectedLetter
      ? item.title.toLowerCase().startsWith(selectedLetter.toLowerCase())
      : true;
    return matchesSearch && matchesLetter;
  });

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <main className='px-4 lg:px-8 2xl:mx-[150px] xl:mx-[50px] py-6'>
      {/* Search Input */}
      <section className='flex gap-[20px] mb-[58px] p items-center'>
        <section className='flex  items-center gap-4 '>
          <Icon
            icon='ri:search-line'
            className='absolute ml-[18px] text-black'
            width='24'
            height='24'
          />
          <input
            type='text'
            placeholder='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=' h-fit 2xl:w-[660px] w-[560px] border border-black rounded-[28px] py-[16px] pl-[48px] '
          />
        </section>
        <section className='flex w-full  gap-[20px]  items-center '>
          <button className='w-full cursor-pointer hover:border-[#3d8236] hover:text-[#3d8236] transition duration-[.5s] h-fit max-w-[135px] p-[10px] border border-black rounded-[15px]  '>
            Rating
          </button>
          <button className='w-full cursor-pointer hover:border-[#3d8236] hover:text-[#3d8236] transition duration-[.5s] h-fit max-w-[135px] p-[10px] border border-black rounded-[15px]  '>
            Harvested
          </button>
          <button className='w-full cursor-pointer hover:border-[#3d8236] hover:text-[#3d8236] transition duration-[.5s] h-fit max-w-[169px] p-[10px] border border-black rounded-[15px]  '>
            Not Harvested
          </button>
        </section>
      </section>

      {/* Main Content Area with A-Z filter on the right */}
      <section className='flex  justify-center '>
        {/* Product Grid */}
        <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-[55px]   justify-center  lg:grid-cols-3'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <CollectionsCard key={index} {...product} />
            ))
          ) : (
            <p>No items match your search/filter.</p>
          )}
        </div>

        {/* A-Z Filter */}
        <aside className='hidden lg:flex flex-col items-center justify-between 2xl:ml-4'>
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`2xl:text-[32.285px] font-medium  flex flex-col gap-[28px] font-[poppins] rounded-full ${
                selectedLetter === letter
                  ? " text-[#3D8236]"
                  : " text-[#1E1E1E]"
              } hover:text-[#4e9347] transition duration-[.5s]`}
            >
              {letter}
            </button>
          ))}
          <button
            onClick={() => setSelectedLetter("")}
            className='mt-2 px-[16px] py-[8px] rounded bg-[#3d8236] text-white text-[20px]'
          >
            Clear
          </button>
        </aside>
      </section>
    </main>
  );
};

export default Collections;

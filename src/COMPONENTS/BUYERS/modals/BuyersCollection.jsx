import React, { useState } from "react";
import BuyersCollectionCard from "../util/BuyersCollectionCard";
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
  // Repeat or fetch dynamically in real app
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const BuyersCollections = () => {
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

  return (
    <main className='px-4 lg:px-8   py-6'>
      {/* Filters */}
      <section className='flex flex-col md:flex-row items-center gap-4 mb-10'>
        <div className='relative w-full md:max-w-md'>
          <Icon
            icon='ri:search-line'
            className='absolute left-4 top-1/2 -translate-y-1/2 text-black'
            width='24'
            height='24'
          />
          <input
            type='text'
            placeholder='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full border border-black rounded-full py-3 pl-12 pr-4 text-sm md:text-base focus:outline-[#3D8236]'
          />
        </div>
        <div className='flex flex-wrap justify-center md:justify-start  gap-2 md:text-base'>
          <button className='filter-button border px-[10px] rounded-[8px] hover:text-[#2f6a2a] focus:text-[#2f6a2a]  '>
            Rating
          </button>
          <button className='filter-button border px-[10px] rounded-[8px] hover:text-[#2f6a2a] focus:text-[#2f6a2a] '>
            Harvested
          </button>
          <button className='filter-button border px-[10px] rounded-[8px] hover:text-[#2f6a2a] focus:text-[#2f6a2a] '>
            Not Harvested
          </button>
        </div>
      </section>

      {/* Content Grid */}
      <section className='flex flex-col lg:flex-row gap-6'>
        {/* Cards */}
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 flex-1'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <BuyersCollectionCard key={index} {...product} />
            ))
          ) : (
            <p>No items match your search/filter.</p>
          )}
        </div>

        {/* A-Z Filter */}
        <aside className='hidden lg:flex flex-col items-center sticky top-24'>
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`text-xl font-medium my-1 transition ${
                selectedLetter === letter
                  ? "text-[#3D8236] font-bold"
                  : "text-[#1E1E1E]"
              } hover:text-[#3D8236]`}
            >
              {letter}
            </button>
          ))}
          <button
            onClick={() => setSelectedLetter("")}
            className='mt-4 px-4 py-2 rounded-full bg-[#3D8236] text-white text-sm'
          >
            Clear
          </button>
        </aside>
      </section>
    </main>
  );
};

export default BuyersCollections;

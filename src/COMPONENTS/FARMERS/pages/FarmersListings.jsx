import React, { useState } from "react";
import { Icon } from "@iconify/react";
import FarmersListingCard from "../components/FarmersListingCard";
import Image from "../../../assets/img/tomatoes.png";

const FarmersListings = () => {
  const [filter, setFilter] = useState("All");

  const listings = [
    {
      id: 1,
      quantity: "5kg",
      price: "#50,000",
      prod: "Tomatoe",
      offers: "13",
      status: "In Stock",
    },
    {
      id: 2,
      quantity: "10kg",
      price: "#90,000",
      prod: "Cabbage",
      offers: "7",
      status: "Sold Out",
    },
    {
      id: 3,
      quantity: "2kg",
      price: "#20,000",
      prod: "Pepper",
      offers: "5",
      status: "In Stock",
    },
    {
      id: 4,
      quantity: "3kg",
      price: "#30,000",
      prod: "Onion",
      offers: "9",
      status: "Sold Out",
    },
    {
      id: 5,
      quantity: "6kg",
      price: "#60,000",
      prod: "Carrot",
      offers: "4",
      status: "In Stock",
    },
  ];

  // Filter listings based on selected status
  const filteredListings =
    filter === "All"
      ? listings
      : listings.filter((item) => item.status === filter);

  return (
    <div className='w-full px-[58px]'>
      {/* New Listing Button */}
      <section className='flex my-[28px] gap-[33px]'>
        <button className='bg-[#69B645] rounded-[8px] text-white flex justify-center items-center gap-[19px] py-[8px] pr-[29px]'>
          <span className='bg-[#E8E4E4]/20 p-[6px] ml-[8px] flex justify-center rounded-[8px] items-center'>
            <Icon
              icon='line-md:plus'
              className='text-[#E8E4E4] w-[24px] h-[24px]'
            />
          </span>
          New Listing
        </button>
      </section>

      {/* Listings Header & Filter */}
      <section>
        <div>
          <h1 className='text-[#1E1E1E] font-[Kodchasan] text-[20px] leading-normal font-medium'>
            Listings
          </h1>
        </div>

        <div className='flex space-x-4 bg-[#F1E7E7] py-[20px] rounded-t-[12px] px-[18px] mb-4 mt-4'>
          {["All", "In Stock", "Sold Out"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg ${
                filter === status ? "bg-green-600 text-white" : "bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </section>

      {/* Listing Cards */}
      <section className='grid gap-4'>
        {filteredListings.map((item) => (
          <FarmersListingCard
            key={item.id}
            image={Image}
            quantityHeader='quantity'
            quantity={item.quantity}
            priceHeader='price'
            price={item.price}
            prodHeader='product'
            prod={item.prod}
            offersHeader='offers'
            offers={item.offers}
            statusHeader='status'
            status={item.status}
          />
        ))}
      </section>
    </div>
  );
};

export default FarmersListings;

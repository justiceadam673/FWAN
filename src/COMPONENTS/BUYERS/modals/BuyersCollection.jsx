// import React, { useState } from "react";

import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";
import { useAuth } from "../../../context/AuthContext";

import BuyersCollectionCard from "../util/BuyersCollectionCard";
import Tomatoes from "../../../assets/img/tomatoes.png";
import Potatoes from "../../../assets/img/potatoes.png";
import Pepper from "../../../assets/img/peppers.png";
import { Icon } from "@iconify/react";
import AddListingModal from "../modals/AddListingModal";
import MakeOffer from "../modals/MakeOffer"; // adjust path as needed

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const BuyersCollections = () => {
  const { userData } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);

  // Optional role-based restriction
  // if (userData?.role !== "buyer") {
  //   return <p>Access denied. This section is for buyers only.</p>;
  // }

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // ✅ Correct collection name
        const querySnapshot = await getDocs(collection(db, "farmers_listings"));
        const newListings = [];
        querySnapshot.forEach((doc) => {
          const listingData = doc.data();
          newListings.push({ id: doc.id, ...listingData });
        });
        setListings(newListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (!userData || loading) {
    return <p>Loading...</p>;
  }

  const filteredProducts = listings.filter((item) => {
    const title = item.title || "";
    const matchesSearch = title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLetter = selectedLetter
      ? title.toLowerCase().startsWith(selectedLetter.toLowerCase())
      : true;
    return matchesSearch && matchesLetter;
  });
  const handleViewDetails = (product) => {
    setSelectedProduct({
      ...product,
      name: product.prod, // Match expected fields
      farmer: product.farmer,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setShowOfferModal(false);
  };

  const handleOpenModal = () => {
    setShowOfferModal(true);
  };

  // const handleCloseModal = () => {

  // };

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
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className='bg-white border border-gray-300 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col justify-between h-fit'
            >
              <img
                src={
                  item.image ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                } // fallback image
                alt={item.title}
                className='w-full h-40 md:h-52 object-cover rounded-lg mb-4'
              />
              <div className='flex flex-col gap-2 flex-grow'>
                <div>
                  <h3 className='text-lg md:text-xl font-semibold text-[#1E1E1E]'>
                    {item.prod || "No Title"}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {item.farmer || "Unknown"} • ⭐ {item.rating || 0}
                  </p>
                </div>
                <div className='flex justify-between text-sm text-gray-700'>
                  <div>
                    <p className='text-gray-500'>Quantity</p>
                    <p className='font-medium'>{item.quantity || "N/A"}</p>
                  </div>
                  <div>
                    <p className='text-gray-500'>Price</p>
                    <p className='font-medium'>{item.price || "N/A"}</p>
                  </div>
                </div>
              </div>
              <div className='mt-4 flex flex-col gap-2'>
                <button
                  className='flex-1 border border-[#3D8236] text-[#3D8236] rounded-full py-2 text-sm hover:bg-[#3D8236] hover:cursor-pointer hover:text-white transition'
                  onClick={() => handleViewDetails(item)}
                >
                  View Details
                </button>

                <button
                  className='bg-[#3D8236] hover:bg-[#2c7125] text-white px-4 py-2 rounded-full'
                  onClick={handleOpenModal}
                >
                  Make an Offer
                </button>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className='text-gray-500 col-span-full'>
              No products match your filters.
            </p>
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
      {showModal && selectedProduct && (
        <AddListingModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onMakeOffer={() => {
            console.log("Make offer clicked for:", selectedProduct);
            // Optionally toggle a MakeOffer modal or handle offer here
          }}
        />
      )}
      {showOfferModal && <MakeOffer onOff={handleCloseModal} />}
    </main>
  );
};

export default BuyersCollections;

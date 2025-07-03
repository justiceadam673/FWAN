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
import MakeOffer from "../modals/MakeOffer";
import { query, where } from "firebase/firestore";

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [activeFilter, setActiveFilter] = useState(""); // rating | harvested | notHarvested

  // useEffect(() => {
  //   const fetchListingsAndRatings = async () => {
  //     try {
  //       const listingsSnapshot = await getDocs(
  //         collection(db, "farmers_listings")
  //       );
  //       const newListings = [];
  //       const ratingsMap = {};

  //       for (const doc of listingsSnapshot.docs) {
  //         const listingData = doc.data();
  //         const listingId = doc.id;
  //         const farmer = listingData.farmer;

  //         newListings.push({ id: listingId, ...listingData });

  //         const reviewsSnapshot = await getDocs(
  //           collection(db, "farmers_listings", listingId, "reviews")
  //         );
  //         const reviews = reviewsSnapshot.docs.map((r) => r.data());

  //         if (!ratingsMap[farmer]) {
  //           ratingsMap[farmer] = [];
  //         }

  //         reviews.forEach((review) => {
  //           if (typeof review.rating === "number") {
  //             ratingsMap[farmer].push(review.rating);
  //           }
  //         });
  //       }

  //       const farmerRatings = {};
  //       for (const farmer in ratingsMap) {
  //         const ratings = ratingsMap[farmer];
  //         if (ratings.length === 0) {
  //           farmerRatings[farmer] = 0;
  //         } else {
  //           const avgRating =
  //             ratings.reduce((acc, r) => acc + r, 0) / ratings.length;
  //           farmerRatings[farmer] = Math.min(Math.max(avgRating, 1), 5).toFixed(
  //             1
  //           );
  //         }
  //       }

  //       const listingsWithRating = newListings.map((listing) => ({
  //         ...listing,
  //         rating: farmerRatings[listing.farmer] || 0,
  //       }));

  //       setListings(listingsWithRating);
  //     } catch (error) {
  //       console.error("Error fetching listings or reviews:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchListingsAndRatings();
  // }, []);

  useEffect(() => {
    const fetchListingsAndRatings = async () => {
      try {
        const listingsSnapshot = await getDocs(
          collection(db, "farmers_listings")
        );
        const newListings = [];
        const ratingsMap = {};

        for (const docSnap of listingsSnapshot.docs) {
          const listingData = docSnap.data();
          const listingId = docSnap.id;
          const farmer = listingData.farmer;

          // 🔢 Get total quantity from the listing (e.g., "20 kg")
          let [originalQty, unit] = (listingData.quantity || "0").split(" ");
          originalQty = parseFloat(originalQty) || 0;

          // 🔁 Fetch accepted/completed offers to calculate sold quantity
          let totalSold = 0;
          try {
            const offersSnapshot = await getDocs(
              query(
                collection(db, "offers"),
                where("listingId", "==", listingId),
                where("status", "in", ["Accepted", "Paid", "Completed"])
              )
            );
            totalSold = offersSnapshot.docs.reduce((sum, offerDoc) => {
              return sum + (parseFloat(offerDoc.data().quantity) || 0);
            }, 0);
          } catch (error) {
            console.log("Couldn't calculate sold quantity:", error);
          }

          const remainingQty = Math.max(0, originalQty - totalSold);

          // ⭐ Fetch average ratings
          const reviewsSnapshot = await getDocs(
            collection(db, "farmers_listings", listingId, "reviews")
          );
          const reviews = reviewsSnapshot.docs.map((r) => r.data());
          if (!ratingsMap[farmer]) ratingsMap[farmer] = [];
          reviews.forEach((review) => {
            if (typeof review.rating === "number") {
              ratingsMap[farmer].push(review.rating);
            }
          });

          newListings.push({
            id: listingId,
            ...listingData,
            rating: 0, // temporary, will be added later
            quantity: `${remainingQty} ${unit}`.trim(),
            isSoldOut: remainingQty === 0,
          });
        }

        // 🌟 Compute average ratings
        const farmerRatings = {};
        for (const farmer in ratingsMap) {
          const ratings = ratingsMap[farmer];
          const avgRating =
            ratings.length > 0
              ? (
                  ratings.reduce((sum, r) => sum + r, 0) / ratings.length
                ).toFixed(1)
              : 0;
          farmerRatings[farmer] = avgRating;
        }

        const listingsWithRatings = newListings.map((listing) => ({
          ...listing,
          rating: farmerRatings[listing.farmer] || 0,
        }));

        setListings(listingsWithRatings);
      } catch (error) {
        console.error("Error fetching listings or reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListingsAndRatings();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLetter, activeFilter]);

  if (!userData || loading) {
    return (
      <p className='flex place-self-center text-gray-900/70 text-[30px] animate-bounce'>
        Loading...
      </p>
    );
  }

  const filteredProducts = listings
    .filter((item) => {
      const title = item.prod || "";
      const matchesSearch = title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesLetter = selectedLetter
        ? title.toLowerCase().startsWith(selectedLetter.toLowerCase())
        : true;
      return matchesSearch && matchesLetter;
    })
    .sort((a, b) => {
      if (activeFilter === "rating") {
        return b.rating - a.rating; // High to low rating
      } else if (activeFilter === "harvested") {
        return parseFloat(b.price) - parseFloat(a.price); // Low to high price
      } else if (activeFilter === "notHarvested") {
        return (a.prod || "").localeCompare(b.prod || ""); // A-Z product title
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (product) => {
    setSelectedProduct({
      ...product,
      name: product.prod,
      farmer: product.farmer,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setShowOfferModal(false);
  };

  const handleOpenModal = (product) => {
    setSelectedProduct({
      ...product,
      name: product.prod,
      farmer: product.farmer,
    });
    setShowModal(false);
    setShowOfferModal(true);
  };

  return (
    <main className='px-4 lg:px-8 py-6'>
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
            className='w-full shadow-[4px_4px_2.5px_rgba(0,0,0,0.100)] bg-white rounded-full py-3 pl-12 pr-4 text-sm md:text-base focus:outline-none'
          />
        </div>
        <div className='flex flex-wrap justify-center md:justify-start gap-2 md:text-base'>
          <button
            className={`filter-button border border-gray-900/40 px-[10px] rounded-[8px] transition-all duration-[.5s] hover:text-[#2f6a2a] ${
              activeFilter === "rating" ? "text-[#2f6a2a]" : ""
            }`}
            onClick={() => setActiveFilter("rating")}
          >
            Rating
          </button>
          <button
            className={`filter-button border border-gray-900/40 px-[10px] rounded-[8px] transition-all duration-[.5s] hover:text-[#2f6a2a] ${
              activeFilter === "harvested" ? "text-[#2f6a2a]" : ""
            }`}
            onClick={() => setActiveFilter("harvested")}
          >
            Price
          </button>
          <button
            className={`filter-button border border-gray-900/40 px-[10px] rounded-[8px] transition-all duration-[.5s] hover:text-[#2f6a2a] ${
              activeFilter === "notHarvested" ? "text-[#2f6a2a]" : ""
            }`}
            onClick={() => setActiveFilter("notHarvested")}
          >
            A to Z
          </button>
        </div>
      </section>

      <section className='flex flex-col lg:flex-row gap-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 flex-1'>
          {paginatedProducts.map((item) => (
            <div
              key={item.id}
              className={`bg-white border border-gray-300 rounded-xl shadow transition p-4 flex flex-col justify-between h-fit ${
                item.isSoldOut ? "opacity-50" : ""
              }`}
            >
              <img
                src={
                  item.image ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={item.title}
                className='w-full h-40 md:h-52 object-cover rounded-lg mb-4'
              />
              <div className='flex flex-col gap-2 flex-grow'>
                <div>
                  <h3 className='text-lg md:text-xl font-semibold text-[#1E1E1E]'>
                    {item.prod || "No Title"}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {(item.farmer || "Unknown").split("@")[0]} • ⭐{" "}
                    {item.rating || 0}
                  </p>
                </div>
                <div className='flex justify-between text-sm text-gray-700'>
                  <div>
                    <p className='text-gray-500'>Quantity</p>
                    <p
                      className={`font-medium ${
                        item.isSoldOut ? "text-red-600 font-semibold" : ""
                      }`}
                    >
                      {item.isSoldOut ? "Sold Out" : item.quantity}
                    </p>
                  </div>
                  <div>
                    <p className='text-gray-500'>Price</p>
                    <p className='font-medium'>{item.price || "N/A"}</p>
                  </div>
                </div>
              </div>
              <div className='mt-4 flex flex-col gap-2'>
                {item.isSoldOut ? (
                  <button
                    className='border border-gray-400 text-gray-400 px-4 py-2 rounded-full cursor-not-allowed'
                    disabled
                  >
                    View Details
                  </button>
                ) : (
                  <button
                    className='flex-1 border border-[#3D8236] text-[#3D8236] rounded-full py-2 text-sm hover:bg-[#3D8236] hover:cursor-pointer hover:text-white transition'
                    onClick={() => handleViewDetails(item)}
                  >
                    View Details
                  </button>
                )}

                {/* <button
                  className='flex-1 border border-[#3D8236] text-[#3D8236] rounded-full py-2 text-sm hover:bg-[#3D8236] hover:cursor-pointer hover:text-white transition'
                  onClick={() => handleViewDetails(item)}
                >
                  View Details
                </button> */}
                {item.isSoldOut ? (
                  <button
                    className='bg-gray-400 text-white px-4 py-2 rounded-full cursor-not-allowed'
                    disabled
                  >
                    Sold Out
                  </button>
                ) : (
                  <button
                    className='bg-[#3D8236] hover:bg-[#2c7125] text-white px-4 py-2 rounded-full'
                    onClick={() => handleOpenModal(item)}
                  >
                    Make an Offer
                  </button>
                )}
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className='text-gray-500 col-span-full'>
              No products match your filters.
            </p>
          )}
        </div>

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

      {filteredProducts.length > itemsPerPage && (
        <div className='flex justify-center items-center gap-4 mt-6'>
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className='px-4 py-2 rounded-full bg-[#3D8236] text-white text-sm'
            >
              Previous
            </button>
          )}
          <span className='text-sm text-gray-700'>
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className='px-4 py-2 rounded-full bg-[#3D8236] text-white text-sm'
            >
              Next
            </button>
          )}
        </div>
      )}

      {showModal && selectedProduct && (
        <AddListingModal
          product={{ ...selectedProduct, id: selectedProduct.id }}
          onClose={handleCloseModal}
          onOff={handleCloseModal}
          onMakeOffer={() => setShowOfferModal(true)}
          hideContent={showOfferModal}
        />
      )}
      {showOfferModal && selectedProduct && (
        <MakeOffer
          product={selectedProduct}
          onOff={() => setShowOfferModal(false)}
        />
      )}
    </main>
  );
};

export default BuyersCollections;

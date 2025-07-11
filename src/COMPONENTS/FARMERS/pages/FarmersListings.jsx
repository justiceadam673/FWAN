import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { productList } from "../data/productsData";
import FarmersListingCard from "../components/FarmersListingCard";
import { db, auth, storage } from "../../../FireBaseConfig";
import uploadToImgBB from "../utils/uploadToImgBB";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";

const FarmersListings = () => {
  const [filter, setFilter] = useState("All");
  const [listings, setListings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const [newProduct, setNewProduct] = useState({
    product: "",
    defaultQuantity: "",
    quantity: "",
    price: "",
    tier: "Large",
    description: "",
    harvestDate: "",
  });

  useEffect(() => {
    const fetchListingsWithOffers = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        // 1. Fetch the user's listings
        const listingsQuery = query(
          collection(db, "farmers_listings"),
          where("userId", "==", user.uid)
        );
        const listingsSnapshot = await getDocs(listingsQuery);

        // 2. Process each listing with error handling
        const listingsData = await Promise.all(
          listingsSnapshot.docs.map(async (doc) => {
            try {
              const listing = doc.data();

              // 3. Calculate sold quantity from completed offers
              let totalSold = 0;
              try {
                const completedOffersQuery = query(
                  collection(db, "offers"),
                  where("listingId", "==", doc.id),
                  where("status", "in", ["Accepted", "Paid", "Completed"]),
                  where("farmerId", "==", user.uid)
                );
                const offersSnapshot = await getDocs(completedOffersQuery);
                totalSold = offersSnapshot.docs.reduce((sum, offerDoc) => {
                  return sum + (parseFloat(offerDoc.data().quantity) || 0);
                }, 0);
              } catch (error) {
                console.log("Couldn't calculate sold quantity:", error);
              }

              // 4. Get current quantity
              const [currentQty, unit] = listing.quantity.split(" ");
              const remainingQty = Math.max(
                0,
                parseFloat(currentQty) - totalSold
              );

              // 5. Count all offers for this listing
              let offersCount = 0;
              try {
                const offersQuery = query(
                  collection(db, "offers"),
                  where("listingId", "==", doc.id),
                  where("farmerId", "==", user.uid)
                );
                const offersSnapshot = await getDocs(offersQuery);
                offersCount = offersSnapshot.size;
              } catch (error) {
                console.log("Couldn't count offers:", error);
              }

              return {
                id: doc.id,
                ...listing,
                quantity: `${remainingQty} ${unit}`.trim(),
                status: remainingQty <= 0 ? "Sold Out" : listing.status,
                offers: offersCount,
              };
            } catch (error) {
              console.error("Error processing listing:", error);
              return null;
            }
          })
        );

        setListings(listingsData.filter(Boolean));
      } catch (error) {
        console.error("Error fetching listings:", error);
        toast.error("Failed to load listings. Please try again.");
      }
    };

    fetchListingsWithOffers();
  }, []);

  const handleProductChange = (product) => {
    const selected = productList[product];
    setNewProduct({
      ...newProduct,
      product,
      defaultQuantity: selected.quantity,
      quantity: "",
      price: selected.price,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "product",
      "quantity",
      "price",
      "tier",
      "description",
      "harvestDate",
    ];

    requiredFields.forEach((field) => {
      if (!newProduct[field]) newErrors[field] = "This field is required.";
    });

    if (newProduct.quantity) {
      if (isNaN(Number(newProduct.quantity))) {
        newErrors.quantity = "Quantity must be a number";
      } else if (Number(newProduct.quantity) <= 0) {
        newErrors.quantity = "Quantity must be greater than 0";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddListing = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Please log in to add a listing.");
      return;
    }

    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        imageUrl = await uploadToImgBB(imageFile, imgbbApiKey);
      }

      const listingData = {
        userId: user.uid,
        farmer: user.displayName || user.email,
        prod: newProduct.product,
        quantity: `${newProduct.quantity} ${
          newProduct.defaultQuantity.split(" ")[1] || ""
        }`.trim(),
        price: newProduct.price,
        tier: newProduct.tier,
        description: newProduct.description,
        harvestDate: newProduct.harvestDate,
        image: imageUrl,
        status: "In Stock",
        offers: 0, // Initialize with 0 offers
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(db, "farmers_listings"),
        listingData
      );

      setListings((prev) => [...prev, { id: docRef.id, ...listingData }]);

      toast.success("Listing added successfully!");
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error adding listing:", error);
      toast.error("Error adding listing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setNewProduct({
      product: "",
      defaultQuantity: "",
      quantity: "",
      price: "",
      tier: "Large",
      description: "",
      harvestDate: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setErrors({});
  };

  const handleRemoveListing = async (listingId) => {
    try {
      await deleteDoc(doc(db, "farmers_listings", listingId));
      setListings((prev) => prev.filter((item) => item.id !== listingId));
      toast.success("Listing removed successfully!");
    } catch (error) {
      console.error("Error removing listing:", error);
      toast.error("Failed to remove listing. Please try again.");
    }
  };

  const handleUpdateStatus = async (listingId, newStatus) => {
    try {
      await updateDoc(doc(db, "farmers_listings", listingId), {
        status: newStatus,
      });
      setListings((prev) =>
        prev.map((item) =>
          item.id === listingId ? { ...item, status: newStatus } : item
        )
      );
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  const filteredListings =
    filter === "All"
      ? listings
      : listings.filter((item) => {
          if (filter === "Sold Out") {
            const [quantity] = item.quantity.split(" ");
            return parseFloat(quantity) <= 0 || item.status === "Sold Out";
          }
          return item.status === filter;
        });

  return (
    <div className='w-full px-[58px]'>
      <Toaster position='top-right' />

      <section className='flex my-[28px] gap-[33px]'>
        <button
          onClick={() => setShowModal(true)}
          className='bg-[#69B645] rounded-[8px] text-white flex justify-center items-center gap-[19px] py-[8px] pr-[29px]'
        >
          <span className='bg-[#E8E4E4]/20 p-[6px] ml-[8px] flex justify-center rounded-[8px] items-center'>
            <Icon
              icon='line-md:plus'
              className='text-[#E8E4E4] w-[24px] h-[24px]'
            />
          </span>
          New Listing
        </button>
      </section>

      <div className='flex flex-wrap space-y-[10px] space-x-4 bg-green-100 py-[20px] rounded-t-[12px] px-[18px] mb-4 mt-4'>
        {["All", "In Stock", "Sold Out"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg ${
              filter === status
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-green-600/40 hover:text-black "
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className='grid gap-4'>
        {filteredListings.map((item) => (
          <FarmersListingCard
            key={item.id}
            id={item.id}
            image={item.image}
            quantityHeader='quantity'
            quantity={item.quantity}
            priceHeader='price'
            price={item.price}
            prodHeader='product'
            prod={item.prod}
            offersHeader='offers'
            offers={item.offers || 0}
            statusHeader='status'
            status={item.status}
            onRemove={() => handleRemoveListing(item.id)}
          />
        ))}
      </div>

      {showModal && (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4'>
          <div className='bg-white p-[40px] md:p-[60px] lg:p-[84px] font-[poppins] rounded-lg w-full max-w-[803px] h-[90%] space-y-4 overflow-auto'>
            {/* Modal content remains the same as before */}
            {showModal && (
              <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4'>
                <div className='bg-white p-[40px] md:p-[60px] lg:p-[84px] font-[poppins] rounded-lg w-full max-w-[803px] h-[90%] space-y-4 overflow-auto'>
                  <div className='flex justify-between font-[Kodchasan] items-center flex-wrap gap-2'>
                    <div>
                      <h2 className='text-[20px] md:text-[24px] font-semibold text-black/70'>
                        Add New Produce
                      </h2>
                      <p className='text-[#7C7A7A] text-[16px] md:text-[20px]'>
                        Fill in the details of your produce
                      </p>
                    </div>
                    <button onClick={() => setShowModal(false)}>
                      <Icon icon={"line-md:close"} width={28} height={28} />
                    </button>
                  </div>

                  {/* Form Fields */}
                  <div className='w-full flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
                    <section className='flex flex-col w-full md:w-[48%]'>
                      <label htmlFor='product'>Product</label>
                      <select
                        className='border p-[10px] rounded-[15px] w-full h-[60px] md:h-[70px] border-[#CFCFCF]'
                        value={newProduct.product}
                        onChange={(e) => handleProductChange(e.target.value)}
                      >
                        <option value=''>Select Product</option>
                        {Object.keys(productList).map((prod) => (
                          <option key={prod} value={prod}>
                            {prod}
                          </option>
                        ))}
                      </select>
                      {errors.product && (
                        <p className='text-red-500 text-sm'>{errors.product}</p>
                      )}
                    </section>

                    <section className='flex flex-col w-full md:w-[48%]'>
                      <label htmlFor='quantity'>Quantity</label>
                      <div className='relative'>
                        <input
                          type='number'
                          min='0'
                          step='0.01'
                          className='border p-[10px] rounded-[15px] w-full h-[60px] md:h-[70px] border-[#CFCFCF] pl-24'
                          value={newProduct.quantity}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              quantity: e.target.value,
                            })
                          }
                          placeholder='Enter quantity'
                        />
                        <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
                          {newProduct.defaultQuantity
                            ? newProduct.defaultQuantity.split(" ")[1] || ""
                            : ""}
                        </span>
                      </div>
                      {errors.quantity && (
                        <p className='text-red-500 text-sm'>
                          {errors.quantity}
                        </p>
                      )}
                    </section>
                  </div>

                  <div className='flex flex-col md:flex-row gap-[32px] md:gap-[72px] justify-between'>
                    <div className='relative w-full md:w-[48%]'>
                      <label htmlFor='price'>Product Price</label>
                      <input
                        id='price'
                        placeholder={newProduct.price || "Product Price"}
                        className='border p-[10px] rounded-[15px] w-full h-[60px] md:h-[70px] border-[#CFCFCF]'
                        // value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                          })
                        }
                      />
                      {errors.price && (
                        <p className='text-red-500 text-sm'>{errors.price}</p>
                      )}
                    </div>

                    <div className='w-full md:w-[48%]'>
                      <label htmlFor='date'>Harvest Date</label>
                      <input
                        type='date'
                        id='date'
                        className='border p-[10px] rounded-[15px] w-full h-[60px] md:h-[70px] border-[#CFCFCF]'
                        value={newProduct.harvestDate}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            harvestDate: e.target.value,
                          })
                        }
                      />
                      {errors.harvestDate && (
                        <p className='text-red-500 text-sm'>
                          {errors.harvestDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <textarea
                    placeholder='Produce Description'
                    className='border p-[10px] rounded-[15px] w-full h-[150px] md:h-[162px] border-[#CFCFCF]'
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                  />
                  {errors.description && (
                    <p className='text-red-500 text-sm'>{errors.description}</p>
                  )}

                  <div className='flex flex-col md:flex-row justify-between gap-[20px]'>
                    <select
                      className='border p-[10px] rounded-[15px] w-full h-[60px] md:h-[70px] border-[#CFCFCF]'
                      value={newProduct.tier}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, tier: e.target.value })
                      }
                    >
                      <option value='Large'>Large</option>
                      <option value='Medium'>Medium</option>
                      <option value='Small'>Small</option>
                    </select>
                    {errors.tier && (
                      <p className='text-red-500 text-sm'>{errors.tier}</p>
                    )}

                    <div className='flex flex-col w-full'>
                      <input
                        type='file'
                        accept='image/*'
                        className='border p-[10px] rounded-[15px] h-[140px] md:h-[167px] border-[#CFCFCF]'
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setImageFile(file);
                            setImagePreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt='Preview'
                          className='mt-2 h-32 object-cover rounded-lg'
                        />
                      )}
                    </div>
                  </div>

                  <div className='w-full flex flex-col md:flex-row justify-end gap-[10px] md:gap-[20px]'>
                    <button
                      onClick={() => setShowModal(false)}
                      className='border border-[#CFCFCF] text-[#CFCFCF] py-2 px-4 rounded w-full md:w-auto'
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddListing}
                      disabled={isLoading}
                      className={`${
                        isLoading ? "bg-gray-400" : "bg-green-600"
                      } text-white py-2 px-4 rounded w-full md:w-auto flex items-center justify-center gap-2`}
                    >
                      {isLoading && (
                        <span className='animate-spin rounded-full h-4 w-4 border-t-2 border-white border-solid'></span>
                      )}
                      {isLoading ? "Uploading..." : "Add Listing"}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* ... */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmersListings;

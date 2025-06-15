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
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";

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
    quantity: "",
    price: "",
    tier: "Large",
    description: "",
    harvestDate: "",
  });

  useEffect(() => {
    const fetchListings = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const q = query(
        collection(db, "farmers_listings"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListings(data);
    };

    fetchListings();
  }, []);

  const handleProductChange = (product) => {
    const selected = productList[product];
    setNewProduct({
      ...newProduct,
      product,
      quantity: selected.quantity,
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
      toast.error("Please fill in all required fields.");
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
        quantity: newProduct.quantity,
        price: newProduct.price,
        tier: newProduct.tier,
        description: newProduct.description,
        harvestDate: newProduct.harvestDate,
        image: imageUrl,
        status: "In Stock",
        offers: "0",
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(db, "farmers_listings"),
        listingData
      );
      setListings((prev) => [...prev, { id: docRef.id, ...listingData }]);

      toast.success("Listing added successfully!");

      setShowModal(false);
      setNewProduct({
        product: "",
        quantity: "",
        price: "",
        tier: "Large",
        description: "",
        harvestDate: "",
      });
      setImageFile(null);
      setImagePreview(null);
      setErrors({});
    } catch (error) {
      console.error("Error adding listing:", error);
      toast.error("Error adding listing. Check console.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleRemoveListing = async (listingId) => {
    try {
      await deleteDoc(doc(db, "farmers_listings", listingId));
      setListings((prev) => prev.filter((item) => item.id !== listingId));
      toast.success("Listing removed successfully!");
    } catch (error) {
      console.error("Error removing listing:", error);
      toast.error("Failed to remove listing.");
    }
  };

  const filteredListings =
    filter === "All"
      ? listings
      : listings.filter((item) => item.status === filter);

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

      <div className='flex flex-wrap space-y-[10px]  space-x-4 bg-green-100 py-[20px] rounded-t-[12px] px-[18px] mb-4 mt-4'>
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
            image={item.image}
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
            onRemove={() => handleRemoveListing(item.id)} // 👈 This enables deletion
          />
        ))}
      </div>

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
                <input
                  className='border p-[10px] rounded-[15px] w-full h-[60px] md:h-[70px] border-[#CFCFCF]'
                  value={newProduct.quantity}
                  readOnly
                  placeholder='Quantity'
                />
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
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
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
              </div>
            </div>
            {errors.harvestDate && (
              <p className='text-red-500 text-sm'>{errors.harvestDate}</p>
            )}

            <textarea
              placeholder='Produce Description'
              className='border p-[10px] rounded-[15px] w-full h-[150px] md:h-[162px] border-[#CFCFCF]'
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
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
    </div>
  );
};

export default FarmersListings;

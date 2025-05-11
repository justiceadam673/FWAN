import React, { useState } from "react";
import { farmData } from "../data/FarmData";

const AddListingModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    harvestDate: "",
    price: "",
    description: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result, // base64 image data
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const newListing = {
      id: farmData.length + 1,
      name: formData.name,
      author: "Your Farm Name", // replace or make dynamic
      rating: 0,
      location: "Your farm location", // optional
      harvestDate: formData.harvestDate,
      availableUntil: "N/A", // or calculate dynamically
      quantity: formData.quantity,
      price: formData.price,
      image: formData.image,
      farmer: "Logged In Farmer", // replace as needed
      description: formData.description,
      reviews: [],
    };

    farmData.push(newListing); // 🧠 push to farmData
    alert("Produce listing added!");
    onClose(); // close modal
  };

  return (
    <div className='fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-xl w-[90%] max-w-xl shadow-lg space-y-4'>
        <h2 className='text-xl font-bold'>Add New Produce List</h2>

        <input
          type='text'
          name='name'
          placeholder='e.g. Avocados'
          onChange={handleInputChange}
          className='w-full border p-2 rounded'
        />

        <input
          type='text'
          name='quantity'
          placeholder='e.g. 50 kg'
          onChange={handleInputChange}
          className='w-full border p-2 rounded'
        />

        <input
          type='date'
          name='harvestDate'
          onChange={handleInputChange}
          className='w-full border p-2 rounded'
        />

        <input
          type='text'
          name='price'
          placeholder='e.g. ₦20,00 per kg'
          onChange={handleInputChange}
          className='w-full border p-2 rounded'
        />

        <textarea
          name='description'
          placeholder='Describe your product...'
          onChange={handleInputChange}
          className='w-full border p-2 rounded'
        ></textarea>

        <input
          type='file'
          accept='image/*'
          onChange={handleImageUpload}
          className='block'
        />

        <div className='flex justify-between pt-4'>
          <button onClick={onClose} className='px-4 py-2 border rounded'>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-green-600 text-white rounded'
          >
            Add Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddListingModal;

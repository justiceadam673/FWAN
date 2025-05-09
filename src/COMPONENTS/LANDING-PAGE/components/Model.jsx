import React, { useState } from "react";
import Img from "../../../assets/img/fwan.png";

export default function ProduceListForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='p-6'>
      {/* Add Listing Button */}
      <button
        onClick={openModal}
        className='bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800'
      >
        Add Listing
      </button>
      {/* Produce List */}
      <div className='mt-4'>
        <h2 className='text-lg font-bold'>Your Produce List</h2>
        <table className='min-w-full border-none mt-2'>
          <thead>
            <tr className='border-b-none'>
              <th className=' p-2 text-left'>Produce</th>
              <th className=' p-2 text-left'>Quantity</th>
              <th className=' p-2 text-left'>Price per Unit</th>
              <th className=' p-2 text-left'>Offer</th>
              <th className=' p-2 text-left'>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border-b flex items-end-safe gap-5 p-2'>
                <img src={Img} className='border w-[100px] aspect-auto' />
                <p>Avocados</p>
              </td>
              <td className='border-b p-2'>50 kg</td>
              <td className='border-b p-2'>₦20.00 per kg</td>
              <td className='border-b p-2'>5</td>
              <td className='border-b p-2'>2023-10-01</td>
            </tr>
            <tr>
              <td className='border-b flex items-end-safe gap-5 p-2'>
                <img src={Img} className='border w-[100px] aspect-auto' />
                <p>Tomatoes</p>
              </td>
              <td className='border-b p-2'>100 kg</td>
              <td className='border-b p-2'>₦15.00 per kg</td>
              <td className='border-b p-2'>1</td>
              <td className='border-b p-2'>2023-10-05</td>
            </tr>
            <tr>
              <td className='border-b flex items-end-safe gap-5 p-2'>
                <img src={Img} className='border w-[100px] aspect-auto' />
                <p>Carrots</p>
              </td>
              <td className='border-b p-2'>200 kg</td>
              <td className='border-b p-2'>₦10.00 per kg</td>
              <td className='border-b p-2'>7</td>
              <td className='border-b p-2'>2023-10-10</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black/60 bg-opacity-70 flex items-center justify-center z-50'>
          <div className='bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative'>
            {/* Close icon */}
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 text-xl'
            >
              &times;
            </button>

            <h2 className='text-xl font-bold mb-2'>Add New Produce List</h2>
            <p className='text-sm text-gray-600 mb-4'>
              Fill in the details about your produce to create new listing.
            </p>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium'>
                  Produce Name
                </label>
                <input
                  type='text'
                  placeholder='e.g. Avocados'
                  className='w-full border p-2 rounded mt-1'
                />
              </div>
              <div>
                <label className='block text-sm font-medium'>Quantity</label>
                <input
                  type='text'
                  placeholder='e.g 50 kg'
                  className='w-full border p-2 rounded mt-1'
                />
              </div>
              <div>
                <label className='block text-sm font-medium'>
                  Harvest Date
                </label>
                <input type='date' className='w-full border p-2 rounded mt-1' />
              </div>
              <div>
                <label className='block text-sm font-medium'>
                  Price per Unit
                </label>
                <input
                  type='text'
                  placeholder='e.g. ₦20.00 per kg'
                  className='w-full border p-2 rounded mt-1'
                />
              </div>
            </div>

            <div className='mt-4'>
              <label className='block text-sm font-medium'>
                Product Description
              </label>
              <textarea
                className='w-full border p-2 rounded mt-1'
                rows='3'
                placeholder='Describe your product, including quality and harvest date'
              ></textarea>
            </div>

            <div className='mt-4'>
              <label className='block text-sm font-medium'>
                Product Picture
              </label>
              <input type='file' className='mt-1' />
            </div>

            {/* Action Buttons */}
            <div className='mt-6 flex justify-end space-x-2'>
              <button
                onClick={closeModal}
                className='px-4 py-2 border rounded-md text-gray-700'
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className='px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800'
              >
                Add Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

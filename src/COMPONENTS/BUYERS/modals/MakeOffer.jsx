import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { db, auth } from "../../../FireBaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const MakeOffer = ({ product, onOff }) => {
  // const [offerPrice, setOfferPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const productPrice = product?.price
    ? parseFloat(product.price.replace(/,/g, ""))
    : 0;
  const calculatedPrice = quantity
    ? (productPrice * parseFloat(quantity)).toFixed(2)
    : "";

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to make an offer.");
      return;
    }

    if (!offerPrice || !quantity) {
      alert("Please fill in all fields.");
      return;
    }

    const newOffer = {
      listingId: product.id,
      farmerId: product.userId, // ensure `userId` is present in listing doc
      buyerId: user.uid,
      offerPrice: calculatedPrice,
      quantity: parseInt(quantity),
      status: "pending",
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "offers"), newOffer);
      alert("Offer sent successfully!");
      onOff(); // close the modal
    } catch (error) {
      console.error("Error sending offer:", error);
      alert("Failed to send offer.");
    }
  };

  return (
    <main className='fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50'>
      <section className='w-full md:w-fit h-full md:h-fit bg-white p-[30px] md:rounded-xl 2xl:text-[24px] xl:text-[20px] lg:text-[18px] text-[15px] shadow-xl relative'>
        <div className='flex justify-end'>
          <button
            className='hover:cursor-pointer hover:bg-gray-100 p-[10px] rounded-[10px]'
            onClick={onOff}
          >
            <Icon
              icon='carbon:close'
              width='35'
              height='35'
              className='text-[#1D8338] hover:rotate-90 transition-all duration-[.5s]'
            />
          </button>
        </div>

        <form className='flex flex-col text-[15px] gap-5'>
          <h1 className='text-[30px] font-[poppins] font-medium'>
            Make An Offer
          </h1>

          <div className='md:flex gap-[20px] items-center'>
            <div className='flex flex-col'>
              <label htmlFor='quantity'>Quantity</label>
              <input
                type='number'
                id='quantity'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className='border focus:outline-none rounded-[12px] max-w-[313px] p-[10px]'
                placeholder='e.g. 5 kg'
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='price'>Total Price</label>
              <input
                type='text'
                id='price'
                value={
                  calculatedPrice
                    ? `₦${Number(calculatedPrice).toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                      })}`
                    : ""
                }
                readOnly
                className='border bg-gray-100 focus:outline-none rounded-[12px] max-w-[313px] p-[10px] text-black'
                placeholder='e.g. ₦2,000'
              />
            </div>
          </div>

          {productPrice && (
            <p className='text-sm text-gray-500 mt-[-10px]'>
              Unit Price: ₦{productPrice.toLocaleString()} per unit
            </p>
          )}

          <div className='flex flex-col gap-5'>
            <div className='flex flex-col'>
              <label htmlFor='deliverylocation'>Delivery Location</label>
              <input
                type='text'
                id='deliverylocation'
                className='border focus:outline-none rounded-[12px] p-[10px]'
                placeholder='e.g. Ahmadu Bello way'
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='deliverydate'>Preferred Delivery Date</label>
              <input
                type='date'
                id='deliverydate'
                className='border focus:outline-none rounded-[12px] p-[10px]'
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='message'>Message to Farmer</label>
              <textarea
                name='message'
                id='message'
                className='border focus:outline-none text-black rounded-[12px] h-[70px] p-[10px]'
                placeholder='Includes delivery preferences, time, etc.'
              ></textarea>
            </div>
          </div>

          <div className='flex gap-10 justify-end'>
            <button
              onClick={onOff}
              className='border p-[10px] rounded-[12px] hover:bg-[#1a6d43]/60 hover:cursor-pointer hover:text-white border-black/25'
            >
              Cancel
            </button>
            <button
              type='button'
              className='bg-[#095C32] hover:bg-[#1a6d43]/60 hover:cursor-pointer rounded-[12px] p-[10px] text-white'
            >
              Submit Offer
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default MakeOffer;

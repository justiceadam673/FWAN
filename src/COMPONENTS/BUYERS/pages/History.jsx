import React from "react";
import { farmData } from "../data/FarmData";

const Listing = () => {
  const simulatedOrders = farmData.slice(0, 5).map((item, index) => {
    const day = new Date(item.harvestDate).getDate();
    return {
      orderId: `ORD-${String(day).padStart(2, "0")}-${String(
        index + 1
      ).padStart(3, "0")}`,
      product: item.name,
      farmer: item.farmer,
      quantity: item.quantity,
      totalPrice: calculateTotalPrice(item.price, item.quantity),
      purchaseDate: item.harvestDate,
      status: index % 2 === 0 ? "Delivered" : "In transit",
    };
  });

  function calculateTotalPrice(pricePerKg, quantityStr) {
    const numericPrice = parseInt(pricePerKg.replace(/\D/g, ""), 10);
    const numericQuantity = parseInt(quantityStr, 10);
    return `₦${(numericPrice * numericQuantity).toLocaleString()}`;
  }

  return (
    <div>
      <section className='flex h-full items-center justify-between mt-[23px]'>
        <div className='space-y-[20px]'>
          <h1 className='text-black font-inter text-[24px] md:text-[34px] lg:text-[44px] xl:text-[54px] 2xl:text-[64px] font-bold leading-none'>
            Welcome Grace!
          </h1>
          <h3 className='text-black font-inter text-[14px] lg:text-[16px] font-normal leading-normal'>
            Good to see you again, Grace! Let’s get started
          </h3>
        </div>
        <div className='flex flex-col justify-center items-center gap-[clamp(6px,1.5vw,10px)] p-[clamp(10px,4vw,31px)] rounded-full bg-[#1D8338]'>
          <p className='text-black font-inter text-[clamp(24px,4vw,48px)] font-bold leading-normal'>
            SG
          </p>
        </div>
      </section>

      <section className='outline flex flex-col gap-[46px] rounded-[12px] outline-black/50 lg:mt-[80px] mt-[68px] md:mt-[68px] p-[30px]'>
        <div>
          <div className='mb-[10px] lg:mb-[0px]'>
            <h3 className='text-black font-black font-inter text-[20px] lg:text-[42px] md:text-[32px] mb-[20px] leading-none'>
              Purchase History
            </h3>
            <p className='text-[14px] lg:text-[20px]'>View your purchase</p>
          </div>

          <table className='min-w-full  text-left text-sm'>
            <thead className='border-b font-medium text-gray-700'>
              <tr>
                <th className='px-4 py-2'>Order ID</th>
                <th className='px-4 py-2'>Product</th>
                <th className='px-4 py-2'>Farmer</th>
                <th className='px-4 py-2'>Quantity</th>
                <th className='px-4 py-2'>Total Price</th>
                <th className='px-4 py-2'>Purchase Date</th>
                <th className='px-4 py-2'>Status</th>
              </tr>
            </thead>
            <tbody>
              {simulatedOrders.map((order, index) => (
                <tr key={index} className='border-t'>
                  <td className='px-4 py-3'>{order.orderId}</td>
                  <td className='px-4 py-3'>{order.product}</td>
                  <td className='px-4 py-3'>{order.farmer}</td>
                  <td className='px-4 py-3'>{order.quantity}</td>
                  <td className='px-4 py-3'>{order.totalPrice}</td>
                  <td className='px-4 py-3'>{order.purchaseDate}</td>
                  <td className='px-4 py-3'>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Listing;

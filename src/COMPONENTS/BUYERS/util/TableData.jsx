import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import MakeOffer from "../modals/MakeOffer";

const TableData = ({ product, data }) => {
  // Generate random initial statuses only once
  const generateInitialStatuses = () => {
    const options = ["Accepted", "Pending", "Rejected"];
    return data.reduce((acc, item) => {
      const randomStatus = options[Math.floor(Math.random() * options.length)];
      acc[item.id] = randomStatus;
      return acc;
    }, {});
  };

  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    setStatusMap(generateInitialStatuses());
  }, [data]);

  const handleStatusChange = (id, newStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  const [makeOffer, setMakeOffer] = useState(false);

  return (
    <div>
      <section className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-md'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='py-3 px-6 text-left font-semibold text-gray-700'>
                Farmer
              </th>
              <th className='py-3 px-6 text-left font-semibold text-gray-700'>
                Product
              </th>
              <th className='py-3 px-6 text-left font-semibold text-gray-700'>
                Quantity
              </th>
              <th className='py-3 px-6 text-left font-semibold text-gray-700'>
                Price Offered
              </th>
              <th className='py-3 px-6 text-left font-semibold text-gray-700'>
                Total Value
              </th>
              <th className='py-3 px-6 text-left font-semibold text-gray-700'>
                Date
              </th>
              <th className='py-3 px-6 text-left font-semibold text-gray-700'>
                Status
              </th>
              <th className='py-3 px-6 text-left font-semibold text-gray-700'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ""));
              const numericQuantity = parseInt(
                item.quantity.replace(/[^0-9]/g, "")
              );
              const totalValue = numericPrice * numericQuantity;

              const currentStatus = statusMap[item.id];

              return (
                <tr key={item.id} className='bg-gray-50'>
                  <td className='py-3 px-6 text-left text-gray-700'>
                    {item.farmer}
                  </td>
                  <td className='py-3 px-6 text-left text-gray-700'>
                    {item.name}
                  </td>
                  <td className='py-3 px-6 text-left text-gray-700'>
                    {item.quantity}
                  </td>
                  <td className='py-3 px-6 text-left text-gray-700'>
                    {item.price}
                  </td>
                  <td className='py-3 px-6 text-left text-gray-700'>
                    ₦{totalValue.toLocaleString()}
                  </td>
                  <td className='py-3 px-6 text-left text-gray-700'>
                    {item.harvestDate}
                  </td>
                  <td
                    className={`py-3 px-6 text-left font-semibold ${
                      currentStatus === "Accepted"
                        ? "text-green-600"
                        : currentStatus === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {currentStatus}
                  </td>
                  <td className='py-3 px-6 text-left text-gray-700'>
                    {currentStatus === "Accepted" ? (
                      <div className='  bg-[#168B2B] text-white w-fit px-3 py-1 rounded'>
                        <p>Completed Offer</p>
                      </div>
                    ) : currentStatus === "Rejected" ? (
                      <button
                        onClick={() => setMakeOffer(true)}
                        className='border border-black flex justify-center items-center gap-[10px] text-black w-fit px-3 py-1 rounded'
                      >
                        Make More Offer
                      </button>
                    ) : (
                      <div className='flex gap-2 items-center'>
                        <button
                          onClick={() =>
                            handleStatusChange(item.id, "Accepted")
                          }
                          className='border flex justify-center items-center gap-[10px] border-[#168B2B] text-[#168B2B] w-fit px-3 py-1 rounded'
                        >
                          <Icon
                            icon='fluent-mdl2:accept'
                            width='16'
                            height='16'
                            className='text-[#1D8338]'
                          />
                          Accept
                        </button>
                        <span className='text-gray-500'>or</span>
                        <button
                          onClick={() =>
                            handleStatusChange(item.id, "Rejected")
                          }
                          className='border border-[#C71313] flex justify-center items-center gap-[10px] text-[#C71313] w-fit px-3 py-1 rounded'
                        >
                          <Icon
                            icon='iconamoon:trash'
                            width='16'
                            height='16'
                            className='text-[#C71313]'
                          />
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      {makeOffer && (
        <MakeOffer product={product} onOff={() => setMakeOffer(false)} />
      )}{" "}
    </div>
  );
};

export default TableData;

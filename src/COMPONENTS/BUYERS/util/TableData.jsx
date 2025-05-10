import React from "react";

const TableData = () => {
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
            <tr className='bg-gray-50'>
              <td className='py-3 px-6 text-left text-gray-700'>Dove Lilia</td>
              <td className='py-3 px-6 text-left text-gray-700'>Avocados</td>
              <td className='py-3 px-6 text-left text-gray-700'>2 kg</td>
              <td className='py-3 px-6 text-left text-gray-700'>₦17,000</td>
              <td className='py-3 px-6 text-left text-gray-700'>₦34,000</td>
              <td className='py-3 px-6 text-left text-gray-700'>2025-05-10</td>
              <td className='py-3 px-6 text-left text-green-600'>Accepted</td>
              <td className='py-3 px-6 text-left text-gray-700'>
                buttons here
              </td>
            </tr>
            <tr className='bg-gray-50'>
              <td className='py-3 px-6 text-left text-gray-700'>Nice Cave</td>
              <td className='py-3 px-6 text-left text-gray-700'>Tomatoes</td>
              <td className='py-3 px-6 text-left text-gray-700'>4 kg</td>
              <td className='py-3 px-6 text-left text-gray-700'>₦19,000</td>
              <td className='py-3 px-6 text-left text-gray-700'>₦76,000</td>
              <td className='py-3 px-6 text-left text-gray-700'>10-0 5-25</td>
              <td className='py-3 px-6 text-left text-yellow-600'>Pending</td>
              <td className='py-3 px-6 text-left text-gray-700'>
                buttons here
              </td>
            </tr>
            <tr className='bg-gray-50'>
              <td className='py-3 px-6 text-left text-gray-700'>Josh Dave</td>
              <td className='py-3 px-6 text-left text-gray-700'>
                Bell Peppers
              </td>
              <td className='py-3 px-6 text-left text-gray-700'>3 kg</td>
              <td className='py-3 px-6 text-left text-gray-700'>₦18,000</td>
              <td className='py-3 px-6 text-left text-gray-700'>₦54,000</td>
              <td className='py-3 px-6 text-left text-gray-700'>09-0 5-25</td>
              <td className='py-3 px-6 text-left text-red-600'>Rejected</td>
              <td className='py-3 px-6 text-left text-gray-700'>
                buttons here
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default TableData;

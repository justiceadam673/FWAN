import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";
import FarmersOfferTable from "../utils/FarmersOfferTable";

const FarmersOffers = () => {
  const [offers, setOffers] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const fetchOffers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "offers"));
      const offersData = querySnapshot.docs.map((doc, index) => {
        const data = doc.data();
        let date = data.date;

        if (date?.seconds) {
          date = new Date(date.seconds * 1000);
        } else if (typeof date === "string") {
          date = new Date(date);
        } else {
          date = new Date(0); // fallback
        }

        return {
          id: index + 1,
          ...data,
          date, // always store as JavaScript Date
        };
      });

      setOffers(offersData);

      const newStatusMap = {};
      offersData.forEach((item) => {
        newStatusMap[item.id] = statusMap[item.id] || "Pending";
      });
      setStatusMap(newStatusMap);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
    const checkScreen = () => setIsMobile(window.innerWidth < 1280);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  const getSortedOffers = () => {
    const sorted = [...offers].sort((a, b) => {
      switch (sortBy) {
        case "date":
          return b.date - a.date;
        case "price":
          return (
            parseFloat(b.priceOffered || 0) - parseFloat(a.priceOffered || 0)
          );
        case "status":
          return (statusMap[a.id] || "").localeCompare(statusMap[b.id] || "");
        case "buyer":
          return (a.buyerName || "").localeCompare(b.buyerName || "");
        case "product":
          return (a.product || "")
            .toLowerCase()
            .localeCompare((b.product || "").toLowerCase());
        default:
          return 0;
      }
    });
    return sorted;
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-bold'>Offers</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className='border px-4 py-2 rounded text-gray-700'
        >
          <option value=''>Sort by</option>
          <option value='date'>Date</option>
          <option value='price'>Price Offered</option>
          <option value='status'>Status</option>
          <option value='buyer'>Buyer Name</option>
          <option value='product'>Product</option>
        </select>
      </div>

      {/* Desktop Table */}
      {!isMobile && (
        <div className='overflow-x-auto'>
          <table className='w-full border border-gray-300'>
            <thead className='bg-gray-100'>
              <tr className='text-[#888888] font-[poppins]'>
                <th className='p-2 font-normal'>N/S</th>
                <th className='p-2 font-normal'>Buyer</th>
                <th className='p-2 font-normal'>Product</th>
                <th className='p-2 font-normal'>Quantity</th>
                <th className='p-2 font-normal'>Price Offered</th>
                <th className='p-2 font-normal'>Total Value</th>
                <th className='p-2 font-normal'>Date</th>
                <th className='p-2 font-normal'>Status</th>
                <th className='p-2 font-normal'>Action</th>
              </tr>
            </thead>
            <tbody>
              {getSortedOffers().map((offer, index) => (
                <FarmersOfferTable
                  key={index}
                  offer={offer}
                  status={statusMap[offer.id]}
                  onStatusChange={handleStatusChange}
                  isMobile={false}
                  onMakeOffer={() => alert("Make more offer clicked")}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile View */}
      {isMobile && (
        <div className='grid gap-4'>
          {getSortedOffers().map((offer, index) => (
            <FarmersOfferTable
              key={index}
              offer={offer}
              status={statusMap[offer.id]}
              onStatusChange={handleStatusChange}
              isMobile={true}
              onMakeOffer={() => alert("Make more offer clicked")}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmersOffers;

import React, { useEffect, useState, useMemo } from "react";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";
import FarmersOfferTable from "../utils/FarmersOfferTable";

const FarmersOffers = () => {
  const [offers, setOffers] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "offers"),
      (querySnapshot) => {
        const offersData = querySnapshot.docs.map((docSnap, index) => {
          const data = docSnap.data();
          let date = data.date;

          if (date?.seconds) {
            date = new Date(date.seconds * 1000);
          } else if (typeof date === "string") {
            date = new Date(date);
          } else {
            date = new Date(0);
          }

          return {
            docId: docSnap.id,
            id: index + 1,
            ...data,
            date,
          };
        });

        setOffers(offersData);

        const newStatusMap = {};
        offersData.forEach((item) => {
          newStatusMap[item.id] = item.deliveryStatus || "Pending";
        });
        setStatusMap(newStatusMap);
      }
    );

    const checkScreen = () => setIsMobile(window.innerWidth < 1280);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => {
      window.removeEventListener("resize", checkScreen);
      unsubscribe();
    };
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const offer = offers.find((offer) => offer.id === id);
    if (!offer) return;

    const confirmMsg = `Are you sure you want to mark this offer as '${newStatus}'?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      await updateDoc(doc(db, "offers", offer.docId), {
        deliveryStatus: newStatus,
      });
      setStatusMap((prev) => ({
        ...prev,
        [id]: newStatus,
      }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
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

  const statusCounts = useMemo(() => {
    const counts = {
      all: offers.length,
      accepted: 0,
      rejected: 0,
      pending: 0,
    };

    Object.values(statusMap).forEach((status) => {
      if (status === "Accepted") counts.accepted++;
      else if (status === "Rejected") counts.rejected++;
      else counts.pending++;
    });

    return counts;
  }, [offers, statusMap]);

  return (
    <div className='p-6'>
      <div className='lg:flex justify-between  bg-[#F1E7E7] py-[15px] px-[20px] rounded-t-[20px] items-center mb-4'>
        <div className='lg:flex hidden space-y-[20px]  gap-[30px] justify-center items-start'>
          <p className='flex items-center  gap-1'>
            All
            <span className='text-white text-sm px-[6px] rounded-full bg-[#b3261e]'>
              {statusCounts.all}
            </span>
          </p>
          <p className='flex items-center gap-1'>
            Accepted
            <span className='text-white text-sm px-[6px] rounded-full bg-green-600'>
              {statusCounts.accepted}
            </span>
          </p>
          <p className='flex items-center gap-1'>
            Rejected
            <span className='text-white text-sm px-[6px] rounded-full bg-red-600'>
              {statusCounts.rejected}
            </span>
          </p>
          <p className='flex items-center gap-1'>
            Pending
            <span className='text-white text-sm px-[6px] rounded-full bg-yellow-500'>
              {statusCounts.pending}
            </span>
          </p>
          <p className='flex items-center gap-1'>
            Listings
            <span className='text-white text-sm px-[6px] rounded-full bg-blue-500'>
              {offers.length}
            </span>
          </p>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className='w-[203px] bg-white rounded-[12px] px-4 py-2 text-gray-700'
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

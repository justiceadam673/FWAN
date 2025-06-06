import React, { useEffect, useState, useMemo } from "react";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";
import FarmersOfferTable from "../utils/FarmersOfferTable";
import { getAuth } from "firebase/auth";

const FarmersOffers = () => {
  const [offers, setOffers] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = onSnapshot(collection(db, "offers"), (snapshot) => {
      const offersData = snapshot.docs
        .map((docSnap, index) => {
          const data = docSnap.data();
          if (!data.farmerId || data.farmerId !== currentUser.uid) return null;

          let date = data.date?.seconds
            ? new Date(data.date.seconds * 1000)
            : typeof data.date === "string"
            ? new Date(data.date)
            : new Date(0);

          return {
            docId: docSnap.id,
            id: index + 1,
            ...data,
            date,
          };
        })
        .filter(Boolean);

      setOffers(offersData);

      const newStatusMap = {};
      offersData.forEach((item) => {
        newStatusMap[item.id] = item.deliveryStatus || "Pending";
      });
      setStatusMap(newStatusMap);
    });

    const checkScreen = () => setIsMobile(window.innerWidth < 1280);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => {
      window.removeEventListener("resize", checkScreen);
      unsubscribe();
    };
  }, [currentUser]);

  const handleStatusChange = async (id, newStatus) => {
    const offer = offers.find((o) => o.id === id);
    if (!offer) return;

    const confirmMsg = `Are you sure you want to mark this offer as '${newStatus}'?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      await updateDoc(doc(db, "offers", offer.docId), {
        deliveryStatus: newStatus,
      });
      setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getSortedOffers = () => {
    return [...offers].sort((a, b) => {
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
  };

  const statusCounts = useMemo(() => {
    const counts = { all: offers.length, accepted: 0, rejected: 0, pending: 0 };
    Object.values(statusMap).forEach((status) => {
      if (status === "Accepted") counts.accepted++;
      else if (status === "Rejected") counts.rejected++;
      else counts.pending++;
    });
    return counts;
  }, [offers, statusMap]);

  return (
    <div className='p-4 sm:p-6'>
      <div className='bg-[#F1E7E7] py-3 px-4 rounded-t-2xl mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        <div className='flex gap-4 overflow-x-auto text-sm font-medium'>
          <p className='flex items-center gap-1'>
            All
            <span className='text-white text-xs px-2 py-0.5 rounded-full bg-[#b3261e]'>
              {statusCounts.all}
            </span>
          </p>
          <p className='flex items-center gap-1'>
            Accepted
            <span className='text-white text-xs px-2 py-0.5 rounded-full bg-green-600'>
              {statusCounts.accepted}
            </span>
          </p>
          <p className='flex items-center gap-1'>
            Rejected
            <span className='text-white text-xs px-2 py-0.5 rounded-full bg-red-600'>
              {statusCounts.rejected}
            </span>
          </p>
          <p className='flex items-center gap-1'>
            Pending
            <span className='text-white text-xs px-2 py-0.5 rounded-full bg-yellow-500'>
              {statusCounts.pending}
            </span>
          </p>
        </div>

        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='w-full sm:w-[203px] bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-700'
          >
            <option value=''>Sort by</option>
            <option value='date'>Date</option>
            <option value='price'>Price Offered</option>
            <option value='status'>Status</option>
            <option value='buyer'>Buyer Name</option>
            <option value='product'>Product</option>
          </select>
        </div>
      </div>

      {!isMobile ? (
        <div className='overflow-x-auto border rounded-b-xl'>
          <table className='w-full table-auto text-sm'>
            <thead className='bg-gray-100 text-left text-[#888888] font-[poppins]'>
              <tr>
                <th className='p-3 font-normal'>N/S</th>
                <th className='p-3 font-normal'>Buyer</th>
                <th className='p-3 font-normal'>Product</th>
                <th className='p-3 font-normal'>Quantity</th>
                <th className='p-3 font-normal'>Price Offered</th>
                <th className='p-3 font-normal'>Total Value</th>
                <th className='p-3 font-normal'>Date</th>
                <th className='p-3 font-normal'>Status</th>
                <th className='p-3 font-normal'>Action</th>
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
                  onMakeOffer={() => alert("More offers clicked")}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='grid gap-4'>
          {getSortedOffers().map((offer, index) => (
            <FarmersOfferTable
              key={index}
              offer={offer}
              status={statusMap[offer.id]}
              onStatusChange={handleStatusChange}
              isMobile={true}
              onMakeOffer={() => alert("More offers clicked")}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmersOffers;

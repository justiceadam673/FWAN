import React, { useEffect, useState, useMemo } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../FireBaseConfig";
import BuyersCartTable from "../util/BuyersCartTable";

const BuyersCart = () => {
  const [offers, setOffers] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offerPrice, setOfferPrice] = useState("");

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
    <div className='p-4 sm:p-6'>
      <div className='bg-[#F1E7E7] py-3 px-4 rounded-t-2xl mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        {/* Badges */}
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
          <p className='flex items-center gap-1'>
            Listings
            <span className='text-white text-xs px-2 py-0.5 rounded-full bg-blue-500'>
              {offers.length}
            </span>
          </p>
        </div>

        {/* Sort Dropdown */}
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

      {/* Desktop Table */}
      {!isMobile && (
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
                <BuyersCartTable
                  key={index}
                  offer={offer}
                  status={statusMap[offer.id]}
                  onStatusChange={handleStatusChange}
                  isMobile={false}
                  onMakeOffer={() => {
                    setSelectedOffer(offer);
                    setOfferPrice("");
                    setShowModal(true);
                  }}
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
            <BuyersCartTable
              key={index}
              offer={offer}
              status={statusMap[offer.id]}
              onStatusChange={handleStatusChange}
              isMobile={true}
              onMakeOffer={() => {
                setSelectedOffer(offer);
                setOfferPrice("");
                setShowModal(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Overlay Modal */}
      {showModal && selectedOffer && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white rounded-xl w-full max-w-md p-6'>
            <h2 className='text-lg font-semibold mb-4'>Make an Offer</h2>
            <p className='mb-2'>
              Product: <strong>{selectedOffer.product}</strong>
            </p>
            <p className='mb-2'>
              Available Quantity: <strong>{selectedOffer.quantity} kg</strong>
            </p>

            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Your Offer Price (₦)
            </label>
            <input
              type='number'
              className='w-full border px-3 py-2 rounded-lg mb-4'
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder='Enter price per kg'
            />

            <div className='flex justify-end gap-2'>
              <button
                onClick={() => setShowModal(false)}
                className='px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100'
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!offerPrice) return alert("Please enter a price.");

                  try {
                    const { product, quantity, docId, userId } = selectedOffer;

                    await addDoc(collection(db, "offers"), {
                      buyerId: "demoUser123", // replace with actual buyer ID from auth
                      buyerName: "Demo Buyer", // replace with actual buyer name
                      product,
                      quantity,
                      priceOffered: parseFloat(offerPrice),
                      totalValue: parseFloat(offerPrice) * quantity,
                      listingId: docId,
                      farmerId: userId,
                      deliveryStatus: "Pending",
                      date: serverTimestamp(),
                    });

                    alert("Offer submitted!");
                    setShowModal(false);
                  } catch (err) {
                    console.error("Offer error:", err);
                    alert("Failed to submit offer.");
                  }
                }}
                className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'
              >
                Submit Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyersCart;

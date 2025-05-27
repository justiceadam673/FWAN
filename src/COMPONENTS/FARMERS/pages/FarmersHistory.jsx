// FarmersHistory.jsx
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../../FireBaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const FarmersHistory = () => {
  const [user, setUser] = useState(null);
  const [offers, setOffers] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchOffers = async () => {
      if (!user) return;

      try {
        const offersRef = collection(db, "offers");
        const q = query(
          offersRef,
          where("farmerId", "==", user.uid),
          where("status", "==", "Accepted"),
          where("deliveryStatus", "in", ["Delivered", "In Transit"])
        );
        const querySnapshot = await getDocs(q);
        const fetchedOffers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOffers(fetchedOffers);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, [user]);

  const filteredOffers =
    filter === "All"
      ? offers
      : offers.filter((offer) => offer.deliveryStatus === filter);

  const handleMarkInTransit = async (offerId) => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const orderId = `ORD-${day}-${month}`;

    try {
      await updateDoc(doc(db, "offers", offerId), {
        deliveryStatus: "In Transit",
        orderId,
      });
      setOffers((prev) =>
        prev.map((offer) =>
          offer.id === offerId
            ? { ...offer, deliveryStatus: "In Transit", orderId }
            : offer
        )
      );
    } catch (err) {
      console.error("Failed to update offer status:", err);
    }
  };

  return (
    <div className='p-4 md:p-8'>
      <h2 className='text-2xl font-semibold mb-6'>Offer History</h2>

      {/* Filter Buttons */}
      <div className='flex space-x-4 mb-4'>
        {["All", "Delivered", "In Transit"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg ${
              filter === status ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table or List */}
      <div className='overflow-x-auto'>
        <table className='min-w-full text-left text-sm border rounded-lg'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-2'>Order ID</th>
              <th className='px-4 py-2'>Product</th>
              <th className='px-4 py-2'>Buyer</th>
              <th className='px-4 py-2'>Quantity</th>
              <th className='px-4 py-2'>Total Price</th>
              <th className='px-4 py-2'>Date</th>
              <th className='px-4 py-2'>Status</th>
              <th className='px-4 py-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOffers.length > 0 ? (
              filteredOffers.map((offer) => (
                <tr key={offer.id} className='border-t'>
                  <td className='px-4 py-2'>
                    {offer.orderId ||
                      `ORD-${offer.createdAt?.toDate().getDate()}-${
                        offer.createdAt?.toDate().getMonth() + 1
                      }`}
                  </td>
                  <td className='px-4 py-2'>{offer.product}</td>
                  <td className='px-4 py-2'>{offer.buyerName}</td>
                  <td className='px-4 py-2'>{offer.quantity}</td>
                  <td className='px-4 py-2'>
                    ₦{offer.totalValue?.toLocaleString()}
                  </td>
                  <td className='px-4 py-2'>
                    {offer.createdAt?.toDate().toLocaleDateString("en-GB")}
                  </td>
                  <td className='px-4 py-2 text-green-600 font-medium'>
                    {offer.deliveryStatus}
                  </td>
                  <td className='px-4 py-2'>
                    {offer.deliveryStatus !== "In Transit" && (
                      <button
                        onClick={() => handleMarkInTransit(offer.id)}
                        className='bg-blue-500 text-white px-3 py-1 rounded'
                      >
                        Mark In Transit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='8' className='px-4 py-6 text-center text-gray-400'>
                  No offers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FarmersHistory;

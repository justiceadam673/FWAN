import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";
import { useAuth } from "../../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const FarmersOffersTable = () => {
  const { user } = useAuth(); // assumes you're using AuthContext
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offersRef = collection(db, "offers");
        const q = query(offersRef, where("farmerId", "==", user.uid)); // ✅ farmerId here
        const snapshot = await getDocs(q);
        const offersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOffers(offersData);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchOffers();
    }
  }, [user?.uid]);

  const toggleRow = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-40'>
        <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-green-500' />
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className='text-center text-gray-500 mt-10 text-lg'>
        No offers yet.
      </div>
    );
  }

  return (
    <div className='overflow-x-auto p-4'>
      <table className='min-w-full border border-gray-200 shadow rounded-lg bg-white'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-4 py-2 text-left'>Product</th>
            <th className='px-4 py-2 text-left'>Offer Price</th>
            <th className='px-4 py-2 text-left'>Status</th>
            <th className='px-4 py-2 text-left'>Action</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <React.Fragment key={offer.id}>
              <tr
                onClick={() => toggleRow(offer.id)}
                className='cursor-pointer hover:bg-gray-50 transition'
              >
                <td className='px-4 py-2'>{offer.productName || "N/A"}</td>
                <td className='px-4 py-2'>₹{offer.offerPrice || "N/A"}</td>
                <td className='px-4 py-2'>{offer.status || "Pending"}</td>
                <td className='px-4 py-2'>
                  {expandedRow === offer.id ? "▲" : "▼"}
                </td>
              </tr>

              <AnimatePresence>
                {expandedRow === offer.id && (
                  <motion.tr
                    key='expanded'
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td
                      colSpan={4}
                      className='px-4 py-3 bg-gray-50 text-sm text-gray-600'
                    >
                      <div>
                        <strong>Quantity:</strong> {offer.quantity || "N/A"}
                      </div>
                      <div>
                        <strong>Delivery Date:</strong>{" "}
                        {offer.deliveryDate || "N/A"}
                      </div>
                      <div>
                        <strong>Buyer Notes:</strong> {offer.notes || "None"}
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmersOffersTable;

import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../../FireBaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Icon } from "@iconify/react";

const BuyersHistory = () => {
  const [user, setUser] = useState(null);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const offersRef = collection(db, "offers");
    const q = query(
      offersRef,
      where("buyerId", "==", user.uid),
      where("status", "==", "Paid")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedOffers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          displayDate: new Date().toLocaleDateString("en-GB"),
        }));
        setOffers(fetchedOffers);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching offers:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <div className='p-4'>Loading orders...</div>;
  }

  // Mobile Card View
  const MobileCard = ({ offer }) => (
    <div className='bg-white rounded-lg shadow p-4 mb-4'>
      <div className='flex justify-between items-start mb-2'>
        <h3 className='font-semibold text-lg'>{offer.product}</h3>
        <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'>
          In Transit
        </span>
      </div>

      <div className='grid grid-cols-2 gap-2 text-sm mb-3'>
        <div>
          <p className='text-gray-500'>Quantity</p>
          <p>{offer.quantity}</p>
        </div>
        <div>
          <p className='text-gray-500'>Price</p>
          <p>₦{offer.totalValue?.toLocaleString()}</p>
        </div>
        <div>
          <p className='text-gray-500'>Date</p>
          <p>{offer.displayDate}</p>
        </div>
        <div>
          <p className='text-gray-500'>Order ID</p>
          <p>{"Pending"}</p>
        </div>
      </div>

      <button className='w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2 rounded-lg'>
        <Icon icon='mdi:package-variant-closed' />
        Track Order
      </button>
    </div>
  );

  return (
    <div className='p-4 md:p-8'>
      <h2 className='text-2xl font-semibold mb-6'>Order History</h2>

      {/* Mobile View (Cards) */}
      <div className='md:hidden space-y-4'>
        {offers.length > 0 ? (
          offers.map((offer) => <MobileCard key={offer.id} offer={offer} />)
        ) : (
          <div className='text-center text-gray-400 py-8'>
            No paid orders found.
          </div>
        )}
      </div>

      {/* Desktop View (Table) */}
      <div className='hidden md:block overflow-x-auto'>
        <table className='min-w-full text-left text-sm border rounded-lg'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-2'>Order ID</th>
              <th className='px-4 py-2'>Product</th>
              <th className='px-4 py-2'>Quantity</th>
              <th className='px-4 py-2'>Total Price</th>
              <th className='px-4 py-2'>Date</th>
              <th className='px-4 py-2'>Status</th>
            </tr>
          </thead>
          <tbody>
            {offers.length > 0 ? (
              offers.map((offer) => (
                <tr key={offer.id} className='border-t hover:bg-gray-50'>
                  <td className='px-4 py-2'>{"Pending"}</td>
                  <td className='px-4 py-2'>{offer.product}</td>
                  <td className='px-4 py-2'>{offer.quantity}</td>
                  <td className='px-4 py-2'>
                    ₦{offer.totalValue?.toLocaleString()}
                  </td>
                  <td className='px-4 py-2'>{offer.displayDate}</td>
                  <td className='px-4 py-2 font-medium text-blue-600'>
                    In Transit
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' className='px-4 py-6 text-center text-gray-400'>
                  No paid orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyersHistory;

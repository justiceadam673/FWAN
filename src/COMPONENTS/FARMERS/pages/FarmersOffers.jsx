import React, { useEffect, useState } from "react";
import { db, auth } from "../../../FireBaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const FarmersOffers = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showReviewOverlay, setShowReviewOverlay] = useState(false);
  const [showPaymentOverlay, setShowPaymentOverlay] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // 🔹 Fetch offers
  useEffect(() => {
    if (!user) return;
    const offersRef = collection(db, "offers");
    const q = query(offersRef, where("farmerId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOffers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOffers(fetchedOffers);
    });

    return () => unsubscribe();
  }, [user]);

  // 🔹 Fetch and attach images
  useEffect(() => {
    if (!user || offers.length === 0) return;

    const fetchListingImages = async () => {
      try {
        const listingsSnapshot = await getDocs(
          query(
            collection(db, "farmers_listings"),
            where("userId", "==", user.uid)
          )
        );
        const listings = listingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const updatedOffers = offers.map((offer) => {
          // Try to find exact match first
          // const matchedListing = listings.find(
          //   (listing) =>
          //     listing.id === offer.listingId || // if you have listingId reference
          //     (listing.prod === offer.product &&
          //       listing.price === offer.offerPrice && // add more matching criteria
          //       listing.quantity === offer.quantity)
          // );

          const matchedListing = listings.find(
            (listing) => listing.id === offer.listingId
          );
          return {
            ...offer,
            image: matchedListing?.image || null,
          };
        });

        setOffers(updatedOffers);
      } catch (error) {
        console.error("Error fetching listing images:", error);
      }
    };

    fetchListingImages();
  }, [user, offers]);

  // 🔹 Update offer status
  const updateOfferStatus = async (offerId, status) => {
    const offerRef = doc(db, "offers", offerId);
    await updateDoc(offerRef, { status });
  };

  const handleReviewOffer = (offer) => {
    setSelectedOffer(offer);
    setShowReviewOverlay(true);
  };

  const handleViewDelivery = (offer) => {
    navigate(`/buyerstracking/${offer.id}`);
  };

  const handleViewPayment = async (offer) => {
    const offerRef = doc(db, "offers", offer.id);
    const offerSnap = await getDoc(offerRef);
    const data = offerSnap.data();
    setPaymentStatus(data?.paid ? "Paid" : "Unpaid");
    setSelectedOffer(offer);
    setShowPaymentOverlay(true);
  };

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold mb-4'>Offers Received</h2>

      {/* Desktop Table */}
      <div className='hidden md:block'>
        <table className='w-full border-collapse rounded-lg overflow-hidden shadow'>
          <thead className='bg-green-100'>
            <tr>
              <th className='p-3 text-left'>Image</th>
              <th className='p-3 text-left'>Product</th>
              <th className='p-3 text-left'>Quantity</th>
              <th className='p-3 text-left'>Buyer</th>
              <th className='p-3 text-left'>Price Offered</th>
              <th className='p-3 text-left'>Status</th>
              <th className='p-3 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} className='border-t hover:bg-green-50'>
                <td className='p-3'>
                  <img
                    src={
                      offer.image ||
                      "https://via.placeholder.com/64?text=No+Image"
                    }
                    alt={offer.product}
                    className='w-16 h-16 object-cover rounded-md border border-gray-100'
                  />
                </td>
                <td className='p-3'>{offer.product}</td>
                <td className='p-3'>{offer.quantity}</td>
                <td className='p-3'>{offer.buyerName || "N/A"}</td>
                <td className='p-3'>₦{offer.offerPrice * offer.quantity}</td>
                <td className='p-3'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      offer.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : offer.status === "Accepted"
                        ? "bg-green-100 text-green-800"
                        : offer.status === "Paid"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {offer.status}
                  </span>
                </td>
                <td className='p-3 flex gap-2'>
                  {offer.status === "pending" ? (
                    <>
                      <Button
                        variant='outline'
                        className='text-white border-green-500 hover:bg-green-500 bg-green-900/90'
                        onClick={() => updateOfferStatus(offer.id, "Accepted")}
                      >
                        Accept
                      </Button>
                      <Button
                        variant='outline'
                        className='text-white border-red-500 hover:bg-red-500 bg-red-900/90'
                        onClick={() => updateOfferStatus(offer.id, "Rejected")}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant='outline'
                      className={`flex items-center gap-2 ${
                        offer.status === "Accepted"
                          ? "border-green-500 border text-green-700"
                          : offer.status === "Rejected"
                          ? "border-red-500 border text-red-700"
                          : offer.status === "Paid"
                          ? " border border-blue-500 text-blue-700"
                          : ""
                      }`}
                      onClick={() =>
                        offer.status === "Accepted"
                          ? handleViewPayment(offer)
                          : offer.status === "Rejected"
                          ? handleReviewOffer(offer)
                          : offer.status === "Paid"
                          ? handleViewDelivery(offer)
                          : ""
                      }
                    >
                      <span
                        className='iconify'
                        data-icon={
                          offer.status === "Accepted"
                            ? "mdi:wallet-outline"
                            : "mdi:eye-outline"
                        }
                      />
                      {offer.status === "Accepted" ? (
                        "View Payment"
                      ) : offer.status === "Rejected" ? (
                        "Review Offer"
                      ) : offer.status === "Paid" ? (
                        "View Delivery"
                      ) : (
                        <>
                          <Button
                            variant='outline'
                            className='text-white border-green-500 hover:bg-green-500 bg-green-900/90'
                            onClick={() =>
                              updateOfferStatus(offer.id, "Accepted")
                            }
                          >
                            Accept
                          </Button>
                          <Button
                            variant='outline'
                            className='text-white border-red-500 hover:bg-red-500 bg-red-900/90'
                            onClick={() =>
                              updateOfferStatus(offer.id, "Rejected")
                            }
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View remains unchanged */}
      <div className='md:hidden space-y-4'>
        {/* Your existing mobile view logic stays intact */}
      </div>

      {/* 🔹 Review Offer Overlay */}
      {showReviewOverlay && selectedOffer && (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-xl max-w-md w-full shadow-xl'>
            <h3 className='text-lg font-semibold mb-4'>Review Offer</h3>
            <p>
              <strong>Product:</strong> {selectedOffer.product}
            </p>
            <p>
              <strong>Quantity:</strong> {selectedOffer.quantity} kg
            </p>
            <p>
              <strong>Buyer:</strong> {selectedOffer.buyerName}
            </p>
            <p>
              <strong>Offer Price:</strong> ₦{selectedOffer.offerPrice}
            </p>
            <p>
              <strong>Status:</strong> {selectedOffer.status}
            </p>
            <div className='mt-4 text-right'>
              <Button onClick={() => setShowReviewOverlay(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Payment Tracking Overlay */}
      {showPaymentOverlay && selectedOffer && (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-xl max-w-md w-full shadow-xl'>
            <h3 className='text-lg font-semibold mb-4'>Payment Details</h3>
            <p>
              <strong>Product:</strong> {selectedOffer.product}
            </p>
            <p>
              <strong>Buyer:</strong> {selectedOffer.buyerName}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-bold ${
                  paymentStatus === "Paid" ? "text-green-600" : "text-red-600"
                }`}
              >
                {paymentStatus}
              </span>
            </p>
            <div className='mt-4 text-right'>
              <Button onClick={() => setShowPaymentOverlay(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmersOffers;

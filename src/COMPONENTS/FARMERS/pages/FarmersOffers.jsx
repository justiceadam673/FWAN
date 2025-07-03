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
import { Icon } from "@iconify/react";

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

  const MobileOfferCard = ({ offer }) => {
    const statusColors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Accepted: "bg-green-100 text-green-800",
      Paid: "bg-blue-100 text-blue-800",
      Rejected: "bg-red-100 text-red-800",
    };

    return (
      <div className='bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-100'>
        <div className='flex items-start gap-3 mb-3'>
          <img
            src={offer.image || "https://via.placeholder.com/80?text=No+Image"}
            alt={offer.product}
            className='w-16 h-16 object-cover rounded-md border border-gray-200'
          />
          <div className='flex-1'>
            <div className='flex justify-between items-start'>
              <h3 className='font-semibold text-lg'>{offer.product}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  statusColors[offer.status] || "bg-gray-100"
                }`}
              >
                {offer.status}
              </span>
            </div>
            <p className='text-gray-600 text-sm'>{offer.formattedOrderId}</p>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3 text-sm mb-4'>
          <div>
            <p className='text-gray-500'>Quantity</p>
            <p>{offer.quantity} kg</p>
          </div>
          <div>
            <p className='text-gray-500'>Buyer</p>
            <p>{offer.buyerName || "N/A"}</p>
          </div>
          <div>
            <p className='text-gray-500'>Price</p>
            <p>₦{(offer.offerPrice * offer.quantity).toLocaleString()}</p>
          </div>
          <div>
            <p className='text-gray-500'>Total</p>
            <p>₦{(offer.offerPrice * offer.quantity).toLocaleString()}</p>
          </div>
        </div>

        {offer.status === "Pending" ? (
          <div className='flex gap-2'>
            <Button
              size='sm'
              className='flex-1 bg-green-200 hover:bg-green-300  text-green-700 '
              onClick={() => updateOfferStatus(offer.id, "Accepted")}
            >
              Accept
            </Button>
            <Button
              size='sm'
              variant='destructive'
              className='flex-1 bg-red-200 hover:bg-red-300 text-red-700 '
              onClick={() => updateOfferStatus(offer.id, "Rejected")}
            >
              Reject
            </Button>
          </div>
        ) : (
          <Button
            size='sm'
            variant={
              offer.status === "Accepted"
                ? "default"
                : offer.status === "Rejected"
                ? "destructive"
                : "outline"
            }
            className={`w-full flex ${
              offer.status === "Accepted"
                ? "bg-green-300 text-green-700 "
                : offer.status === "Rejected"
                ? "bg-red-300 text-red-700 "
                : "bg-blue-300 text-blue-700 "
            } items-center justify-center gap-2`}
            onClick={() => {
              if (offer.status === "Accepted") handleViewPayment(offer);
              else if (offer.status === "Rejected") handleReviewOffer(offer);
              else if (offer.status === "Paid") handleViewDelivery(offer);
            }}
          >
            <Icon
              icon={
                offer.status === "Accepted"
                  ? "mdi:wallet-outline"
                  : offer.status === "Rejected"
                  ? "mdi:eye-outline"
                  : "mdi:truck-delivery-outline"
              }
              className='text-lg'
            />
            {offer.status === "Accepted"
              ? "View Payment"
              : offer.status === "Rejected"
              ? "Review Offer"
              : "View Delivery"}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold mb-4'>Offers Received</h2>

      {/* Desktop Table */}
      <div className='hidden lg:block'>
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
      <div className='lg:hidden space-y-4'>
        {offers.length > 0 ? (
          offers.map((offer) => (
            <MobileOfferCard key={offer.id} offer={offer} />
          ))
        ) : (
          <div className='text-center py-8 text-gray-500'>
            {/* <Icon
              icon='mdi:package-variant-closed'
              className='text-4xl mx-auto text-gray-300 mb-2'
            /> */}
            <p>No offers received yet</p>
          </div>
        )}
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

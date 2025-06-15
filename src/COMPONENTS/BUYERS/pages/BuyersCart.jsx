import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../FireBaseConfig";
import BuyersCartTable from "../util/BuyersCartTable";
import { useAuth } from "../../../context/AuthContext";
import { PaystackButton } from "react-paystack";

const BuyersCart = () => {
  const [offers, setOffers] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const { currentUser } = useAuth();
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    if (!currentUser?.uid) return;

    const q = query(
      collection(db, "offers"),
      where("buyerId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const offersData = querySnapshot.docs.map((docSnap, index) => {
        const data = docSnap.data();
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
          paymentStatus: data.paymentStatus || "Pending",
          status: data.status || "Pending",
          deliveryStatus: data.deliveryStatus || "Not Started",
        };
      });

      setOffers(offersData);

      const newStatusMap = {};
      offersData.forEach((item) => {
        newStatusMap[item.id] = item.status;
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
  }, [currentUser?.uid]);

  useEffect(() => {
    if (!currentUser || offers.length === 0) return;

    const fetchImages = async () => {
      try {
        const listingsSnapshot = await getDocs(
          collection(db, "farmers_listings")
        );
        const listings = listingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const offersWithImages = offers.map((offer) => {
          const matchedListing = listings.find(
            (listing) =>
              listing.userId === offer.farmerId &&
              listing.prod?.toLowerCase() === offer.product?.toLowerCase()
          );
          return {
            ...offer,
            image: matchedListing?.image || null,
          };
        });

        setOffers(offersWithImages);
      } catch (error) {
        console.error("Error fetching listing images:", error);
      }
    };

    fetchImages();
  }, [currentUser, offers]);

  const getSortedOffers = () => {
    const sorted = [...offers].sort((a, b) => {
      switch (sortBy) {
        case "date":
          return (b.date || 0) - (a.date || 0);
        case "price":
          return (
            (parseFloat(b.offerPrice) || 0) - (parseFloat(a.offerPrice) || 0)
          );
        case "status":
          return (a.status || "").localeCompare(b.status || "");
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

  const handleCompletePayment = (offer) => {
    if (
      window.confirm(
        `Confirm payment of ${offer.totalValue} for ${offer.product}?`
      )
    ) {
      setSelectedOffer(offer);
    }
  };

  const closePaymentModal = () => {
    setSelectedOffer(null);
  };

  const handlePaymentSuccess = async (offerId) => {
    setIsProcessingPayment(true);
    try {
      const offerRef = doc(db, "offers", offerId);

      // First update only the required fields
      await updateDoc(offerRef, {
        paymentStatus: "Paid",
        status: "Paid",
      });

      // Then update additional fields in a separate operation
      await updateDoc(offerRef, {
        deliveryStatus: "Processing",
        paymentDate: serverTimestamp(),
      });

      alert("Payment successful! Your order is now being processed.");
    } catch (error) {
      console.error("Payment status update error:", {
        code: error.code,
        message: error.message,
        offerId,
        userId: currentUser?.uid,
      });
      alert(
        "Payment succeeded but we encountered an issue updating your order status. Please contact support."
      );
    } finally {
      setIsProcessingPayment(false);
      closePaymentModal();
    }
  };

  const PaymentOverlay = ({ email, amount, onClose, offerId }) => {
    const publicKey = "pk_test_f635f526efd6eec9028ffb64f9692db3a8189d89";

    const componentProps = {
      email,
      amount: amount * 100,
      metadata: {
        custom_fields: [
          {
            display_name: "Buyer",
            variable_name: "buyer_email",
            value: email,
          },
        ],
      },
      publicKey,
      text: "Pay Now",
      onSuccess: () => handlePaymentSuccess(offerId),
      onClose: onClose,
    };

    // console.log("Current user UID:", currentUser?.uid);
    // console.log("Offer data:", {
    //   id: offerId,
    //   buyerId: offer.buyerId,
    //   currentStatus: offer.status,
    // });

    return (
      <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50'>
        <div className='bg-white p-6 rounded-lg w-full max-w-md shadow-xl'>
          <h2 className='text-lg font-semibold mb-4'>Complete Your Payment</h2>
          <div className='flex flex-col gap-4'>
            <PaystackButton
              {...componentProps}
              className={`bg-green-600 text-white px-4 py-2 rounded ${
                isProcessingPayment ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isProcessingPayment}
            />
            <button
              onClick={onClose}
              className='text-sm text-gray-500 underline'
            >
              Cancel Payment
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='p-4 sm:p-6'>
      {!isMobile ? (
        <div className='overflow-x-auto rounded-b-xl'>
          <table className='w-full table-auto text-sm'>
            <thead className='bg-gray-100 text-left text-[#888888] font-[poppins]'>
              <tr>
                <th className='p-3 font-normal'>N/S</th>
                <th className='p-3 font-normal'>Image</th>
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
              {getSortedOffers().map((offer) => (
                <BuyersCartTable
                  key={offer.docId}
                  offer={offer}
                  status={offer.status}
                  isMobile={false}
                  onMakeOffer={() => {}}
                  onCompletePayment={() => handleCompletePayment(offer)}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='grid gap-4'>
          {getSortedOffers().map((offer) => (
            <BuyersCartTable
              key={offer.docId}
              offer={offer}
              status={offer.status}
              isMobile={true}
              onMakeOffer={() => {}}
              onCompletePayment={() => handleCompletePayment(offer)}
            />
          ))}
        </div>
      )}

      {selectedOffer && (
        <PaymentOverlay
          email={currentUser.email}
          amount={selectedOffer.totalValue}
          offerId={selectedOffer.docId}
          onClose={closePaymentModal}
        />
      )}
    </div>
  );
};

export default BuyersCart;

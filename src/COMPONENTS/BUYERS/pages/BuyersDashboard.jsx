import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import BuyersDashBoardCard from "../components/BuyersDashBoardCard";
import { useLocation, useNavigate } from "react-router-dom";
import BuyersCollection from "../modals/BuyersCollection";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";
import { useAuth } from "../../../context/AuthContext";

const BuyersDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [totalOffers, setTotalOffers] = useState(0);
  const [pendingDeliveries, setPendingDeliveries] = useState(0);
  const [pendingPayment, setPendingPayment] = useState(0);
  const [totalAmountSpent, setTotalAmountSpent] = useState(0);

  useEffect(() => {
    if (!currentUser?.uid) return;

    // Query for offers in cart (assuming cart offers have buyerId and status might be pending)
    const q = query(
      collection(db, "offers"),
      where("buyerId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const offersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Calculate totals
      const total = offersData.length;

      // Pending Deliveries: Count of paid products (status: "Paid")
      const pendingDeliveriesCount = offersData.filter(
        (offer) => offer.status === "Paid"
      ).length;

      // Pending Payments: Count of accepted offers (status: "Accepted")
      const pendingPaymentCount = offersData.filter(
        (offer) => offer.status === "Accepted"
      ).length;

      // Total Amount Spent: Sum of totalValue for paid products (status: "Paid")
      const totalSpent = offersData
        .filter((offer) => offer.status === "Paid")
        .reduce((sum, offer) => sum + (parseFloat(offer.totalValue) || 0), 0);

      setTotalOffers(total);
      setPendingDeliveries(pendingDeliveriesCount);
      setPendingPayment(pendingPaymentCount);
      setTotalAmountSpent(totalSpent);
    });

    return () => unsubscribe();
  }, [currentUser?.uid]);

  return (
    <main className='lg:ml-[60px] px-[20px] bg-[#F3FAF6]'>
      <section className='grid lg:grid-cols-4 grid-cols-2 my-[28px] max-w-[880px] ml-[4px] mb-[36.5px] gap-[24px]'>
        <BuyersDashBoardCard
          cardNumber={totalOffers}
          cardText={"Total Offer"}
          icon={"rivet-icons:clipboard"}
        />
        <BuyersDashBoardCard
          cardNumber={pendingDeliveries}
          cardText={"Pending Deliveries"}
          icon={"game-icons:sell-card"}
        />
        <BuyersDashBoardCard
          cardNumber={pendingPayment}
          cardText={"Pending Payments"}
          icon={"uiw:loading"}
        />
        <BuyersDashBoardCard
          nairaSIgn={"₦"}
          cardNumber={totalAmountSpent.toLocaleString()}
          cardText={"Total Amount spent"}
          icon={"mingcute:wallet-fill"}
        />
      </section>
      <section className='flex'>
        <BuyersCollection />
      </section>
    </main>
  );
};

export default BuyersDashboard;

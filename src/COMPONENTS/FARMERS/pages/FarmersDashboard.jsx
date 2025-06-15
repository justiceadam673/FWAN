import React, { useEffect, useState } from "react";
import FarmersDashBoardCard from "../components/FarmersDashBoardCard";
import RevenueChart from "../data/RevenueChart";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";
import { useAuth } from "../../../context/AuthContext";

const FarmersDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [listingsCount, setListingsCount] = useState(0);
  const [currentOffers, setCurrentOffers] = useState(0);
  const [pendingPayment, setPendingPayment] = useState(0);
  const [revenue, setRevenue] = useState(0);

  // const from = location.state?.from?.pathname || "/farmersoverview";
  // navigate(from, { replace: true });

  useEffect(() => {
    if (!currentUser?.uid) return;

    // Fetch farmer's listings count
    const listingsQuery = query(
      collection(db, "farmers_listings"),
      where("userId", "==", currentUser.uid)
    );
    const listingsUnsubscribe = onSnapshot(listingsQuery, (snapshot) => {
      setListingsCount(snapshot.size);
    });

    // Fetch offers data
    const offersQuery = query(
      collection(db, "offers"),
      where("farmerId", "==", currentUser.uid)
    );
    const offersUnsubscribe = onSnapshot(offersQuery, (snapshot) => {
      const offersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Current Offers: Pending status
      const pendingOffers = offersData.filter(
        (offer) => offer.status === "Pending"
      ).length;

      // Pending Payment: Accepted status
      const acceptedOffers = offersData.filter(
        (offer) => offer.status === "Accepted"
      ).length;

      // Revenue: Sum of paid offers
      const totalRevenue = offersData
        .filter((offer) => offer.status === "Paid")
        .reduce((sum, offer) => sum + (parseFloat(offer.totalValue) || 0), 0);

      setCurrentOffers(pendingOffers);
      setPendingPayment(acceptedOffers);
      setRevenue(totalRevenue);
    });

    return () => {
      listingsUnsubscribe();
      offersUnsubscribe();
    };
  }, [currentUser?.uid]);

  return (
    <main className='lg:ml-[60px] px-[20px] max-w-[880px] bg-[#F3FAF6]'>
      <section className='grid lg:grid-cols-4 grid-cols-2 mt-[20px] ml-[4px] mb-[36.5px] gap-[24px] '>
        <FarmersDashBoardCard
          cardNumber={listingsCount}
          cardText={"Listings"}
          icon={"rivet-icons:clipboard"}
        />
        <FarmersDashBoardCard
          cardNumber={currentOffers}
          cardText={"Current Offers"}
          icon={"game-icons:sell-card"}
        />
        <FarmersDashBoardCard
          cardNumber={pendingPayment}
          cardText={"Pending Payment"}
          icon={"uiw:loading"}
        />
        <FarmersDashBoardCard
          nairaSIgn={"₦"}
          cardNumber={revenue.toLocaleString("en-NG", {
            // style: "currency",
            // currency: "NGN",
            // minimumFractionDigits: 2,
          })}
          cardText={"Revenue"}
          icon={"mingcute:wallet-fill"}
        />
      </section>
      <section className=''>
        <RevenueChart farmerId={currentUser?.uid} />
      </section>
    </main>
  );
};

export default FarmersDashboard;

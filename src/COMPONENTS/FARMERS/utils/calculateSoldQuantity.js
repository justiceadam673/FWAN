import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";

export const calculateSoldQuantity = async (listingId) => {
  try {
    const offersRef = collection(db, "offers");
    const q = query(
      offersRef,
      where("listingId", "==", listingId),
      where("status", "in", ["Accepted", "Paid"])
    );

    const querySnapshot = await getDocs(q);
    let totalSold = 0;

    querySnapshot.forEach((doc) => {
      const offer = doc.data();
      totalSold += parseFloat(offer.quantity) || 0;
    });

    return totalSold;
  } catch (error) {
    console.error("Error calculating sold quantity:", error);
    return 0;
  }
};

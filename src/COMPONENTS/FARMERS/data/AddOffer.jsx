import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";

export const addOffer = async () => {
  try {
    const buyerNames = [
      "John Doe",
      "Jane Smith",
      "Ali Musa",
      "Chika Obi",
      "Emeka Uche",
    ];
    const products = ["Tomatoes", "Yam", "Cassava", "Maize", "Pepper"];
    const statuses = ["Pending", "Accepted", "Rejected"];

    const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    const randomFloat = (min, max) =>
      (Math.random() * (max - min) + min).toFixed(2);

    const quantity = randomInt(50, 300); // e.g., 50 - 300 kg
    const price = randomFloat(1.5, 5.0); // e.g., ₦1.50 - ₦5.00 per kg
    const total = (quantity * price).toFixed(2);

    const daysAgo = randomInt(0, 14);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    const offer = {
      buyerName: randomItem(buyerNames),
      product: randomItem(products),
      quantity: `${quantity} kg`,
      priceOffered: `₦${price}/kg`,
      totalValue: `₦${parseFloat(total).toLocaleString()}`,
      date: Timestamp.fromDate(date),
      status: randomItem(statuses),
    };

    const docRef = await addDoc(collection(db, "offers"), offer);
    console.log("Offer added with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding offer: ", e);
  }
};

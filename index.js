import * as functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// Function to add revenue for the current month
export const addMonthlyRevenue = functions.https.onRequest(async (req, res) => {
  try {
    const now = new Date();
    const monthAbbr = now
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase(); // e.g., "MAY"
    const year = now.getFullYear();

    const docId = `${monthAbbr}-${year}`;
    const revenueRef = db.collection("revenue").doc(docId);

    // Dummy revenue amount — adjust as needed or use real logic
    const revenueAmount = 50000;

    await revenueRef.set({
      month: monthAbbr,
      year,
      amount: revenueAmount,
    });

    res.status(200).send(`Revenue for ${docId} added: ₦${revenueAmount}`);
  } catch (error) {
    console.error("Error adding revenue:", error);
    res.status(500).send("Internal Server Error");
  }
});

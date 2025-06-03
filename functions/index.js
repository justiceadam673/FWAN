/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// Listen to a new document added to the offers collection
exports.createOfferNotification = functions.firestore
  .document("offers/{offerId}")
  .onCreate(async (snap, context) => {
    const offerData = snap.data();
    const userId = offerData.farmerId || offerData.userId; // Adjust based on your schema

    const message = `You received a new offer for your listing "${offerData.listingTitle}"`;

    await db.collection("notifications").add({
      userId,
      message,
      read: false,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

// Example: Listing accepted/rejected
exports.onOfferStatusChange = functions.firestore
  .document("offers/{offerId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    if (before.status !== after.status) {
      const userId = after.buyerId; // Adjust field as needed
      const message = `Your offer has been ${after.status.toLowerCase()}`;

      await db.collection("notifications").add({
        userId,
        message,
        read: false,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// User lifecycle notifications
exports.sendWelcomeNotification = functions.auth
  .user()
  .onCreate(async (user) => {
    await db.collection("notifications").add({
      userId: user.uid,
      type: "welcome",
      message: `Welcome to AgriConnect${
        user.displayName ? `, ${user.displayName}` : ""
      }!`,
      read: false,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      metadata: {
        event: "user_creation",
      },
    });
  });

// Profile update notifications
exports.onProfileUpdate = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    const changes = [];
    if (before.displayName !== after.displayName) changes.push("display name");
    if (before.photoURL !== after.photoURL) changes.push("profile picture");
    if (before.contactNumber !== after.contactNumber)
      changes.push("contact number");

    if (changes.length > 0) {
      await db.collection("notifications").add({
        userId: context.params.userId,
        type: "profile_update",
        message: `You updated your ${changes.join(" and ")}`,
        read: false,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        metadata: {
          changes: changes,
          event: "profile_update",
        },
      });
    }
  });

// Offer-related notifications
exports.createOfferNotification = functions.firestore
  .document("offers/{offerId}")
  .onCreate(async (snap, context) => {
    const offerData = snap.data();

    await db.collection("notifications").add({
      userId: offerData.farmerId,
      type: "new_offer",
      message: `New offer for "${offerData.listingTitle}" - ${offerData.offerAmount} ${offerData.currency}`,
      read: false,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      metadata: {
        offerId: context.params.offerId,
        listingId: offerData.listingId,
        event: "new_offer",
      },
    });
  });

exports.onOfferStatusChange = functions.firestore
  .document("offers/{offerId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    if (before.status !== after.status) {
      const message = `Your offer for "${
        after.listingTitle
      }" was ${after.status.toLowerCase()}`;

      await db.collection("notifications").add({
        userId: after.buyerId,
        type: "offer_update",
        message: message,
        read: false,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        metadata: {
          offerId: context.params.offerId,
          listingId: after.listingId,
          newStatus: after.status,
          event: "offer_status_change",
        },
      });
    }
  });

// Listing-related notifications
exports.onListingStatusChange = functions.firestore
  .document("listings/{listingId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    if (before.status !== after.status) {
      await db.collection("notifications").add({
        userId: after.userId,
        type: "listing_update",
        message: `Your listing "${
          after.title
        }" is now ${after.status.toLowerCase()}`,
        read: false,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        metadata: {
          listingId: context.params.listingId,
          newStatus: after.status,
          event: "listing_status_change",
        },
      });
    }
  });

// Login notifications (requires client-side device info)
exports.onLoginNotification = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Not authenticated"
    );
  }

  const { deviceInfo, isNewDevice } = data;

  if (isNewDevice) {
    await db.collection("notifications").add({
      userId: context.auth.uid,
      type: "security",
      message: `New login from ${deviceInfo.browser || "unknown browser"} on ${
        deviceInfo.os || "unknown OS"
      }`,
      read: false,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      metadata: {
        deviceInfo,
        event: "new_login",
      },
    });
  }

  return { success: true };
});

// src/services/notificationService.js
import { db } from "../FireBaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const createNotification = async (
  userId,
  type,
  message,
  metadata = {}
) => {
  try {
    await addDoc(collection(db, "notifications"), {
      userId,
      type,
      message,
      metadata,
      read: false,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

export const notificationTypes = {
  WELCOME: "welcome",
  NEW_OFFER: "new_offer",
  OFFER_UPDATE: "offer_update",
  NEW_LISTING: "new_listing",
  PAYMENT: "payment",
  PROFILE_UPDATE: "profile_update",
  SECURITY: "security",
};

export const getNotificationIcon = (type) => {
  const icons = {
    welcome: "mdi:hand-wave",
    new_offer: "mdi:handshake",
    offer_update: "mdi:currency-usd",
    new_listing: "mdi:package-variant",
    payment: "mdi:cash-check",
    profile_update: "mdi:account-cog",
    security: "mdi:shield-account",
    default: "mdi:bell",
  };
  return icons[type] || icons.default;
};

import React, { useEffect, useState } from "react";
import { db, auth } from "../FireBaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import NotificationBell from "./FarmersNotificationBell";

const BuyersNotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(
          collection(db, "notifications"),
          where("userId", "==", user.uid),
          orderBy("timestamp", "desc")
        );

        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const notifData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNotifications(notifData);
          setLoading(false);
        });

        return () => unsubscribeSnapshot();
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  const markAsRead = async (id) => {
    const notifRef = doc(db, "notifications", id);
    await updateDoc(notifRef, { read: true });
  };

  const markAllAsRead = async () => {
    const batch = writeBatch(db);
    notifications
      .filter((notif) => !notif.read)
      .forEach((notif) => {
        const notifRef = doc(db, "notifications", notif.id);
        batch.update(notifRef, { read: true });
      });

    await batch.commit();
  };

  const getNotificationIcon = (type) => {
    const icons = {
      welcome: "mdi:hand-wave",
      new_offer: "mdi:handshake",
      offer_update: "mdi:currency-usd",
      listing_update: "mdi:package-variant",
      profile_update: "mdi:account-cog",
      security: "mdi:shield-account",
      default: "mdi:bell",
    };
    return icons[type] || icons.default;
  };

  const handleNotificationClick = (notif) => {
    // Mark as read when clicked
    if (!notif.read) {
      markAsRead(notif.id);
    }

    // Navigate based on notification type
    if (notif.metadata?.listingId) {
      navigate(`/listings/${notif.metadata.listingId}`);
    } else if (notif.metadata?.offerId) {
      navigate(`/offers/${notif.metadata.offerId}`);
    }
    // Add more navigation cases as needed
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  return (
    <div className='p-4 md:p-6 max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
          Notifications
        </h1>
        <div className='flex items-center gap-4'>
          <NotificationBell />
          {notifications.some((notif) => !notif.read) && (
            <button
              onClick={markAllAsRead}
              className='px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors'
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className='text-center py-10 border rounded-lg bg-gray-50'>
          <Icon
            icon='mdi:bell-off'
            className='text-4xl text-gray-400 mx-auto'
          />
          <p className='mt-3 text-gray-500'>No notifications yet</p>
          <p className='text-sm text-gray-400'>
            We'll notify you when there's activity
          </p>
        </div>
      ) : (
        <div className='space-y-3'>
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                notif.read
                  ? "bg-gray-50 border-gray-200"
                  : "bg-white border-blue-200 shadow-sm"
              } hover:border-blue-300 hover:shadow-md`}
            >
              <div className='flex items-start gap-3'>
                <div
                  className={`p-2 rounded-full mt-1 ${
                    notif.read ? "bg-gray-200" : "bg-blue-100"
                  }`}
                >
                  <Icon
                    icon={getNotificationIcon(notif.type)}
                    className={`text-lg ${
                      notif.read ? "text-gray-600" : "text-blue-600"
                    }`}
                  />
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex justify-between items-start'>
                    <p
                      className={`truncate ${
                        notif.read
                          ? "text-gray-700"
                          : "font-medium text-gray-900"
                      }`}
                    >
                      {notif.message}
                    </p>
                    {!notif.read && (
                      <span className='ml-2 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0'></span>
                    )}
                  </div>
                  <p className='text-xs text-gray-500 mt-1'>
                    {notif.timestamp?.toDate().toLocaleString()}
                  </p>
                  {notif.metadata && notif.type !== "welcome" && (
                    <button className='mt-2 text-xs text-blue-500 hover:underline'>
                      View details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyersNotificationPage;

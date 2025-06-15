import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../FireBaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const NotificationBell = ({ withText }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [latestNotification, setLatestNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Query for unread count
        const unreadQuery = query(
          collection(db, "notifications"),
          where("userId", "==", user.uid),
          where("read", "==", false)
        );

        // Query for latest notification
        const latestQuery = query(
          collection(db, "notifications"),
          where("userId", "==", user.uid),
          orderBy("timestamp", "desc"),
          limit(1)
        );

        const unsubscribeUnread = onSnapshot(unreadQuery, (snapshot) => {
          setUnreadCount(snapshot.size);
        });

        const unsubscribeLatest = onSnapshot(latestQuery, (snapshot) => {
          if (!snapshot.empty) {
            setLatestNotification({
              id: snapshot.docs[0].id,
              ...snapshot.docs[0].data(),
            });
          }
        });

        return () => {
          unsubscribeUnread();
          unsubscribeLatest();
        };
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='relative'>
      <div
        className={`flex items-center gap-2 ${
          withText ? "px-4 py-2 bg-gray-100 rounded-full" : ""
        }`}
        onClick={() => navigate("/notifications")}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div
          className={`p-2 rounded-full relative ${
            unreadCount > 0 ? "bg-blue-50 text-blue-600" : "text-gray-600"
          }`}
        >
          <Icon
            icon={unreadCount > 0 ? "mdi:bell-alert" : "mdi:bell-outline"}
            width='20'
            height='20'
          />
          {unreadCount > 0 && (
            <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center animate-pulse'>
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>
        {withText && <span className='text-sm font-medium'>Notifications</span>}
      </div>

      {showTooltip && unreadCount > 0 && (
        <div className='absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200'>
          <div className='px-3 py-2 border-b border-gray-100'>
            <p className='text-sm font-medium text-gray-800'>
              {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
            </p>
          </div>
          {latestNotification && (
            <div
              className='px-3 py-2 hover:bg-gray-50 cursor-pointer'
              onClick={() => navigate("/farmersnotifications")}
            >
              <p className='text-sm text-gray-700 truncate'>
                {latestNotification.message}
              </p>
              <p className='text-xs text-gray-500 mt-1'>
                {latestNotification.timestamp?.toDate().toLocaleTimeString()}
              </p>
            </div>
          )}
          <div
            className='px-3 py-2 text-center text-sm text-blue-600 hover:bg-blue-50 cursor-pointer border-t border-gray-100'
            onClick={() => navigate("/farmersnotifications")}
          >
            View all notifications
          </div>
        </div>
      )}
    </div>
  );
};

NotificationBell.defaultProps = {
  withText: false,
};

export default NotificationBell;

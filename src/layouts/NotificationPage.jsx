import React, { useEffect, useState } from "react";
import { db, auth } from "../FireBaseConfig"; // Adjust the path as needed
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

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
        });

        return () => unsubscribeSnapshot();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const markAsRead = async (id) => {
    const notifRef = doc(db, "notifications", id);
    await updateDoc(notifRef, { read: true });
  };

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>Notifications</h2>
      <ul className='space-y-4'>
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className={`p-4 rounded-lg shadow ${
              notif.read ? "bg-gray-100" : "bg-white"
            }`}
          >
            <div className='flex justify-between items-center'>
              <p className='text-gray-800'>{notif.message}</p>
              {!notif.read && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  className='text-sm text-blue-500 hover:underline'
                >
                  Mark as read
                </button>
              )}
            </div>
            <p className='text-xs text-gray-500 mt-1'>
              {new Date(notif.timestamp?.toDate()).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPage;

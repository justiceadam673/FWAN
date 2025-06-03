import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../FireBaseConfig"; // Adjust the path as needed
import { collection, query, where, onSnapshot } from "firebase/firestore";

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(
          collection(db, "notifications"),
          where("userId", "==", user.uid),
          where("read", "==", false)
        );

        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          setUnreadCount(snapshot.size);
        });

        return () => unsubscribeSnapshot();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      className='relative p-[16px] bg-white text-black flex items-center rounded-[12px] shadow-[4px_4px_2.5px_rgba(0,0,0,0.100)] justify-center cursor-pointer'
      onClick={() => navigate("/notifications")}
    >
      <Icon icon='line-md:bell-loop' width='24' height='24' />
      {unreadCount > 0 && (
        <span className='absolute top-1 right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full'>
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;

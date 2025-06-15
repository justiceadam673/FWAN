// BuyersDashBoardLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../FireBaseConfig";
import { toast } from "react-toastify";
// import NotificationBell from "./FarmersNotificationBell";

const BuyersDashBoardLayout = () => {
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Force refresh the user data (in case of cached data)
        currentUser.reload().then(() => {
          updateAvatarUrl(currentUser);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const updateAvatarUrl = (user) => {
    if (user?.photoURL) {
      setAvatarUrl(`${user.photoURL}?${Date.now()}`);
    } else {
      const initials = getInitials(user);
      setAvatarUrl(
        `https://ui-avatars.com/api/?name=${initials}&background=3D8236&color=fff&size=90&rounded=true`
      );
    }
  };

  const getDisplayName = () => {
    if (user?.displayName) return user.displayName.split(" ")[0];
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  const getInitials = (user) => {
    if (user?.displayName) {
      const names = user.displayName.split(" ");
      return names
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    if (user?.email) return user.email[0].toUpperCase();
    return "U";
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/role");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Error logging out. Try again.");
    }
  };

  return (
    <main className='h-screen flex flex-col'>
      {/* HEADER */}
      <header className='md:flex hidden justify-between bg-[#F4FFEA] items-center border-b pl-[34px] py-[25px] pr-[19.8px]'>
        <div className='flex items-center gap-[20px]'>
          <img
            src={avatarUrl || null} // Use null instead of empty string
            className='w-[90px] aspect-[1/1] rounded-full object-cover'
            alt='User Avatar'
            onError={(e) => {
              const initials = getInitials(user);
              e.target.src = `https://ui-avatars.com/api/?name=${initials}&background=3D8236&color=fff&size=90&rounded=true`;
            }}
          />
          <div className='font-[Kodchasan] font-medium leading-normal'>
            <h1 className='flex items-center text-[#1E1E1E] text-[28px] gap-2'>
              Hello {getDisplayName()} <Icon icon='emojione:waving-hand' />
            </h1>
            <p className='text-[20px] text-[#A19797]'>
              Welcome To Your Dashboard buyer
            </p>
          </div>
        </div>

        <div className='flex items-center gap-[20px]'>
          <div className='p-[16px] text-black flex items-center justify-center'>
            {/* <NotificationBell /> */}
          </div>
          <div className='relative w-full'>
            <button
              onClick={handleLogout}
              className='flex gap-[5px] bg-white rounded-[12px] text-black/70 hover:text-[#3D8236] shadow-[4px_4px_2.5px_rgba(0,0,0,0.100)] transition duration-[.5s] px-[15px] py-[16px] justify-center items-center'
            >
              <span>Log Out</span>
              <Icon icon='ic:outline-logout' width='24' height='24' />
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className='flex-1 overflow-y-auto bg-[#F3FAF6]'>
        <Outlet />
      </section>
    </main>
  );
};

export default BuyersDashBoardLayout;

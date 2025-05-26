import React from "react";
import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";

const FarmersHistory = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-tr from-yellow-100 via-white to-yellow-200'>
      <motion.div
        initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className='text-center p-10 bg-white rounded-3xl shadow-2xl border border-yellow-300 max-w-md'
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className='text-yellow-600 mb-6'
        >
          <CalendarClock size={70} strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className='text-3xl md:text-4xl font-extrabold text-yellow-700 mb-4'
        >
          History in Progress
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className='text-gray-700 text-base'
        >
          We're working hard to bring your activity history to life. Stay tuned!
          ⏳
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FarmersHistory;

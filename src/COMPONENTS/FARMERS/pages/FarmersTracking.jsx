import React from "react";
import { motion } from "framer-motion";
import { LocateFixed } from "lucide-react";

const FarmersTracking = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-br from-yellow-100 via-white to-orange-100'>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='text-center p-10 bg-white rounded-3xl shadow-2xl border border-orange-200 max-w-xl'
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className='inline-block mb-6 text-orange-500'
        >
          <LocateFixed size={72} strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='text-4xl font-bold text-orange-600 mb-3'
        >
          Tracking Feature Incoming!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className='text-gray-600 text-base'
        >
          Real-time insights are en route to help you monitor your journey 🚜📍
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FarmersTracking;

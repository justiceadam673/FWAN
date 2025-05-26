import React from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";

const FarmersListings = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100'>
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='text-center p-10 bg-white rounded-3xl shadow-xl border border-blue-200 max-w-lg'
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className='text-blue-500 mb-6'
        >
          <Package size={72} strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className='text-4xl font-bold text-blue-700 mb-3'
        >
          Listings Coming Soon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className='text-gray-600 text-base'
        >
          Our marketplace is being stocked with fresh produce and products. Your
          listings will bloom here soon 🌾📦
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FarmersListings;

import React from "react";
import { motion } from "framer-motion";
import { HandCoins } from "lucide-react";

const FarmersOffers = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className='text-center p-10 bg-white rounded-3xl shadow-xl border border-yellow-200 max-w-lg'
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className='text-yellow-600 mb-6'
        >
          <HandCoins size={72} strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className='text-4xl font-bold text-yellow-700 mb-4'
        >
          Offers Coming Soon!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className='text-gray-600 text-base'
        >
          Your best deals are just around the corner 💰🌾
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FarmersOffers;

import React from "react";
import { motion } from "framer-motion";
import { UserRound } from "lucide-react";

const FarmersProfile = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100'>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className='text-center p-10 bg-white rounded-3xl shadow-2xl border border-blue-200 max-w-lg'
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className='text-blue-600 mb-6'
        >
          <UserRound size={72} strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='text-4xl font-bold text-blue-700 mb-3'
        >
          Profile Feature Coming Soon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='text-gray-600 text-base'
        >
          Your personalized space is being built with care 👨‍🌾💼
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FarmersProfile;

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ApplyNowWithPopup() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* Apply button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-800 text-white text-lg sm:text-xl font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform"
      >
        Apply now
      </button>

      {/* Modal with framer-motion */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal box */}
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-[32px] max-w-3xl w-full relative overflow-hidden shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-black"
              >
                ×
              </button>

              {/* Form content */}
<form className="p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[16px] font-normal">
  <input
    type="text"
    placeholder="Your name"
    required
    className="rounded-lg border border-gray-300 px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-700"
  />
  <input
    type="email"
    placeholder="Email"
    required
    className="rounded-lg border border-gray-300 px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-700"
  />
  <input
    type="tel"
    placeholder="Phone number"
    required
    className="rounded-lg border border-gray-300 px-4 py-3 w-full sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-green-700"
  />
  <textarea
    placeholder="Why you’re a good fit"
    required
    rows={4}
    className="rounded-lg border border-gray-300 px-4 py-3 w-full sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-green-700"
  ></textarea>

  <div className="w-full sm:col-span-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <input
      type="file"
      className="text-sm font-medium border border-gray-300 rounded-md px-3 py-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-800 hover:file:bg-green-200 transition"
    />
    <button
      type="submit"
      className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-md font-bold text-[16px]"
    >
      Submit Portfolio
    </button>
  </div>
</form>

              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

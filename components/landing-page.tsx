'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function LandingPage() {
  const [text, setText] = useState('')
  const fullText = 'Guy Danter Photography'

  useEffect(() => {
    let i = 0
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        setText((prev) => prev + fullText.charAt(i))
        i++
      } else {
        clearInterval(typingEffect)
      }
    }, 100)

    return () => clearInterval(typingEffect)
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-900 text-gray-100">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-8"
        >
          {text}
        </motion.h1>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/portfolio" passHref>
            <motion.button
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out"
              whileHover={{ boxShadow: '0px 0px 8px rgb(20 184 166)' }}
            >
              View Portfolio
            </motion.button>
          </Link>
        </motion.div>
      </main>
      <footer className="w-full bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm">&copy; 2023 Guy Danter Photography</p>
          <div className="flex space-x-4">
            <a href="mailto:contact@guydanter.com" className="hover:text-teal-400 transition-colors duration-300">
              contact@guydanter.com
            </a>
            <a href="tel:+1234567890" className="hover:text-teal-400 transition-colors duration-300">
              +1 (234) 567-890
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
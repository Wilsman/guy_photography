'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <div className="md:hidden relative flex items-center">
          <button onClick={toggleDrawer} className="text-gray-300 hover:text-white">
            {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
          {isOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="absolute top-full left-0 mt-2 z-50 flex flex-col items-start space-y-4 p-4 shadow-lg w-full"
            >
              <Link href="/" passHref>
                <motion.div
                  className="text-gray-300 hover:text-white text-xl"
                  whileHover={{ scale: 1.1 }}
                  onClick={toggleDrawer}
                >
                  Home
                </motion.div>
              </Link>
              <Link href="/portfolio" passHref>
                <motion.div
                  className="text-gray-300 hover:text-white text-xl"
                  whileHover={{ scale: 1.1 }}
                  onClick={toggleDrawer}
                >
                  Portfolio
                </motion.div>
              </Link>
              <Link href="/about" passHref>
                <motion.div
                  className="text-gray-300 hover:text-white text-xl"
                  whileHover={{ scale: 1.1 }}
                  onClick={toggleDrawer}
                >
                  About
                </motion.div>
              </Link>
              <Link href="/contact" passHref>
                <motion.div
                  className="text-gray-300 hover:text-white text-xl"
                  whileHover={{ scale: 1.1 }}
                  onClick={toggleDrawer}
                >
                  Contact
                </motion.div>
              </Link>
            </motion.div>
          )}
        </div>
        <div className="text-white text-lg md:text-xl font-bold">Portfolio</div>
        <div className="hidden md:flex space-x-4">
          <Link href="/" passHref>
            <motion.div
              className="inline-block text-gray-300 hover:text-white"
              whileHover={{ scale: 1.1 }}
            >
              Home
            </motion.div>
          </Link>
          <Link href="/portfolio" passHref>
            <motion.div
              className="inline-block text-gray-300 hover:text-white"
              whileHover={{ scale: 1.1 }}
            >
              Portfolio
            </motion.div>
          </Link>
          <Link href="/about" passHref>
            <motion.div
              className="inline-block text-gray-300 hover:text-white"
              whileHover={{ scale: 1.1 }}
            >
              About
            </motion.div>
          </Link>
          <Link href="/contact" passHref>
            <motion.div
              className="inline-block text-gray-300 hover:text-white"
              whileHover={{ scale: 1.1 }}
            >
              Contact
            </motion.div>
          </Link>
        </div>
      </div>
    </nav>
  )
}
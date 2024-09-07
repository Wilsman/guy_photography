'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navigation() {
  return (
    <nav className="bg-background p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Guy Danter Photography</div>
        <div className="space-x-4">
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
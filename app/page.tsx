'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LandingPage() {
  useEffect(() => {
    // Example: Remove the attribute if it's added by a third-party script
    document.querySelectorAll('[cz-shortcut-listen]').forEach((el) => {
      el.removeAttribute('cz-shortcut-listen');
    });
  }, []);

  const [text, setText] = useState('')
  const fullText = useMemo(() => 'Guuy Danter Photography', [])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let i = 0
    const typingEffect = () => {
      if (i < fullText.length) {
        setText((prev) => prev + fullText.charAt(i))
        i++
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }

    intervalRef.current = setInterval(typingEffect, 50) // Reduced interval for smoother typing

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [fullText])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-gray-100 dark dotted-background">
      <main className="flex flex-col items-center justify-center p-4">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }} // Added ease for smoother transition
          className="text-4xl md:text-6xl font-bold text-center mb-8"
        >
          {text}
        </motion.h1>
        <motion.div
          whileHover={{ scale: 1.1 }}
        >
          <Link href="/portfolio" passHref>
            <motion.button
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out"
              whileHover={{ boxShadow: '0px 0px 15px rgb(20 184 166)' }}
            >
              View Portfolio
            </motion.button>
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface ImageOverlayProps {
  image: string
  onClose: () => void
}

export function ImageOverlay({ image, onClose }: ImageOverlayProps) {
  // Modify the URL to request a higher resolution image
  const highResImage = image.replace('/800/600', '/1600/1200')

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.img
          src={highResImage}
          alt="Full size image"
          className="max-w-full max-h-full object-contain"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
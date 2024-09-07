'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function PhotographyPortfolio() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const images = [
    'https://picsum.photos/800/600?grayscale',
    'https://picsum.photos/800/600',
    'https://picsum.photos/800/600?grayscale',
    'https://picsum.photos/800/600?grayscale',
    'https://picsum.photos/800/600?grayscale',
    'https://picsum.photos/800/600?grayscale',
    'https://picsum.photos/800/600',
    'https://picsum.photos/800/600?grayscale',
    'https://picsum.photos/800/600?grayscale',
    'https://picsum.photos/800/600?grayscale',
    'https://picsum.photos/800/600?grayscale',
    'https://picsum.photos/800/600?grayscale',
    'https://picsum.photos/800/600?grayscale',
    'https://picsum.photos/800/600?grayscale',
    'https://picsum.photos/800/600?grayscale',
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dotted-background dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Photography Portfolio</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((url, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg shadow-lg"
              onClick={() => setSelectedImage(url)}
            >
              <div className="group aspect-w-4 aspect-h-3">
                <Image
                  src={url}
                  alt={`Photography ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Image
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <Image
              src={selectedImage}
              alt="Selected"
              width={800}
              height={600}
              objectFit="contain"
            />
            <button
              className="absolute top-0 right-0 m-4 text-white text-2xl"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
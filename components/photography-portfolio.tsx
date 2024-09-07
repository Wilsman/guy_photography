'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ImageOverlay } from './ImageOverlay' // Adjust the import path as necessary
import { Progress } from './ui/progress' // Adjust the import path as necessary

export default function PhotographyPortfolio() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [images, setImages] = useState<{ full: string, placeholder: string }[]>([])
  const [loadingProgress, setLoadingProgress] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState<boolean[]>([])

  useEffect(() => {
    const generatedImages = Array.from({ length: 12 }, () => {
      const seed = Math.floor(Math.random() * 1000)
      return {
        full: `https://picsum.photos/seed/${seed}/800/600`,
        placeholder: `https://picsum.photos/seed/${seed}/20/15`
      }
    })
    setImages(generatedImages)
    setLoadingProgress(new Array(generatedImages.length).fill(0))
    setIsLoading(new Array(generatedImages.length).fill(true))
  }, [])

  useEffect(() => {
    if (images.length > 0) {
      images.forEach((image, index) => {
        const img = new window.Image() // Use the native Image constructor
        img.src = image.full
        img.onload = () => {
          setLoadingProgress((prevProgress) => {
            const newProgress = [...prevProgress]
            newProgress[index] = 100
            return newProgress
          })
          setIsLoading((prevLoading) => {
            const newLoading = [...prevLoading]
            newLoading[index] = false
            return newLoading
          })
        }
        img.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100
            setLoadingProgress((prevProgress) => {
              const newProgress = [...prevProgress]
              newProgress[index] = percentComplete
              return newProgress
            })
          }
        }
      })
    }
  }, [images])

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 dotted-background dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-5xl font-bold text-center text-foreground mb-12 cursor-pointer"
          whileHover={{ scale: 1.1, color: '#1f2937' }} // Tailwind color for dark gray
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Guys Amazing Photos
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg shadow-lg"
              onClick={() => setSelectedImage(image.full)}
            >
              <div className="group aspect-w-4 aspect-h-3">
                {isLoading[index] ? (
                  <Image
                    src={image.placeholder}
                    alt={`Placeholder for Photography ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="blur-sm"
                  />
                ) : (
                  <Image
                    src={image.full}
                    alt={`Photography ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                )}
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
        <ImageOverlay image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  )
}
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ImageOverlay } from '../../components/ImageOverlay'

type ImageFile = {
  name: string
  type: string
}

const IMAGES_PER_PAGE = 3
const REPO_URL = 'https://api.github.com/repos/Wilsman/guy_photography/contents/public/images'
const BASE_URL = 'https://raw.githubusercontent.com/Wilsman/guy_photography/master/public/images'

export default function PhotographyPortfolio() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [images, setImages] = useState<{ full: string, placeholder: string }[]>([])
  const [isLoading, setIsLoading] = useState<boolean[]>([])
  const [page, setPage] = useState(1)
  const loadedImages = useRef<Set<string>>(new Set())

  const fetchImages = useCallback(async () => {
    try {
      const response = await fetch(REPO_URL)
      const data: ImageFile[] = await response.json()

      const imageFiles = data.filter(file => file.type === 'file' && file.name.match(/\.(jpg|jpeg|png|gif)$/i))

      const generatedImages = imageFiles.map(file => ({
        full: `${BASE_URL}/${file.name}`,
        placeholder: `${BASE_URL}/${file.name}?w=10&h=10&fit=crop&auto=format`
      }))

      setImages(generatedImages)
      setIsLoading(new Array(generatedImages.length).fill(true))
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }, [])

  interface Image {
    full: string;
  }

  const loadImage = useCallback((image: Image, index: number) => {
    if (loadedImages.current.has(image.full)) {
      return
    }

    fetch(image.full)
      .then(response => response.blob())
      .then(blob => {
        const img = new window.Image()
        img.src = URL.createObjectURL(blob)
        img.onload = () => {
          loadedImages.current.add(image.full)
          setIsLoading(prevLoading => {
            const newLoading = [...prevLoading]
            newLoading[index] = false
            return newLoading
          })
        }
      })
  }, [])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  useEffect(() => {
    if (images.length > 0) {
      const startIndex = (page - 1) * IMAGES_PER_PAGE
      const endIndex = startIndex + IMAGES_PER_PAGE
      const currentImages = images.slice(startIndex, endIndex)

      currentImages.forEach((image, index) => {
        if (isLoading[startIndex + index]) {
          loadImage(image, startIndex + index)
        }
      })
    }
  }, [images, page, isLoading, loadImage])

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1)
  }

  const displayedImages = images.slice(0, page * IMAGES_PER_PAGE)

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 dotted-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg shadow-lg"
              onClick={() => setSelectedImage(image.full)}
            >
              <div className="group aspect-w-4 aspect-h-3">
                <Image
                  src={image.placeholder}
                  alt={`Placeholder Photography ${index + 1}`}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className="blur-sm shadow-sm border border-gray-300"
                  loading="lazy"
                />
                {!isLoading[index] && (
                  <Image
                    src={image.full}
                    alt={`Photography ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="transition-transform duration-300 ease-in-out group-hover:scale-110 shadow-sm border border-gray-300"
                    loading="lazy"
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
        {displayedImages.length < images.length && (
          <div className="flex justify-center">
            <button onClick={loadMoreImages} className="mt-8 px-4 py-2 bg-teal-500 text-white rounded">
              Load More
            </button>
          </div>
        )}
      </div>

      {selectedImage && (
        <ImageOverlay image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  )
}
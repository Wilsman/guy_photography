'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ImageOverlay } from '../../components/ImageOverlay'
import { Progress } from '../../components/ui/progress'

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
  const [loadingProgress, setLoadingProgress] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState<boolean[]>([])
  const [page, setPage] = useState(1)
  const [summary, setSummary] = useState<Set<string>>(new Set())

  const fetchImages = useCallback(async () => {
    try {
      const startTime = performance.now()

      const response = await fetch(REPO_URL)
      const data: ImageFile[] = await response.json()

      const endTime = performance.now()
      const fetchTime = (endTime - startTime).toFixed(2)

      const imageFiles = data.filter(file => file.type === 'file' && file.name.match(/\.(jpg|jpeg|png|gif)$/i))

      const generatedImages = imageFiles.map(file => ({
        full: `${BASE_URL}/${file.name}`,
        placeholder: `${BASE_URL}/${file.name}?w=10&h=10&fit=crop&auto=format`
      }))

      setImages(generatedImages)
      setLoadingProgress(new Array(generatedImages.length).fill(0))
      setIsLoading(new Array(generatedImages.length).fill(true))

      setSummary(prevSummary => {
        const newSummary = new Set(prevSummary)
        newSummary.add(`Fetched image list in ${fetchTime} ms`)
        return newSummary
      })
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }, [])

    interface Image {
    full: string;
    // Add other properties if needed
  }
  
  const loadImage = useCallback((image: Image, index: number) => {
    const imgStartTime = performance.now();
  
    fetch(image.full)
      .then(response => response.blob())
      .then(blob => {
        const imgEndTime = performance.now();
        const fetchTime = (imgEndTime - imgStartTime).toFixed(2);
        const imgSize = (blob.size / 1024).toFixed(2);
  
        const img = new window.Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => {
          setLoadingProgress(prevProgress => {
            const newProgress = [...prevProgress];
            newProgress[index] = 100;
            return newProgress;
          });
  
          setIsLoading(prevLoading => {
            const newLoading = [...prevLoading];
            newLoading[index] = false;
            return newLoading;
          });
  
          setSummary(prevSummary => {
            const newSummary = new Set(prevSummary);
            newSummary.add(`Loaded image ${image.full} in ${fetchTime} ms, size: ${imgSize} KB`);
            return newSummary;
          });
        };
      });
  }, []);

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
          <div className="absolute inset-0 flex items-center justify-center">
            <Progress value={loadingProgress[index]} className="w-3/4 bg-gray-200" />
          </div>
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

      {summary.size > 0 && (
      <div className="mt-8 p-4 bg-gray-800 rounded">
        <h2 className="text-lg font-semibold">Summary</h2>
        <pre className="whitespace-pre-wrap">{Array.from(summary).join('\n')}</pre>
      </div>
      )}
    </div>
  )
}
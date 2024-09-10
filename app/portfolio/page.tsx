'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ImageOverlay } from '../../components/ImageOverlay'
import { Button } from '../../components/ui/button'
import { createClient } from '@supabase/supabase-js'


const IMAGES_PER_PAGE = 3

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function PhotographyPortfolio() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [images, setImages] = useState<{ full: string, placeholder: string }[]>([])
  const [page, setPage] = useState(1)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const isMobile = useRef<boolean>(false)

  const fetchImages = useCallback(async () => {
    try {
      const { data, error } = await supabase.storage.from('dank-pics').list()
      if (error) throw error

      const imageFiles = data.filter(file => file.name.match(/\.(jpg|jpeg|png|gif)$/i))

      const generatedImages = imageFiles.map(file => {
        const publicUrl = supabase.storage.from('dank-pics').getPublicUrl(file.name).data.publicUrl;
        return {
          full: publicUrl,
          placeholder: `${publicUrl}?w=10&h=10&fit=crop&auto=format`
        };
      });

      setImages(generatedImages)
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }, [])

  useEffect(() => {
    fetchImages();
  
    const intervalId = setInterval(fetchImages, 5000); // Poll every 5 seconds
  
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchImages])

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    isMobile.current = mediaQuery.matches

    if (isMobile.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMoreImages()
          }
        },
        { threshold: 1.0 }
      )

      const currentLoadMoreRef = loadMoreRef.current
      if (currentLoadMoreRef) {
        observer.observe(currentLoadMoreRef)
      }

      return () => {
        if (currentLoadMoreRef) {
          observer.unobserve(currentLoadMoreRef)
        }
      }
    } else {
      setPage(Math.ceil(images.length / IMAGES_PER_PAGE))
    }
  }, [loadMoreRef, images.length])

  useEffect(() => {
    document.body.classList.add('body-overflow-hidden')

    return () => {
      document.body.classList.remove('body-overflow-hidden')
    }
  }, [])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return
  
    // Convert FileList to an array
    const filesArray = Array.from(files)
  
    for (const file of filesArray) {
      const { data, error } = await supabase.storage.from('dank-pics').upload(file.name, file)
      if (error) {
        console.error('Error uploading file:', error)
      } else {
        console.log('File uploaded successfully:', data)
      }
    }

    // Fetch images after upload is complete
    fetchImages()
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
                  src={image.full}
                  alt={`Photography ${index + 1}`}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 ease-in-out group-hover:scale-110 shadow-sm border border-gray-300"
                  loading={index < IMAGES_PER_PAGE ? 'eager' : 'lazy'}
                  priority={index < IMAGES_PER_PAGE}
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
        <div ref={loadMoreRef} className="flex justify-center mt-8">
        </div>
      </div>

      {selectedImage && (
        <ImageOverlay image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}

      <div className="fixed bottom-4 right-4 flex items-center space-x-2">
        <input type="file" multiple className="hidden" id="fileInput" onChange={handleFileUpload} />
        <Button asChild>
          <label htmlFor="fileInput" className="cursor-pointer">
            Upload Images
          </label>
        </Button>
      </div>
    </div>
  )
}
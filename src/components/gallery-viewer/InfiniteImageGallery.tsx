import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageItem, InfiniteImageGalleryProps, LOAD_IMAGE_COUNT } from './types';

const InfiniteImageGallery = ({ 
  images,
  onLoadMore,
  hasMore = true,
  isLoading = false
}: InfiniteImageGalleryProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Handle image loading
  const handleImageLoad = useCallback((id: string) => {
    setLoadedImages(prev => new Set(prev).add(id));
  }, []);

  // Load more images when scrolled to bottom
  useEffect(() => {
    if (inView && !isLoading && hasMore && onLoadMore) {
      onLoadMore();
    }
  }, [inView, isLoading, hasMore, onLoadMore]);



  // Handle keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
        setCurrentIndex(-1);
      } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        const nextIndex = currentIndex + 1;
        setSelectedImage(images[nextIndex]);
        setCurrentIndex(nextIndex);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        setSelectedImage(images[prevIndex]);
        setCurrentIndex(prevIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex, images]);

  // Handle image click to set current index
  const handleImageClick = (image: ImageItem) => {
    const index = images.findIndex(img => img.id === image.id);
    setCurrentIndex(index);
    setSelectedImage(image);
  };

  // Render square skeleton loaders
  const renderSkeletons = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <div 
        key={`skeleton-${index}`}
        // className="relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800"
        className="relative overflow-hidden rounded-lg bg-background-dark"
        style={{
          aspectRatio: '1',
          width: '100%',
          height: 'auto'
        }}
      >
        <motion.div
          // className="absolute inset-0 bg-gray-300 dark:bg-gray-700"
          className="absolute inset-0 bg-background-dark dark:bg-background-dark/60"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
      </div>
    ));
  };

  // Check if we should show loading skeletons
  const showSkeletons = isLoading && images.length === 0;

  return (
    <div className="w-full">
      <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-3">
        {/* Show loading skeletons if no images are loaded yet */}
        {showSkeletons && renderSkeletons(LOAD_IMAGE_COUNT)}
        
        {/* Render actual images */}
        {images.map((image) => {
          const isLoaded = loadedImages.has(image.id);
          
          return (
            <motion.div
              key={image.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              style={{
                aspectRatio: '1',
                width: '100%',
                height: 'auto',
                position: 'relative',
                paddingBottom: '100%' // This ensures the container is square
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleImageClick(image)}
            >
              {/* Skeleton Loader - Shows while image is loading */}
              {!isLoaded && (
                // <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="absolute inset-0 bg-background-dark dark:bg-background-dark/60 rounded-lg flex items-center justify-center">

                  <motion.div
                    // className="absolute inset-0 bg-gray-300 dark:bg-gray-700"
                    className="absolute inset-0 bg-background-dark dark:bg-background-dark/60"
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut'
                    }}
                  />
                </div>
              )}

              {/* Actual Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  onLoad={() => handleImageLoad(image.id)}
                  className={`max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-500 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto'
                  }}
                />
              </div>

              {/* Image Overlay with Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg">{image.title}</h3>
                {image.description && (
                  <p className="text-gray-300 text-sm">{image.description}</p>
                )}
              </div>
            </motion.div>
          );
        })}
        
        {/* Loading indicator at the bottom when loading more */}
        {isLoading && images.length > 0 && (
          <div 
            ref={loadMoreRef}
            className="col-span-full flex justify-center py-8"
          >
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-primary/60"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    repeatType: "loop"
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            ref={modalRef}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === modalRef.current && setSelectedImage(null)}
            tabIndex={-1}
          >
            <motion.div 
              className="relative max-w-4xl w-full max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] mx-auto object-contain"
              />
              <div className="mt-4 text-center text-white">
                <h2 className="text-2xl font-bold">{selectedImage.title}</h2>
                {selectedImage.description && (
                  <p className="mt-2 text-gray-300">{selectedImage.description}</p>
                )}
                <div className="mt-2 text-sm text-gray-400">
                  {currentIndex + 1} / {images.length}
                </div>
              </div>
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 z-30 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                onClick={() => {
                  setSelectedImage(null);
                  setCurrentIndex(-1);
                }}
                aria-label="Close"
              >
                <div className="w-6 h-6 text-white flex items-center justify-center">
                  &times;
                </div>
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentIndex > 0) {
                    const prevIndex = currentIndex - 1;
                    setSelectedImage(images[prevIndex]);
                    setCurrentIndex(prevIndex);
                  }
                }}
                className={`absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full 
                           bg-white/20 backdrop-blur-md hover:bg-white/30 
                           transition-all duration-300 hover:scale-110
                           focus:outline-none focus:ring-2 focus:ring-primary/60
                           active:scale-95 touch-manipulation ${currentIndex === 0 ? 'opacity-50 cursor-default' : 'cursor-pointer'}`}
                disabled={currentIndex === 0}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentIndex < images.length - 1) {
                    const nextIndex = currentIndex + 1;
                    setSelectedImage(images[nextIndex]);
                    setCurrentIndex(nextIndex);
                  }
                }}
                className={`absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full 
                           bg-white/20 backdrop-blur-md hover:bg-white/30 
                           transition-all duration-300 hover:scale-110
                           focus:outline-none focus:ring-2 focus:ring-primary/60
                           active:scale-95 touch-manipulation ${currentIndex === images.length - 1 ? 'opacity-50 cursor-default' : 'cursor-pointer'}`}
                disabled={currentIndex === images.length - 1}
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfiniteImageGallery;
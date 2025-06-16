import { useState, useCallback, useEffect } from 'react';
import InfiniteImageGallery from './gallery-viewer/InfiniteImageGallery';
import { useInfiniteScroll } from './gallery-viewer/useInfiniteScroll';
import { LOAD_IMAGE_COUNT } from './gallery-viewer/types';

interface ImageItem {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
  description?: string;
}

// Generate random square images from picsum.photos
const generateRandomImages = (count: number, startIndex = 0): ImageItem[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = startIndex + i + 1;
    const size = 500;
    
    return {
      id: `img-${id}`,
      src: `https://picsum.photos/seed/art-${id}/${size}/${size}`,
      alt: `Artwork ${id}`,
      width: size,
      height: size,
      title: `Artwork ${id}`,
      description: `Description for artwork ${id}`
    };
  });
};

const Portfolio = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const MAX_PAGES = 10; // TODO REPLACE WITH IMAGEARRAY.length()

  // Initial load
  useEffect(() => {
    const loadInitialImages = async () => {
      if (images.length > 0) return; // Don't reload if we already have images
      
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      const initialImages = generateRandomImages(LOAD_IMAGE_COUNT, 0);
      setImages(initialImages);
      setPage(1);
      setIsLoading(false);
    };
    
    loadInitialImages();
  }, [images.length]);

  // Load more images
  const loadMoreImages = useCallback(async () => {
    if (!hasMore || isLoading) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newImages = generateRandomImages(LOAD_IMAGE_COUNT, images.length);
      setImages(prev => [...prev, ...newImages]);
      
      // Stop after reaching max pages
      if (page >= MAX_PAGES - 1) {
        setHasMore(false);
      } else {
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error loading more images:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading, images.length]);
  
  // Use infinite scroll hook
  const { isFetching } = useInfiniteScroll(loadMoreImages, hasMore, isLoading);

  return (
    <section id="portfolio" className="relative py-20 bg-transparent">
      <div className="container relative z-10 mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
          Portfolio
        </h2>
        
        <InfiniteImageGallery
          images={images}
          hasMore={hasMore}
          isLoading={isLoading || isFetching}
        />
      </div>
    </section>
  );
};

export default Portfolio; 
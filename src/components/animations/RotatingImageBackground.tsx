import React, { useMemo, useState, useEffect, useCallback } from 'react';

interface Spiral {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  opacity: number;
}

interface RotatingImageBgProps {
  children?: React.ReactNode;
  image: string;
  imageCount?: number;
  minSize?: number;
  maxSize?: number;
  minOpacity?: number;
  maxOpacity?: number;
  minSpeed?: number;
  maxSpeed?: number;
}

const MIN_DISTANCE = 50; // Minimum distance between spirals
const MAX_ATTEMPTS = 50; // Maximum attempts to place a spiral before giving up
const DEBOUNCE_AMOUNT_MS = 200; // time to wait in ms before resize (to handle fix up)_

const RotatingImageBackground: React.FC<RotatingImageBgProps> = ({
  children,
  image,
  imageCount = 20,
  minSize = 20,
  maxSize = 100,
  minOpacity = 0.025,
  maxOpacity = 0.15,
  minSpeed = 10,
  maxSpeed = 30,
}) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  
  // Debounce function
  const debounce = useCallback((func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }, []);
  
  // Handle window resize with both debounce and size threshold check
  const handleResize = useCallback(debounce(() => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    const widthDiff = Math.abs(newWidth - windowSize.width);
    const heightDiff = Math.abs(newHeight - windowSize.height);
    
    // Only update if the change is significant (more than 300px in any dimension)
    if (widthDiff > 300 || heightDiff > 300) {
      setWindowSize({
        width: newWidth,
        height: newHeight,
      });
    }
  }, DEBOUNCE_AMOUNT_MS), [windowSize.width, windowSize.height]);
  
  // Set up and clean up resize event
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Set up and clean up resize event
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Generate spiral positions with collision detection
  const spirals = useMemo(() => {
    const result: Spiral[] = [];
    const viewportWidth = windowSize.width;
    const viewportHeight = windowSize.height;

    // Skip if we don't have valid dimensions yet
    if (viewportWidth === 0 || viewportHeight === 0) {
      return result;
    }

    for (let i = 0; i < imageCount; i++) {
      let x = 0;
      let y = 0;
      let validPosition = false;
      let attempts = 0;

      while (!validPosition && attempts < MAX_ATTEMPTS) {
        validPosition = false;
        x = Math.random() * viewportWidth;
        y = Math.random() * viewportHeight;
        validPosition = true;

        // Check against existing spirals
        for (const spiral of result) {
          const dx = x - spiral.x;
          const dy = y - spiral.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minAllowedDistance = (spiral.size / 2) + MIN_DISTANCE;

          if (distance < minAllowedDistance) {
            // Try to adjust position
            const angle = Math.atan2(dy, dx);
            const newX = x + (Math.cos(angle) * (minAllowedDistance + Math.random() * 30 + 20));
            const newY = y + (Math.sin(angle) * (minAllowedDistance + Math.random() * 30 + 20));
            
            // Check if new position is within bounds
            if (newX >= 0 && newX <= viewportWidth && newY >= 0 && newY <= viewportHeight) {
              x = newX;
              y = newY;
              validPosition = true;
            } else {
              validPosition = false;
              break;
            }
          }
        }

        attempts++;
      }

      if (validPosition) {
        result.push({
          id: i,
          x,
          y,
          size: minSize + Math.random() * (maxSize - minSize),
          rotation: Math.random() * 360,
          speed: minSpeed + Math.random() * (maxSpeed - minSpeed),
          opacity: minOpacity + Math.random() * (maxOpacity - minOpacity),
        });
      }
    }

    return result;
  }, [
    imageCount,
    minSize,
    maxSize,
    minOpacity,
    maxOpacity,
    minSpeed,
    maxSpeed,
    windowSize.width,
    windowSize.height,
  ]);

  return (
    <div 
      className="fixed inset-0 w-screen h-screen overflow-hidden -z-10"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1
      }}
      >
      <style>
        {`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}
      </style>
      <div className="absolute inset-0">
        {spirals.map((spiral) => (
          <div
            key={spiral.id}
            className="absolute"
            style={{
              left: `${spiral.x}px`,
              top: `${spiral.y}px`,
              width: `${spiral.size}px`,
              height: `${spiral.size}px`,
              opacity: spiral.opacity,
              transform: `rotate(${spiral.rotation}deg)`,
              animation: `spin ${spiral.speed}s linear infinite`,
              transformOrigin: 'center',
              pointerEvents: 'none',
            }}
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default RotatingImageBackground;
export { RotatingImageBackground };
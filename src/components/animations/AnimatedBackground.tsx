import React from 'react';
import './AnimatedBackground.css';

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children }) => {
  const starCount = 200; // Number of stars to generate

  const renderStars = () => {
    return Array.from({ length: starCount }, (_, index) => {
      const size = Math.random() * 2;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const animationDelay = Math.random() * 5;
      const duration = Math.random() * 3 + 2;

      return (
        <div
          key={index}
          className="star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${animationDelay}s`,
            animationDuration: `${duration}s`
          }}
        />
      );
    });
  };

  return (
    <div className="animated-background absolute inset-0 w-full h-full bg-transparent">
      <div className="background-gradient absolute inset-0">
        <div className="stars-container absolute inset-0">
          {renderStars()}
        </div>
      </div>
      <div className="content-container">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
export { AnimatedBackground };

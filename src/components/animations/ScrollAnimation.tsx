import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

interface ScrollAnimationProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

export function ScrollAnimation({ 
  children, 
  delay = 0, 
  direction = 'up',
  distance = 50 
}: ScrollAnimationProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, x: 0 }
      case 'down': return { y: -distance, x: 0 }
      case 'left': return { x: distance, y: 0 }
      case 'right': return { x: -distance, y: 0 }
      default: return { y: distance, x: 0 }
    }
  }

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: delay,
          ease: [0.4, 0, 0.2, 1]
        }
      })
    }
  }, [controls, inView, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ ...getInitialPosition(), opacity: 0 }}
      animate={controls}
    >
      {children}
    </motion.div>
  )
}

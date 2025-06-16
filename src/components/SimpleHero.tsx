import { motion } from 'framer-motion'
import { FONT_BRAND_NAME, BRIEF_DESCRIPTION } from '../globals'

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-transparent">
      <div className="container mx-auto px-5 text-center">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            // className="mb-6 text-4xl font-bold md:text-6xl gradient-text"
            // className="mb-4 text-9xl text-content-primary font-bold hero-shadow"

            className="mb-4 text-9xl text-content-white font-bold hero-shadow"
            style={{ fontFamily: 'AnandaBlack' }} 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {FONT_BRAND_NAME}
          </motion.h1>

          <motion.p 
            className="text-xl text-content-white max-w-2xl mx-auto subtle-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {/* Handmade Tasmanian Clothing made with ❤️ */}
            {BRIEF_DESCRIPTION}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
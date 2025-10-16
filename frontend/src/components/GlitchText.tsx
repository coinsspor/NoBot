import { motion } from 'framer-motion'

interface GlitchTextProps {
  children: string
  className?: string
}

export default function GlitchText({ children, className = '' }: GlitchTextProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        animate={{
          textShadow: [
            '2px 0 0 #00f0ff, -2px 0 0 #b537f2',
            '-2px 0 0 #00f0ff, 2px 0 0 #b537f2',
            '2px 0 0 #00f0ff, -2px 0 0 #b537f2',
          ],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 5,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

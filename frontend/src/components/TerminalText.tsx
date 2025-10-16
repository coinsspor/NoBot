import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function TerminalText({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.8, 1] }}
      transition={{ duration: 0.5, delay }}
      className="font-mono text-[#0f0] drop-shadow-[0_0_8px_#0f0]"
    >
      {children}
    </motion.div>
  )
}

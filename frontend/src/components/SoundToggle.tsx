import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

interface SoundToggleProps {
  enabled: boolean
  onToggle: () => void
}

export default function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className="border border-[#0f0] bg-[#0f0]/10 p-2 hover:bg-[#0f0]/20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {enabled ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
    </motion.button>
  )
}

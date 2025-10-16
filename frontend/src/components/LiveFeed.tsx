import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Mint {
  id: number
  user: string
  tokenId: number
  timestamp: number
}

const NAMES = ['alice', 'bob', 'charlie', 'dave', 'eve', 'frank', 'grace', 'henry', 'iris', 'jack']

export default function LiveFeed() {
  const [mints, setMints] = useState<Mint[]>([])

  useEffect(() => {
    const initial = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      user: NAMES[Math.floor(Math.random() * NAMES.length)],
      tokenId: 5234 - i,
      timestamp: Date.now() - i * 5000,
    }))
    setMints(initial)

    const interval = setInterval(() => {
      const newMint: Mint = {
        id: Date.now(),
        user: NAMES[Math.floor(Math.random() * NAMES.length)],
        tokenId: Math.floor(Math.random() * 10000),
        timestamp: Date.now(),
      }
      setMints(prev => [newMint, ...prev.slice(0, 9)])
    }, Math.random() * 5000 + 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hidden xl:block fixed right-8 top-48 z-40 w-80">
      <div className="border-2 border-[#0f0] bg-black/95 p-4 shadow-[0_0_20px_#0f0]">
        <div className="mb-4 flex items-center justify-between border-b border-[#0f0] pb-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#0f0]" />
            <span className="text-xs font-bold">LIVE FEED</span>
          </div>
          <span className="text-xs opacity-70">{mints.length}/10</span>
        </div>

        <div className="space-y-2 overflow-hidden max-h-96">
          <AnimatePresence initial={false}>
            {mints.map((mint) => (
              <motion.div
                key={mint.id}
                initial={{ opacity: 0, x: 20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                className="border border-[#0f0]/50 bg-[#0f0]/5 p-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">@{mint.user}</span>
                  <span className="opacity-70">#{mint.tokenId}</span>
                </div>
                <div className="mt-1 text-[10px] opacity-50">
                  {new Date(mint.timestamp).toLocaleTimeString()}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

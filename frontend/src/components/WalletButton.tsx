import { motion } from 'framer-motion'
import { Wallet } from 'lucide-react'

interface WalletButtonProps {
  connected: boolean
  address: string | null
  loading: boolean
  onConnect: () => void
  onDisconnect: () => void
}

export default function WalletButton({ 
  connected, 
  address, 
  loading, 
  onConnect, 
  onDisconnect 
}: WalletButtonProps) {
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (connected && address) {
    return (
      <motion.button
        onClick={onDisconnect}
        className="flex items-center gap-2 border-2 border-[#0f0] bg-[#0f0]/10 px-4 py-2 text-sm hover:bg-[#0f0]/20"
        whileHover={{ scale: 1.02 }}
      >
        <Wallet className="h-4 w-4" />
        {formatAddress(address)}
      </motion.button>
    )
  }

  return (
    <motion.button
      onClick={onConnect}
      disabled={loading}
      className="flex items-center gap-2 border-2 border-[#0f0] bg-[#0f0]/10 px-4 py-2 text-sm hover:bg-[#0f0]/20 disabled:opacity-50"
      whileHover={{ scale: loading ? 1 : 1.02 }}
    >
      <Wallet className="h-4 w-4" />
      {loading ? 'CONNECTING...' : 'CONNECT WALLET'}
    </motion.button>
  )
}

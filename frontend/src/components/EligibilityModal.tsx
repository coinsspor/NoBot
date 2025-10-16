import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useContract } from '../hooks/useContract'

interface EligibilityModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  onError?: () => void
}

export default function EligibilityModal({ isOpen, onClose, onSuccess, onError }: EligibilityModalProps) {
  const [step, setStep] = useState(0)
  const [result, setResult] = useState<any>(null)
  const { connected, address, connect, checkEligibility } = useContract()

  useEffect(() => {
    if (isOpen) {
      setStep(0)
      setResult(null)
    }
  }, [isOpen])

  const handleCheckEligibility = async () => {
    if (!connected) {
      setStep(1)
      const addr = await connect()
      setStep(2)
      await new Promise(r => setTimeout(r, 1000))
      await runEligibilityCheck(addr)
    } else if (address) {
      setStep(2)
      await runEligibilityCheck(address)
    }
  }

  const runEligibilityCheck = async (addr: string) => {
    setStep(3)
    await new Promise(r => setTimeout(r, 1000))
    setStep(4)
    await new Promise(r => setTimeout(r, 1500))
    
    const eligibilityResult = await checkEligibility(addr)
    setResult(eligibilityResult)
    setStep(5)
    
    if (eligibilityResult.eligible && onSuccess) {
      onSuccess()
    } else if (!eligibilityResult.eligible && onError) {
      onError()
    }
  }

  const reset = () => {
    setStep(0)
    setResult(null)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl border-4 border-[#0f0] bg-black p-8 shadow-[0_0_40px_#0f0]"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-[#0f0] hover:text-[#0f0]/70"
            >
              <X />
            </button>

            <div className="mb-6 border-b border-[#0f0] pb-4">
              <div className="text-2xl font-bold">{'>'} ELIGIBILITY CHECK</div>
            </div>

            {step === 0 && (
              <div className="space-y-4">
                <div className="text-sm opacity-70">
                  This will analyze your wallet to determine eligibility:
                </div>
                <ul className="ml-6 space-y-2 text-sm">
                  <li>{'>'} Wallet age (minimum 30 days)</li>
                  <li>{'>'} Transaction history (minimum 3 transactions)</li>
                  <li>{'>'} Total transaction value (minimum 0.01 ETH)</li>
                  <li>{'>'} AI behavioral pattern analysis</li>
                </ul>
                <button
                  onClick={handleCheckEligibility}
                  className="mt-6 w-full border-2 border-[#0f0] bg-[#0f0]/10 py-3 font-bold hover:bg-[#0f0]/20"
                >
                  {'>'} START ANALYSIS {'<'}
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4 text-center">
                <div className="animate-pulse text-xl">CONNECTING WALLET...</div>
                <div className="text-sm opacity-70">Please approve connection</div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 text-center">
                <div className="animate-pulse text-xl">WALLET CONNECTED</div>
                <div className="text-sm opacity-70">Starting eligibility check...</div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 text-center">
                <div className="animate-pulse text-xl">ANALYZING WALLET...</div>
                <div className="text-sm opacity-70">Checking on-chain data</div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 text-center">
                <div className="animate-pulse text-xl">RUNNING AI ANALYSIS...</div>
                <div className="text-sm opacity-70">Pattern detection in progress</div>
              </div>
            )}

            {step === 5 && result && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className={`mb-4 text-4xl font-bold ${result.eligible ? 'text-[#0f0]' : 'text-red-500'}`}>
                    {result.eligible ? '✓ ELIGIBLE' : '✗ NOT ELIGIBLE'}
                  </div>
                </div>

                <div className="space-y-3 border border-[#0f0] p-4">
                  <div className="flex justify-between">
                    <span>Wallet Age:</span>
                    <span className="font-bold">{result.walletAge} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TX Count:</span>
                    <span className="font-bold">{result.txCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Volume:</span>
                    <span className="font-bold">{result.totalVolume} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Score:</span>
                    <span className="font-bold">{result.aiScore.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Label:</span>
                    <span className="font-bold">{result.aiLabel}</span>
                  </div>
                </div>

                {result.eligible && (
                  <button
                    className="w-full border-2 border-[#0f0] bg-[#0f0]/10 py-3 font-bold hover:bg-[#0f0]/20"
                  >
                    {'>'} JOIN QUEUE {'<'}
                  </button>
                )}

                <button
                  onClick={reset}
                  className="w-full border border-[#0f0]/50 py-2 text-sm hover:border-[#0f0]"
                >
                  CHECK AGAIN
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

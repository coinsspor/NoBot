import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CRTScreen from '../components/CRTScreen'
import TerminalText from '../components/TerminalText'
import EligibilityModal from '../components/EligibilityModal'
import LiveFeed from '../components/LiveFeed'

interface HomePageProps {
  onCheckEligibility: () => void
  onModalClose: () => void
  modalOpen: boolean
  onSuccess: () => void
  onError: () => void
}

export default function HomePage({ onCheckEligibility, onModalClose, modalOpen, onSuccess, onError }: HomePageProps) {
  const [time, setTime] = useState({ h: 1, m: 59, s: 58 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <LiveFeed />
      
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 text-center"
        >
          <div className="mb-4 text-6xl font-bold animate-glow">
            ░N░O░B░O░T░
          </div>
          <div className="text-sm tracking-[0.3em]">
            FAIR LAUNCH TERMINAL v1.0.0
          </div>
        </motion.div>

        <CRTScreen>
          <div className="space-y-6">
            <TerminalText delay={0.2}>
              <div className="border-b border-[#0f0] pb-2">
                {'>'} SYSTEM STATUS: ONLINE
              </div>
            </TerminalText>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { id: 'INST_FIN', name: 'INSTANT FINALITY', desc: 'LINERA MICROCHAINS' },
                { id: 'FAIR_QUE', name: 'FAIR QUEUE', desc: 'EQUAL OPPORTUNITY' },
                { id: 'AI_PROT', name: 'AI PROTECTED', desc: 'MCP DETECTION' },
              ].map((feature, i) => (
                <TerminalText key={feature.id} delay={0.4 + i * 0.1}>
                  <div className="border border-[#0f0] p-4">
                    <div className="mb-2 text-xs">{'>'} {feature.id}</div>
                    <div className="mb-1 font-bold">{feature.name}</div>
                    <div className="text-xs opacity-70">{feature.desc}</div>
                  </div>
                </TerminalText>
              ))}
            </div>

            <TerminalText delay={0.8}>
              <div className="mt-8 border border-[#0f0] p-8 text-center">
                <div className="mb-4 text-sm">LAUNCH COUNTDOWN</div>
                <div className="mb-6 text-6xl font-bold tabular-nums animate-flicker">
                  {String(time.h).padStart(2, '0')}:
                  {String(time.m).padStart(2, '0')}:
                  {String(time.s).padStart(2, '0')}
                </div>
                
                <motion.button
                  onClick={onCheckEligibility}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#0f0] bg-[#0f0]/10 px-8 py-3 font-bold uppercase tracking-wider hover:bg-[#0f0]/20"
                >
                  {'>'} CHECK ELIGIBILITY {'<'}
                </motion.button>
              </div>
            </TerminalText>

            <TerminalText delay={1}>
              <div className="grid grid-cols-3 gap-4 border-t border-[#0f0] pt-4 text-center">
                {[
                  { label: 'SUPPLY', value: '10000' },
                  { label: 'QUEUE', value: '147' },
                  { label: 'SUCCESS', value: '94%' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </TerminalText>

            <TerminalText delay={1.2}>
              <div className="mt-4 border-t border-[#0f0] pt-2 text-xs">
                {'>'} LINERA PROTOCOL • ZERO GAS WARS • FAIR DISTRIBUTION
              </div>
            </TerminalText>
          </div>
        </CRTScreen>
      </div>

      <EligibilityModal 
        isOpen={modalOpen} 
        onClose={onModalClose}
        onSuccess={onSuccess}
        onError={onError}
      />
    </>
  )
}

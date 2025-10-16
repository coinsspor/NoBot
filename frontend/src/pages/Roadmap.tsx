import { motion } from 'framer-motion'
import CRTScreen from '../components/CRTScreen'

export default function Roadmap() {
  const phases = [
    {
      wave: 'WAVE 1',
      status: 'COMPLETED',
      date: 'Oct 14-16, 2024',
      features: [
        '✅ Multi-factor eligibility UI (wallet age, tx count, volume)',
        '✅ AI/MCP bot detection UI & scoring display',
        '✅ Fair queue interface with time-stamped order',
        '✅ Launch countdown timer (10-minute window)',
        '✅ Real-time metrics dashboard (supply, queue, success rate)',
        '✅ Live mint feed animation',
        '✅ Retro terminal CRT design with animations',
        '✅ Wagmi + Viem Web3 integration',
        '⏳ Backend API integration (Wave 2)'
      ]
    },
    {
      wave: 'WAVE 2',
      status: 'NEXT',
      date: 'TBD',
      features: [
        'Linera GraphQL API connection',
        'Real Etherscan eligibility checks',
        'Custom eligibility rules system',
        'Enhanced analytics & charts',
        'Export metrics (CSV/JSON)',
        'Multiple launch support',
        'Smart contract deployment'
      ]
    },
    {
      wave: 'WAVE 3',
      status: 'PLANNED',
      date: 'TBD',
      features: [
        'Multi-collection management',
        'Whitelist system',
        'Advanced AI pattern detection',
        'Dispute resolution mechanism',
        'Community governance tools',
        'Performance optimizations'
      ]
    },
    {
      wave: 'WAVE 4',
      status: 'PLANNED',
      date: 'TBD',
      features: [
        'TEE/committee validation',
        'Production deployment',
        'Security audit',
        'Documentation finalization',
        'Mainnet preparation',
        'Production optimizations'
      ]
    }
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <h1 className="mb-4 text-4xl font-bold">DEVELOPMENT ROADMAP</h1>
        <div className="text-sm opacity-70">NoBot Fair Launch Platform</div>
      </motion.div>

      <div className="space-y-6">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.wave}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CRTScreen>
              <div>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <div className="text-2xl font-bold">{phase.wave}</div>
                      <div className={`rounded border px-2 py-1 text-xs ${
                        phase.status === 'COMPLETED' 
                          ? 'border-[#00ff88] bg-[#00ff88]/20 text-[#00ff88]'
                          : phase.status === 'NEXT'
                          ? 'border-[#00f0ff] bg-[#00f0ff]/20 text-[#00f0ff]'
                          : 'border-[#0f0]/30 bg-[#0f0]/5'
                      }`}>
                        {phase.status}
                      </div>
                    </div>
                    <div className="text-xs opacity-70">{phase.date}</div>
                  </div>
                </div>

                <div className="grid gap-2 md:grid-cols-2">
                  {phase.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-[#0f0]">▸</span>
                      <span className="opacity-80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CRTScreen>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

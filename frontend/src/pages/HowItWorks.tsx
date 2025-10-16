import { motion } from 'framer-motion'
import CRTScreen from '../components/CRTScreen'
import TerminalText from '../components/TerminalText'

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <h1 className="mb-4 text-4xl font-bold">HOW IT WORKS</h1>
        <div className="text-sm opacity-70">Understanding the NoBot System</div>
      </motion.div>

      <CRTScreen>
        <div className="space-y-8">
          <TerminalText delay={0.1}>
            <div className="border-b border-[#0f0] pb-4">
              <div className="mb-2 text-xl font-bold">{'>'} STEP 1: ELIGIBILITY CHECK</div>
              <div className="space-y-2 text-sm opacity-80">
                <p>• Connect your wallet to the platform</p>
                <p>• System analyzes three key factors:</p>
                <p className="ml-4">- Wallet age (minimum 30 days)</p>
                <p className="ml-4">- Transaction history (minimum 3 transactions)</p>
                <p className="ml-4">- Total transaction value (minimum 0.01 ETH)</p>
                <p>• AI/MCP analyzes behavioral patterns</p>
                <p>• Receive instant eligibility result</p>
              </div>
            </div>
          </TerminalText>

          <TerminalText delay={0.2}>
            <div className="border-b border-[#0f0] pb-4">
              <div className="mb-2 text-xl font-bold">{'>'} STEP 2: FAIR QUEUE</div>
              <div className="space-y-2 text-sm opacity-80">
                <p>• Eligible users join the fair launch queue</p>
                <p>• Powered by Linera microchains for instant finality</p>
                <p>• Time-stamped order - first come, first served</p>
                <p>• No gas wars, no MEV, no front-running</p>
                <p>• Equal opportunity for all participants</p>
              </div>
            </div>
          </TerminalText>

          <TerminalText delay={0.3}>
            <div>
              <div className="mb-2 text-xl font-bold">{'>'} STEP 3: INSTANT MINT</div>
              <div className="space-y-2 text-sm opacity-80">
                <p>• Launch window opens (typically 10 minutes)</p>
                <p>• Click to claim your mint</p>
                <p>• Instant confirmation (P95 {'<'} 2 seconds)</p>
                <p>• Nonce-based duplicate prevention</p>
                <p>• Real-time supply tracking</p>
              </div>
            </div>
          </TerminalText>
        </div>
      </CRTScreen>
    </div>
  )
}

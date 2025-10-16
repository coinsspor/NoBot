import { motion } from 'framer-motion'
import { useState } from 'react'
import CRTScreen from '../components/CRTScreen'

const faqs = [
  {
    q: 'What is NoBot?',
    a: 'NoBot is a fair launch platform powered by Linera microchains that eliminates gas wars, MEV, and bot manipulation.'
  },
  {
    q: 'How does eligibility work?',
    a: 'We analyze wallet age, transaction history, and behavioral patterns using AI. Requirements: 30 days wallet age, 3 transactions, 0.01 ETH volume.'
  },
  {
    q: 'What are the fees?',
    a: 'Minting costs vary by project. No additional NoBot fees. Linera provides minimal and predictable gas fees.'
  },
  {
    q: 'Can I mint multiple times?',
    a: 'Each wallet can mint once per launch for fair distribution. Nonce-based duplicate prevention ensures no double claims.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <h1 className="mb-4 text-4xl font-bold">FAQ</h1>
      </motion.div>

      <CRTScreen>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-[#0f0]">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-4 text-left hover:bg-[#0f0]/10"
              >
                <div className="flex justify-between">
                  <div className="font-bold">{'>'} {faq.q}</div>
                  <div>{openIndex === index ? '−' : '+'}</div>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="border-t border-[#0f0] p-4 text-sm opacity-80">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </CRTScreen>
    </div>
  )
}

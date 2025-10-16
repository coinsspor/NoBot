import { ReactNode } from 'react'

export default function CRTScreen({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-lg border-8 border-[#2a2a1a] bg-[#0a0a00] p-8 shadow-[0_0_40px_#0f0]">
      <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,255,0,0.1)_100%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

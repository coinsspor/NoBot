import { motion } from 'framer-motion'

interface CountdownProps {
  hours: number
  minutes: number
  seconds: number
}

export default function Countdown({ hours, minutes, seconds }: CountdownProps) {
  const timeUnits = [
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ]

  return (
    <div className="flex items-center justify-center gap-4">
      {timeUnits.map((unit, index) => (
        <div key={unit.label}>
          <motion.div
            key={unit.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 backdrop-blur-sm"
          >
            <div className="text-5xl font-bold tabular-nums text-white">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="mt-2 text-xs uppercase tracking-wider text-gray-500">
              {unit.label}
            </div>
          </motion.div>
          {index < timeUnits.length - 1 && (
            <span className="mx-2 text-3xl text-gray-600">:</span>
          )}
        </div>
      ))}
    </div>
  )
}

import { motion } from 'framer-motion'

interface NavigationProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const pages = ['HOME', 'HOW IT WORKS', 'FAQ', 'ROADMAP']

  return (
    <div className="fixed left-4 top-4 z-50 md:left-8 md:top-8">
      <div className="border border-[#0f0] bg-black/95 p-3 md:p-4">
        <div className="mb-3 md:mb-4 border-b border-[#0f0] pb-2 text-xs md:text-sm font-bold">
          NAVIGATION
        </div>
        <nav className="space-y-2">
          {pages.map((page) => (
            <motion.button
              key={page}
              onClick={() => onNavigate(page)}
              className={`block w-full text-left text-[10px] md:text-xs transition-all ${
                currentPage === page
                  ? 'border-l-2 border-[#0f0] bg-[#0f0]/20 pl-2'
                  : 'pl-3 hover:pl-2 hover:border-l-2 hover:border-[#0f0]/50'
              }`}
              whileHover={{ x: 2 }}
            >
              {'>'} {page}
            </motion.button>
          ))}
        </nav>
      </div>
    </div>
  )
}

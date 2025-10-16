import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Scanlines from './components/Scanlines'
import ParticleBackground from './components/ParticleBackground'
import SoundToggle from './components/SoundToggle'
import Navigation from './components/Navigation'
import WalletButton from './components/WalletButton'
import Toast from './components/Toast'
import { useSound } from './hooks/useSound'
import { useContract } from './hooks/useContract'
import { useToast } from './hooks/useToast'

// Pages
import HomePage from './pages/HomePage'
import HowItWorks from './pages/HowItWorks'
import FAQ from './pages/FAQ'
import Roadmap from './pages/Roadmap'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('HOME')
  const { enabled: soundEnabled, play, toggle: toggleSound } = useSound()
  const { connected, address, loading, connect, disconnect } = useContract()
  const { toasts, removeToast, success, error, info } = useToast()

  const handleCheckEligibility = () => {
    play('beep')
    setModalOpen(true)
  }

  const handleNavigate = (page: string) => {
    play('beep')
    setCurrentPage(page)
  }

  const handleWalletConnect = async () => {
    play('beep')
    info('Connecting wallet...')
    await connect()
    success('Wallet connected!')
  }

  const handleWalletDisconnect = () => {
    play('beep')
    disconnect()
    info('Wallet disconnected')
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <ParticleBackground />
      <Scanlines />
      
      {/* Toast Container */}
      <div className="fixed left-1/2 top-8 z-[100] flex -translate-x-1/2 flex-col gap-2">
        <AnimatePresence>
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Navigation - Sol Üst */}
      <div className="fixed left-8 top-8 z-50">
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      </div>
      
      {/* Wallet + Sound - Sağ Üst */}
      <div className="fixed right-8 top-8 z-50 flex flex-col items-end gap-4">
        <WalletButton
          connected={connected}
          address={address}
          loading={loading}
          onConnect={handleWalletConnect}
          onDisconnect={handleWalletDisconnect}
        />
        
        <SoundToggle enabled={soundEnabled} onToggle={toggleSound} />
      </div>
      
      {/* Page Content */}
      {currentPage === 'HOME' && (
        <HomePage
          onCheckEligibility={handleCheckEligibility}
          onModalClose={() => {
            play('beep')
            setModalOpen(false)
          }}
          modalOpen={modalOpen}
          onSuccess={() => {
            play('success')
            success('Eligible! Ready to mint')
          }}
          onError={() => {
            play('error')
            error('Not eligible')
          }}
        />
      )}
      
      {currentPage === 'HOW IT WORKS' && <HowItWorks />}
      {currentPage === 'FAQ' && <FAQ />}
      {currentPage === 'ROADMAP' && <Roadmap />}
    </div>
  )
}

export default App

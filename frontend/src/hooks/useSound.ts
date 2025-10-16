import { useState, useCallback, useRef, useEffect } from 'react'

const sounds = {
  beep: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU2jdXyy3orBSh+zPLaizsKGGK37OmiUhELSqPh8bllHAU0i9Tyy3orBSh+zPLaizsKGGK37OmiUhELSqPh8bllHAU0i9Tyy3orBSh+zPLaizsKGGK37OmiUhELSqPh8bllHAU0i9Tyy3orBQ==',
  success: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAAD/AP8A/wCBgoSGi46Qk5aYmpyeoKKkpqiqrK6wsbO1t7m7vb/BwsPFx8nLzc/R09XX2dvd3+Hj5efo6uzt7/Hz9ff5+/3/AQMFB/n7/f8BAwUHCQsNDxETFRcZGx0fISMlJykrLS8xMzU3OTs9P0FDRUdJTE5QUlRWWFpdX2FjZWdqa21vcXN1d3p8fn+BiYuNj5GUlpeZm52fo6Wnqa2vsLK0tre5vL6/wcTGyMrMztDT1dfZ3N7g4uXn6evt7/Hz9vj6/P4=',
  error: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////',
}

type SoundType = keyof typeof sounds

export function useSound() {
  const [enabled, setEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled')
    return saved ? JSON.parse(saved) : true
  })
  
  const audioRefs = useRef<{ [key in SoundType]?: HTMLAudioElement }>({})

  useEffect(() => {
    // Preload sounds
    Object.entries(sounds).forEach(([key, src]) => {
      const audio = new Audio(src)
      audio.volume = 0.3
      audioRefs.current[key as SoundType] = audio
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(enabled))
  }, [enabled])

  const play = useCallback((sound: SoundType) => {
    if (!enabled) return
    
    const audio = audioRefs.current[sound]
    if (audio) {
      audio.currentTime = 0
      audio.play().catch(e => console.log('Audio play failed:', e))
    }
  }, [enabled])

  const toggle = useCallback(() => {
    setEnabled(prev => !prev)
  }, [])

  return { enabled, play, toggle }
}

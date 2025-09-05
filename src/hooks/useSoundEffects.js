import { useRef, useEffect } from 'react'

const useSoundEffects = () => {
  const audioContextRef = useRef(null)
  const soundsRef = useRef({})

  useEffect(() => {
    // Initialize Web Audio API
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    } catch (e) {
      console.log('Web Audio API not supported')
    }

    // Create sound effects using Web Audio API
    const createSound = (frequency, duration, type = 'sine') => {
      if (!audioContextRef.current) return

      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)
      
      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
      oscillator.type = type
      
      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration)
      
      oscillator.start(audioContextRef.current.currentTime)
      oscillator.stop(audioContextRef.current.currentTime + duration)
    }

    // Define enhanced sound effects
    soundsRef.current = {
      hover: () => createSound(800, 0.1, 'sine'),
      click: () => createSound(600, 0.2, 'square'),
      success: () => {
        createSound(523, 0.1, 'sine') // C5
        setTimeout(() => createSound(659, 0.1, 'sine'), 100) // E5
        setTimeout(() => createSound(784, 0.2, 'sine'), 200) // G5
      },
      error: () => createSound(200, 0.5, 'sawtooth'),
      notification: () => {
        createSound(440, 0.1, 'sine') // A4
        setTimeout(() => createSound(554, 0.1, 'sine'), 150) // C#5
        setTimeout(() => createSound(659, 0.2, 'sine'), 300) // E5
      },
      type: () => createSound(400 + Math.random() * 200, 0.05, 'sine'),
      scroll: () => createSound(300 + Math.random() * 100, 0.1, 'triangle'),
      // New premium sound effects
      cardHover: () => createSound(1000, 0.15, 'sine'),
      cardClick: () => createSound(800, 0.2, 'square'),
      magnetic: () => createSound(1200, 0.1, 'sine'),
      flip: () => {
        createSound(600, 0.1, 'sine')
        setTimeout(() => createSound(800, 0.1, 'sine'), 50)
      },
      morph: () => createSound(400, 0.3, 'triangle'),
      particle: () => createSound(1500 + Math.random() * 500, 0.05, 'sine'),
      sectionReveal: () => {
        createSound(200, 0.2, 'sine')
        setTimeout(() => createSound(400, 0.2, 'sine'), 100)
        setTimeout(() => createSound(600, 0.3, 'sine'), 200)
      }
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const playSound = (soundName) => {
    if (soundsRef.current[soundName]) {
      // Resume audio context if suspended
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume()
      }
      soundsRef.current[soundName]()
    }
  }

  return { playSound }
}

export default useSoundEffects

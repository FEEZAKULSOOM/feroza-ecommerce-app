import React, { useContext, useState, useEffect, useRef } from 'react'
import ai from '../assets/ai.png'
import { ShopDataContext } from '../context/ShopContext.jsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import openSoundFile from '../assets/open.mp3'
import closeSoundFile from '../assets/close.mp3'

function Ai() {
  const { showSearch, setShowSearch } = useContext(ShopDataContext)
  const navigate = useNavigate()
  const [activeAi, setActiveAi] = useState(false)

  // Use refs to prevent recreating HTMLAudioElement instances on every single render
  const openSound = useRef(new Audio(openSoundFile))
  const closeSound = useRef(new Audio(closeSoundFile))

  // Store loaded voices in a ref to avoid asynchronous loading issues on the first click
  const voicesRef = useRef([])

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        voicesRef.current = window.speechSynthesis.getVoices()
      }

      loadVoices()
      // Chrome and Safari load voices asynchronously; this event triggers when they are ready
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  function speak(message) {
    if ('speechSynthesis' in window) {
      const speech = window.speechSynthesis
      
      // Cancel any ongoing or stuck speech instances
      speech.cancel()

      const utterance = new SpeechSynthesisUtterance(message)
      utterance.lang = 'en-US'
      utterance.rate = 1
      utterance.pitch = 1
      utterance.volume = 1

      // Find the available English voice from our pre-loaded array ref
      const englishVoice = voicesRef.current.find(
        voice => voice.lang.startsWith('en')
      )
      
      if (englishVoice) {
        utterance.voice = englishVoice
      }

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event)
        setActiveAi(false) // Deactivate if speaking fails
      }

      // 🔥 CRITICAL FIX: Play the close sound ONLY when the voice finishes speaking
      utterance.onend = () => {
        closeSound.current.play().catch(err => console.log("Audio play error:", err))
        setActiveAi(false) // Turn off visual effects after speech ends
      }

      speech.speak(utterance)
    } else {
      // Fallback if Speech Synthesis isn't available
      setActiveAi(false)
    }
  }

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported in this browser.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false

    // Warm up / unlock SpeechSynthesis on user click gesture
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      window.speechSynthesis.resume()
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
        .trim()
        .toLowerCase()

      if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
        speak("Opening search")
        setShowSearch(true)
        navigate('/collections')
      } else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
        speak("Closing search")
        setShowSearch(false)
      } else if (
        transcript.includes("collection") || 
        transcript.includes("collections") || 
        transcript.includes("product") || 
        transcript.includes("products")
      ) {
        speak("Opening collection page")
        setShowSearch(false)
        navigate("/collections")
      } else if (transcript.includes("about")) {
        speak("Opening about page")
        setShowSearch(false)
        navigate("/about")
      } else if (transcript.includes("home") || transcript.includes("homepage")) {
        speak("Opening homepage")
        setShowSearch(false)
        navigate("/")
      } else if (
        transcript.includes("cart") || 
        transcript.includes("my cart") || 
        transcript.includes("shopping cart") || 
        transcript.includes("my shopping cart") || 
        transcript.includes("open cart") || 
        transcript.includes("caat")
      ) {
        speak("Opening your cart")
        setShowSearch(false)
        navigate("/cart")
      } else if (transcript.includes("contact")) {
        speak("Opening contact page")
        setShowSearch(false)
        navigate("/contact")
      } else if (
        transcript.includes("order") || 
        transcript.includes("orders") || 
        transcript.includes("my order") || 
        transcript.includes("my orders")
      ) {
        speak("Opening your order page")
        setShowSearch(false)
        navigate("/order")
      } else {
        toast.error("Try again please")
        // If the instruction isn't recognized, we don't speak, so we close down safely here
        closeSound.current.play().catch(err => console.log("Audio play error:", err))
        setActiveAi(false)
      }
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      // Play close sound and turn off if user stops talking or an error occurs without a match
      if (event.error !== 'no-speech') {
        closeSound.current.play().catch(err => console.log("Audio play error:", err))
      }
      setActiveAi(false)
    }

    recognition.onend = () => {
      // Removed closeSound and setActiveAi from here so it doesn't interrupt the AI voice!
      console.log("Stopped listening, processing speech response...")
    }

    recognition.start()
    openSound.current.play().catch(err => console.log("Audio play error:", err))
    setActiveAi(true)
  }

  return (
<div 
  className="fixed z-50 left-3 sm:left-6 bottom-[70px] sm:bottom-6 md:bottom-8 lg:bottom-6" 
  onClick={startListening}
>
  <img 
    alt="AI Assistant" 
    className={`w-[48px] sm:w-[65px] md:w-[85px] lg:w-[95px] cursor-pointer transition-all duration-300 ${
      activeAi 
        ? 'translate-y-[-10%] translate-x-[10%] scale-110 sm:scale-125' 
        : 'translate-y-0 translate-x-0 scale-100'
    }`} 
    style={{ 
      filter: activeAi 
        ? 'drop-shadow(0 0 25px #00d2fc)' 
        : 'drop-shadow(0 0 12px rgba(0,0,0,0.7))' 
    }} 
    src={ai} 
  />
</div>
  )
}

export default Ai

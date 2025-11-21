'use client'

import { useEffect, useState } from 'react'
import { Sparkles, Heart, Star, Droplets, Shield } from 'lucide-react'

interface FloatingElementProps {
  icon: React.ReactNode
  delay: number
  duration: number
  left: string
  top: string
}

function FloatingElement({ icon, delay, duration, left, top }: FloatingElementProps) {
  return (
    <div
      className="absolute opacity-20 animate-pulse"
      style={{
        left,
        top,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    >
      {icon}
    </div>
  )
}

export function FloatingBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <FloatingElement
        icon={<Sparkles className="w-8 h-8 text-purple-400" />}
        delay={0}
        duration={3}
        left="10%"
        top="20%"
      />
      <FloatingElement
        icon={<Heart className="w-6 h-6 text-pink-400" />}
        delay={0.5}
        duration={4}
        left="80%"
        top="10%"
      />
      <FloatingElement
        icon={<Star className="w-7 h-7 text-blue-400" />}
        delay={1}
        duration={3.5}
        left="20%"
        top="80%"
      />
      <FloatingElement
        icon={<Droplets className="w-5 h-5 text-cyan-400" />}
        delay={1.5}
        duration={4.5}
        left="90%"
        top="70%"
      />
      <FloatingElement
        icon={<Shield className="w-6 h-6 text-green-400" />}
        delay={2}
        duration={3}
        left="5%"
        top="50%"
      />
      <FloatingElement
        icon={<Sparkles className="w-9 h-9 text-purple-400" />}
        delay={2.5}
        duration={5}
        left="70%"
        top="30%"
      />
    </div>
  )
}

interface PulseButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function PulseButton({ children, className = '', onClick }: PulseButtonProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg animate-ping opacity-75"></div>
      <button
        onClick={onClick}
        className={`relative bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 ${className}`}
      >
        {children}
      </button>
    </div>
  )
}

interface SlideInTextProps {
  text: string
  delay?: number
  className?: string
}

export function SlideInText({ text, delay = 0, className = '' }: SlideInTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-all duration-1000 transform ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      } ${className}`}
    >
      {text}
    </div>
  )
}

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 1000, 
  direction = 'up',
  className = '' 
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const getTransformClasses = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return 'translate-y-10 opacity-0'
        case 'down':
          return '-translate-y-10 opacity-0'
        case 'left':
          return 'translate-x-10 opacity-0'
        case 'right':
          return '-translate-x-10 opacity-0'
        default:
          return 'translate-y-10 opacity-0'
      }
    }
    return 'translate-y-0 opacity-100'
  }

  return (
    <div
      className={`transition-all duration-${duration} ${getTransformClasses()} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}

interface StaggeredListProps {
  items: React.ReactNode[]
  staggerDelay?: number
  className?: string
}

export function StaggeredList({ items, staggerDelay = 100, className = '' }: StaggeredListProps) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <FadeIn key={index} delay={index * staggerDelay}>
          {item}
        </FadeIn>
      ))}
    </div>
  )
}

interface HoverCardProps {
  children: React.ReactNode
  hoverContent: React.ReactNode
  className?: string
}

export function HoverCard({ children, hoverContent, className = '' }: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`transform transition-all duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}>
        {children}
      </div>
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg pointer-events-none" />
      )}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap z-10">
          {hoverContent}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      )}
    </div>
  )
}

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
}

export function ProgressRing({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  className = '' 
}: ProgressRingProps) {
  const [circumference, setCircumference] = useState(0)
  const [strokeDashoffset, setStrokeDashoffset] = useState(0)

  useEffect(() => {
    const radius = (size - strokeWidth) / 2
    const newCircumference = radius * 2 * Math.PI
    setCircumference(newCircumference)
    setStrokeDashoffset(newCircumference - (progress / 100) * newCircumference)
  }, [progress, size, strokeWidth])

  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-purple-600 transition-all duration-500 ease-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">{Math.round(progress)}%</span>
      </div>
    </div>
  )
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-purple-600 ${sizeClasses[size]} ${className}`} />
  )
}

interface BounceProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function Bounce({ children, delay = 0, className = '' }: BounceProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-all duration-1000 ${isVisible ? 'animate-bounce' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

export function TypewriterText({ 
  text, 
  speed = 50, 
  className = '', 
  onComplete 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}
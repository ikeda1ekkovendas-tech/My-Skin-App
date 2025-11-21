'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

interface Reminder {
  id: string
  userId: string
  title: string
  message: string
  time: string
  frequency: 'daily' | 'weekly' | 'monthly'
  isActive: boolean
  recipeId?: string
  createdAt: Date
}

interface Achievement {
  type: string
  message: string
  points: number
}

interface UseSocketReturn {
  socket: Socket | null
  isConnected: boolean
  reminders: Reminder[]
  createReminder: (reminder: Omit<Reminder, 'id' | 'createdAt'>) => void
  updateReminder: (reminder: Reminder) => void
  deleteReminder: (reminderId: string) => void
  toggleReminder: (reminderId: string, isActive: boolean) => void
  completeRoutine: (routineType: string, recipeIds: string[]) => void
  lastAchievement: Achievement | null
  connectionError: string | null
}

export function useSocket(userId: string): UseSocketReturn {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [lastAchievement, setLastAchievement] = useState<Achievement | null>(null)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!userId) return

    // Initialize socket connection
    const socketInstance = io({
      path: '/api/socket/io',
      addTrailingSlash: false,
    })

    socketRef.current = socketInstance
    setSocket(socketInstance)

    // Connection events
    socketInstance.on('connect', () => {
      console.log('Connected to socket server')
      setIsConnected(true)
      setConnectionError(null)
      
      // Register user
      socketInstance.emit('register_user', userId)
    })

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from socket server')
      setIsConnected(false)
    })

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
      setConnectionError('Falha na conexão com o servidor')
      setIsConnected(false)
    })

    // Reminder events
    socketInstance.on('reminders_loaded', (loadedReminders: Reminder[]) => {
      console.log('Reminders loaded:', loadedReminders)
      setReminders(loadedReminders)
    })

    socketInstance.on('reminder_created', (reminder: Reminder) => {
      console.log('Reminder created:', reminder)
      setReminders(prev => [...prev, reminder])
      
      // Show browser notification
      if (Notification.permission === 'granted') {
        new Notification('Novo Lembrete Criado', {
          body: `${reminder.title}: ${reminder.message}`,
          icon: '/favicon.ico'
        })
      }
    })

    socketInstance.on('reminder_updated', (reminder: Reminder) => {
      console.log('Reminder updated:', reminder)
      setReminders(prev => 
        prev.map(r => r.id === reminder.id ? reminder : r)
      )
    })

    socketInstance.on('reminder_deleted', (reminderId: string) => {
      console.log('Reminder deleted:', reminderId)
      setReminders(prev => prev.filter(r => r.id !== reminderId))
    })

    socketInstance.on('reminder_toggled', (data: { reminderId: string; isActive: boolean }) => {
      console.log('Reminder toggled:', data)
      setReminders(prev => 
        prev.map(r => r.id === data.reminderId ? { ...r, isActive: data.isActive } : r)
      )
    })

    socketInstance.on('reminder_triggered', (data: { id: string; title: string; message: string; recipeId?: string }) => {
      console.log('Reminder triggered:', data)
      
      // Show browser notification
      if (Notification.permission === 'granted') {
        new Notification('Lembrete de Skin Care', {
          body: `${data.title}: ${data.message}`,
          icon: '/favicon.ico',
          tag: data.id,
          requireInteraction: true
        })
      }

      // Play notification sound (if available)
      try {
        const audio = new Audio('/notification.mp3')
        audio.play().catch(() => {
          // Ignore audio play errors
        })
      } catch (error) {
        // Ignore audio errors
      }
    })

    // Achievement events
    socketInstance.on('achievement_unlocked', (achievement: Achievement) => {
      console.log('Achievement unlocked:', achievement)
      setLastAchievement(achievement)
      
      // Show browser notification
      if (Notification.permission === 'granted') {
        new Notification('Conquista Desbloqueada! 🎉', {
          body: achievement.message,
          icon: '/favicon.ico'
        })
      }
    })

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }

    // Cleanup
    return () => {
      socketInstance.disconnect()
      setSocket(null)
      setIsConnected(false)
    }
  }, [userId])

  const createReminder = useCallback((reminder: Omit<Reminder, 'id' | 'createdAt'>) => {
    if (socketRef.current) {
      socketRef.current.emit('create_reminder', reminder)
    }
  }, [])

  const updateReminder = useCallback((reminder: Reminder) => {
    if (socketRef.current) {
      socketRef.current.emit('update_reminder', reminder)
    }
  }, [])

  const deleteReminder = useCallback((reminderId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('delete_reminder', { reminderId, userId })
    }
  }, [userId])

  const toggleReminder = useCallback((reminderId: string, isActive: boolean) => {
    if (socketRef.current) {
      socketRef.current.emit('toggle_reminder', { reminderId, userId, isActive })
    }
  }, [userId])

  const completeRoutine = useCallback((routineType: string, recipeIds: string[]) => {
    if (socketRef.current) {
      socketRef.current.emit('routine_completed', { userId, routineType, recipeIds })
    }
  }, [userId])

  return {
    socket,
    isConnected,
    reminders,
    createReminder,
    updateReminder,
    deleteReminder,
    toggleReminder,
    completeRoutine,
    lastAchievement,
    connectionError
  }
}

// Hook for managing reminders with localStorage fallback
export function useReminders(userId: string) {
  const { socket, isConnected, reminders, createReminder, updateReminder, deleteReminder, toggleReminder } = useSocket(userId)
  const [localReminders, setLocalReminders] = useState<Reminder[]>([])

  // Load reminders from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`reminders_${userId}`)
      if (stored) {
        try {
          setLocalReminders(JSON.parse(stored))
        } catch (error) {
          console.error('Error loading reminders from localStorage:', error)
        }
      }
    }
  }, [userId])

  // Save reminders to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined' && reminders.length > 0) {
      localStorage.setItem(`reminders_${userId}`, JSON.stringify(reminders))
    }
  }, [reminders, userId])

  // Use socket reminders if connected, otherwise use local storage
  const effectiveReminders = isConnected ? reminders : localReminders

  const handleCreateReminder = useCallback((reminder: Omit<Reminder, 'id' | 'createdAt'>) => {
    if (isConnected) {
      createReminder(reminder)
    } else {
      // Fallback to localStorage
      const newReminder: Reminder = {
        ...reminder,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date()
      }
      setLocalReminders(prev => [...prev, newReminder])
      localStorage.setItem(`reminders_${userId}`, JSON.stringify([...localReminders, newReminder]))
    }
  }, [isConnected, createReminder, localReminders, userId])

  const handleDeleteReminder = useCallback((reminderId: string) => {
    if (isConnected) {
      deleteReminder(reminderId)
    } else {
      // Fallback to localStorage
      const updated = localReminders.filter(r => r.id !== reminderId)
      setLocalReminders(updated)
      localStorage.setItem(`reminders_${userId}`, JSON.stringify(updated))
    }
  }, [isConnected, deleteReminder, localReminders, userId])

  const handleToggleReminder = useCallback((reminderId: string, isActive: boolean) => {
    if (isConnected) {
      toggleReminder(reminderId, isActive)
    } else {
      // Fallback to localStorage
      const updated = localReminders.map(r => 
        r.id === reminderId ? { ...r, isActive } : r
      )
      setLocalReminders(updated)
      localStorage.setItem(`reminders_${userId}`, JSON.stringify(updated))
    }
  }, [isConnected, toggleReminder, localReminders, userId])

  return {
    reminders: effectiveReminders,
    isConnected,
    createReminder: handleCreateReminder,
    updateReminder,
    deleteReminder: handleDeleteReminder,
    toggleReminder: handleToggleReminder
  }
}
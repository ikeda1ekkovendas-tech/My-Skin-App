import { Server as NetServer } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { Server as ServerIO } from 'socket.io'

export const config = {
  api: {
    bodyParser: false
  }
}

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

interface UserSession {
  userId: string
  socketId: string
  reminders: Reminder[]
}

const users = new Map<string, UserSession>()
const reminders = new Map<string, Reminder>()

const ioHandler = (req: NextApiRequest, res: NextApiResponse & { socket: any }) => {
  if (!res.socket.server.io) {
    console.log('Setting up socket.io server...')
    
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: '/api/socket/io',
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    })

    // Connection handling
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id)

      // User registration
      socket.on('register_user', (userId: string) => {
        console.log('User registered:', userId)
        
        // Store user session
        users.set(userId, {
          userId,
          socketId: socket.id,
          reminders: []
        })

        // Join user-specific room
        socket.join(`user_${userId}`)

        // Load existing reminders for this user
        const userReminders = Array.from(reminders.values())
          .filter(reminder => reminder.userId === userId)
        
        socket.emit('reminders_loaded', userReminders)

        // Start reminder checking for this user
        startReminderChecker(userId, io)
      })

      // Create new reminder
      socket.on('create_reminder', (reminderData: Omit<Reminder, 'id' | 'createdAt'>) => {
        const reminder: Reminder = {
          ...reminderData,
          id: generateId(),
          createdAt: new Date()
        }

        reminders.set(reminder.id, reminder)
        
        // Update user session
        const userSession = users.get(reminder.userId)
        if (userSession) {
          userSession.reminders.push(reminder)
        }

        // Send confirmation
        io.to(`user_${reminder.userId}`).emit('reminder_created', reminder)
        
        console.log('Reminder created:', reminder)
      })

      // Update reminder
      socket.on('update_reminder', (reminderData: Reminder) => {
        const existingReminder = reminders.get(reminderData.id)
        
        if (existingReminder && existingReminder.userId === reminderData.userId) {
          reminders.set(reminderData.id, reminderData)
          
          // Update user session
          const userSession = users.get(reminderData.userId)
          if (userSession) {
            const reminderIndex = userSession.reminders.findIndex(r => r.id === reminderData.id)
            if (reminderIndex >= 0) {
              userSession.reminders[reminderIndex] = reminderData
            }
          }

          io.to(`user_${reminderData.userId}`).emit('reminder_updated', reminderData)
          console.log('Reminder updated:', reminderData)
        }
      })

      // Delete reminder
      socket.on('delete_reminder', (data: { reminderId: string; userId: string }) => {
        const reminder = reminders.get(data.reminderId)
        
        if (reminder && reminder.userId === data.userId) {
          reminders.delete(data.reminderId)
          
          // Update user session
          const userSession = users.get(data.userId)
          if (userSession) {
            userSession.reminders = userSession.reminders.filter(r => r.id !== data.reminderId)
          }

          io.to(`user_${data.userId}`).emit('reminder_deleted', data.reminderId)
          console.log('Reminder deleted:', data.reminderId)
        }
      })

      // Toggle reminder active status
      socket.on('toggle_reminder', (data: { reminderId: string; userId: string; isActive: boolean }) => {
        const reminder = reminders.get(data.reminderId)
        
        if (reminder && reminder.userId === data.userId) {
          reminder.isActive = data.isActive
          
          io.to(`user_${data.userId}`).emit('reminder_toggled', {
            reminderId: data.reminderId,
            isActive: data.isActive
          })
          
          console.log('Reminder toggled:', data)
        }
      })

      // Get all reminders for user
      socket.on('get_reminders', (userId: string) => {
        const userReminders = Array.from(reminders.values())
          .filter(reminder => reminder.userId === userId)
        
        socket.emit('reminders_loaded', userReminders)
      })

      // Handle routine completion
      socket.on('routine_completed', (data: { userId: string; routineType: string; recipeIds: string[] }) => {
        // Update user progress
        const userSession = users.get(data.userId)
        if (userSession) {
          // Store completion data
          const completionData = {
            userId: data.userId,
            routineType: data.routineType,
            recipeIds: data.recipeIds,
            completedAt: new Date()
          }

          // Send achievement notification
          io.to(`user_${data.userId}`).emit('achievement_unlocked', {
            type: 'routine_completed',
            message: `Parabéns! Você completou sua rotina ${data.routineType}!`,
            points: calculatePoints(data.recipeIds.length)
          })

          console.log('Routine completed:', completionData)
        }
      })

      // Disconnect handling
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
        
        // Find and remove user session
        for (const [userId, session] of users.entries()) {
          if (session.socketId === socket.id) {
            users.delete(userId)
            break
          }
        }
      })
    })

    res.socket.server.io = io
  }
  res.end()
}

// Reminder checker function
function startReminderChecker(userId: string, io: ServerIO) {
  const checkInterval = setInterval(() => {
    const userSession = users.get(userId)
    
    if (!userSession) {
      clearInterval(checkInterval)
      return
    }

    const now = new Date()
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

    // Check reminders
    const userReminders = Array.from(reminders.values())
      .filter(reminder => 
        reminder.userId === userId && 
        reminder.isActive &&
        shouldTriggerReminder(reminder, now, currentTime)
      )

    userReminders.forEach(reminder => {
      io.to(`user_${userId}`).emit('reminder_triggered', {
        id: reminder.id,
        title: reminder.title,
        message: reminder.message,
        recipeId: reminder.recipeId
      })

      console.log('Reminder triggered for user', userId, ':', reminder.title)
    })

  }, 60000) // Check every minute
}

function shouldTriggerReminder(reminder: Reminder, now: Date, currentTime: string): boolean {
  // Check if time matches
  if (reminder.time !== currentTime) {
    return false
  }

  // Check frequency
  switch (reminder.frequency) {
    case 'daily':
      return true
    
    case 'weekly':
      return now.getDay() === 1 // Monday (0 = Sunday, 1 = Monday, etc.)
    
    case 'monthly':
      return now.getDate() === 1 // First day of month
    
    default:
      return false
  }
}

function calculatePoints(recipeCount: number): number {
  return recipeCount * 10 // 10 points per recipe completed
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export default ioHandler
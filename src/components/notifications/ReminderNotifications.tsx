'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Bell, Plus, Clock, Calendar, Trash2, Edit2, CheckCircle, Trophy, Sparkles } from 'lucide-react'
import { useReminders } from '@/hooks/useSocket'

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

interface ReminderNotificationsProps {
  userId: string
}

export function ReminderNotifications({ userId }: ReminderNotificationsProps) {
  const { reminders, isConnected, createReminder, deleteReminder, toggleReminder } = useReminders(userId)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newReminder, setNewReminder] = useState({
    title: '',
    message: '',
    time: '09:00',
    frequency: 'daily' as 'daily' | 'weekly' | 'monthly'
  })

  const handleCreateReminder = () => {
    if (newReminder.title && newReminder.message) {
      createReminder({
        userId,
        title: newReminder.title,
        message: newReminder.message,
        time: newReminder.time,
        frequency: newReminder.frequency,
        isActive: true
      })
      
      // Reset form
      setNewReminder({
        title: '',
        message: '',
        time: '09:00',
        frequency: 'daily'
      })
      setIsCreateDialogOpen(false)
    }
  }

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Diário'
      case 'weekly': return 'Semanal'
      case 'monthly': return 'Mensal'
      default: return frequency
    }
  }

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'bg-blue-100 text-blue-800'
      case 'weekly': return 'bg-green-100 text-green-800'
      case 'monthly': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold">Lembretes de Rotina</h3>
          {isConnected && (
            <Badge variant="secondary" className="text-xs">
              Conectado
            </Badge>
          )}
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-1" />
              Novo Lembrete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Lembrete</DialogTitle>
              <DialogDescription>
                Configure um lembrete para sua rotina de skin care
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  placeholder="Ex: Rotina Matinal"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="message">Mensagem</Label>
                <Input
                  id="message"
                  placeholder="Ex: Hora de cuidar da pele!"
                  value={newReminder.message}
                  onChange={(e) => setNewReminder({...newReminder, message: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">Frequência</Label>
                  <Select value={newReminder.frequency} onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setNewReminder({...newReminder, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateReminder} className="bg-purple-600 hover:bg-purple-700">
                  Criar Lembrete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        {reminders.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">Nenhum lembrete configurado</h4>
              <p className="text-gray-500 mb-4">
                Crie lembretes para não esquecer de sua rotina de skin care
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Lembrete
              </Button>
            </CardContent>
          </Card>
        ) : (
          reminders.map((reminder) => (
            <Card key={reminder.id} className={`transition-all ${reminder.isActive ? 'bg-white' : 'bg-gray-50 opacity-75'}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{reminder.title}</h4>
                      <Badge className={getFrequencyColor(reminder.frequency)}>
                        {getFrequencyLabel(reminder.frequency)}
                      </Badge>
                      {reminder.isActive && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Ativo
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{reminder.message}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {reminder.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(reminder.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={reminder.isActive}
                      onCheckedChange={(checked) => toggleReminder(reminder.id, checked)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteReminder(reminder.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Connection Status */}
      {!isConnected && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <Bell className="w-4 h-4" />
              <span className="text-sm">
                Conexão offline. Os lembretes serão salvos localmente e sincronizados quando você voltar.
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Achievement Notification Component
export function AchievementNotification({ achievement, onClose }: { achievement: any; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right">
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">Conquista Desbloqueada!</h4>
              <p className="text-sm opacity-90">{achievement.message}</p>
              <div className="flex items-center gap-1 mt-1">
                <Sparkles className="w-3 h-3" />
                <span className="text-xs">+{achievement.points} pontos</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              ×
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
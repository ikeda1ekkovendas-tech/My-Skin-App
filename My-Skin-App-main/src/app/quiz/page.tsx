'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { ChevronLeft, ChevronRight, Sparkles, Droplets, Heart, Star } from 'lucide-react'
import Link from 'next/link'

interface QuizData {
  skinType: string
  concerns: string[]
  age: string
  routineTime: string
  ingredients: string[]
  frequency: string
  experience: string
}

const questions = [
  {
    id: 'skinType',
    title: 'Qual é o seu tipo de pele?',
    subtitle: 'Isso nos ajuda a personalizar as receitas para você',
    icon: <Droplets className="w-6 h-6" />,
    options: [
      { value: 'normal', label: 'Normal', description: 'Equilibrada, nem oleosa nem seca' },
      { value: 'oily', label: 'Oleosa', description: 'Brilho excessivo, poros dilatados' },
      { value: 'dry', label: 'Seca', description: 'Descamação, sensibilidade, falta de brilho' },
      { value: 'combination', label: 'Mista', description: 'Oleosa na zona T, seca nas bochechas' },
      { value: 'sensitive', label: 'Sensível', description: 'Irrita-se facilmente, vermelhidão' }
    ]
  },
  {
    id: 'concerns',
    title: 'Quais são suas principais preocupações?',
    subtitle: 'Selecione todas que se aplicam',
    icon: <Heart className="w-6 h-6" />,
    type: 'multiple',
    options: [
      { value: 'acne', label: 'Acne e espinhas' },
      { value: 'hydration', label: 'Hidratação' },
      { value: 'aging', label: 'Linhas finas e rugas' },
      { value: 'spots', label: 'Manchas escuras' },
      { value: 'pores', label: 'Poros dilatados' },
      { value: 'blackheads', label: 'Cravos' },
      { value: 'dullness', label: 'Pele sem vida' },
      { value: 'sensitivity', label: 'Sensibilidade' }
    ]
  },
  {
    id: 'age',
    title: 'Qual é a sua faixa etária?',
    subtitle: 'Diferentes idades precisam de cuidados diferentes',
    icon: <Star className="w-6 h-6" />,
    options: [
      { value: '15-25', label: '15-25 anos' },
      { value: '26-35', label: '26-35 anos' },
      { value: '36-45', label: '36-45 anos' },
      { value: '46-55', label: '46-55 anos' },
      { value: '55+', label: '55+ anos' }
    ]
  },
  {
    id: 'routineTime',
    title: 'Quanto tempo você pode dedicar à rotina?',
    subtitle: 'Seja realista sobre seu tempo disponível',
    icon: <Sparkles className="w-6 h-6" />,
    options: [
      { value: '5min', label: '5 minutos', description: 'Rotina super rápida' },
      { value: '10min', label: '10 minutos', description: 'Rotina básica' },
      { value: '20min', label: '20 minutos', description: 'Rotina completa' },
      { value: '30min+', label: '30+ minutos', description: 'Rotina spa em casa' }
    ]
  },
  {
    id: 'ingredients',
    title: 'Quais ingredientes você tem em casa?',
    subtitle: 'Selecione os ingredientes que você costuma ter disponíveis',
    icon: <Sparkles className="w-6 h-6" />,
    type: 'multiple',
    options: [
      { value: 'oatmeal', label: 'Aveia' },
      { value: 'honey', label: 'Mel' },
      { value: 'yogurt', label: 'Iogurte natural' },
      { value: 'lemon', label: 'Limão' },
      { value: 'avocado', label: 'Abacate' },
      { value: 'coconut_oil', label: 'Óleo de coco' },
      { value: 'aloe_vera', label: 'Babosa' },
      { value: 'sugar', label: 'Açúcar mascavo' },
      { value: 'coffee', label: 'Café' },
      { value: 'green_tea', label: 'Chá verde' }
    ]
  },
  {
    id: 'frequency',
    title: 'Com que frequência você quer fazer os tratamentos?',
    subtitle: 'A consistência é chave para bons resultados',
    icon: <Sparkles className="w-6 h-6" />,
    options: [
      { value: 'daily', label: 'Todos os dias' },
      { value: '3x_week', label: '3 vezes por semana' },
      { value: '2x_week', label: '2 vezes por semana' },
      { value: '1x_week', label: '1 vez por semana' }
    ]
  },
  {
    id: 'experience',
    title: 'Qual é seu nível de experiência com skin care?',
    subtitle: 'Isso nos ajuda a ajustar a complexidade das receitas',
    icon: <Sparkles className="w-6 h-6" />,
    options: [
      { value: 'beginner', label: 'Iniciante', description: 'Nunca fiz skin care caseiro' },
      { value: 'intermediate', label: 'Intermediário', description: 'Já fiz algumas máscaras caseiras' },
      { value: 'advanced', label: 'Avançado', description: 'Tenho experiência com receitas caseiras' }
    ]
  }
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quizData, setQuizData] = useState<QuizData>({
    skinType: '',
    concerns: [],
    age: '',
    routineTime: '',
    ingredients: [],
    frequency: '',
    experience: ''
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setQuizData(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleMultipleChoice = (questionId: string, value: string, checked: boolean) => {
    setQuizData(prev => {
      const currentValues = prev[questionId as keyof QuizData] as string[] || []
      if (checked) {
        return {
          ...prev,
          [questionId]: [...currentValues, value]
        }
      } else {
        return {
          ...prev,
          [questionId]: currentValues.filter(item => item !== value)
        }
      }
    })
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const canProceed = () => {
    const question = questions[currentQuestion]
    const answer = quizData[question.id as keyof QuizData]
    
    if (question.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0
    }
    return answer !== ''
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const currentQ = questions[currentQuestion]
  const currentAnswer = quizData[currentQ.id as keyof QuizData]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar para home
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Quiz Personalizado
          </h1>
          <p className="text-gray-600">
            Vamos criar sua rotina de skin care perfeita
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Questão {currentQuestion + 1} de {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <CardHeader className="text-center pb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
              {currentQ.icon}
            </div>
            <CardTitle className="text-2xl">{currentQ.title}</CardTitle>
            <CardDescription className="text-lg">{currentQ.subtitle}</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {currentQ.type === 'multiple' ? (
              <div className="space-y-3">
                {currentQ.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors">
                    <Checkbox
                      id={option.value}
                      checked={(currentAnswer as string[] || []).includes(option.value)}
                      onCheckedChange={(checked) => 
                        handleMultipleChoice(currentQ.id, option.value, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={option.value} 
                      className="flex-1 cursor-pointer text-base font-medium"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <RadioGroup
                value={currentAnswer as string}
                onValueChange={(value) => handleAnswer(currentQ.id, value)}
                className="space-y-3"
              >
                {currentQ.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      <div className="font-medium text-base">{option.label}</div>
                      {option.description && (
                        <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          
          {currentQuestion < questions.length - 1 ? (
            <Button
              onClick={nextQuestion}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center"
            >
              Próxima
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Link href="/routine">
              <Button
                disabled={!canProceed()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center"
              >
                Ver Minha Rotina
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Clock, Users, Heart, Star, CheckCircle, Play, Calendar, Sparkles, Droplets, Shield, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Recipe {
  id: string
  name: string
  category: string
  time: string
  difficulty: string
  frequency: string
  ingredients: string[]
  steps: string[]
  benefits: string[]
  skinType: string[]
  image: string
}

const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Máscara Hidratante de Aveia e Mel',
    category: 'Hidratação',
    time: '15 min',
    difficulty: 'Fácil',
    frequency: '2-3x por semana',
    ingredients: ['2 colheres de aveia', '1 colher de mel', '1 colher de iogurte natural'],
    steps: [
      'Misture a aveia com o mel até formar uma pasta',
      'Adicione o iogurte e misture bem',
      'Aplique no rosto limpo e deixe por 15 minutos',
      'Enxágue com água morna'
    ],
    benefits: ['Hidratação profunda', 'Acalma irritações', 'Remove impurezas'],
    skinType: ['seca', 'sensível', 'normal'],
    image: '/api/placeholder/400/300'
  },
  {
    id: '2',
    name: 'Esfoliante de Açúcar e Óleo de Coco',
    category: 'Esfoliação',
    time: '10 min',
    difficulty: 'Fácil',
    frequency: '1x por semana',
    ingredients: ['2 colheres de açúcar mascavo', '1 colher de óleo de coco', 'Algumas gotas de limão'],
    steps: [
      'Misture o açúcar com o óleo de coco',
      'Adicione algumas gotas de limão',
      'Massage suavemente na pele úmida',
      'Enxágue bem e hidrate'
    ],
    benefits: ['Remove células mortas', 'Estimula circulação', 'Deixa pele macia'],
    skinType: ['normal', 'oleosa', 'mista'],
    image: '/api/placeholder/400/300'
  },
  {
    id: '3',
    name: 'Tônico de Chá Verde e Babosa',
    category: 'Tônico',
    time: '5 min',
    difficulty: 'Fácil',
    frequency: 'Todos os dias',
    ingredients: ['1 xícara de chá verde', '2 colheres de babosa', '1 colher de vinagre de maçã'],
    steps: [
      'Prepare o chá verde e deixe esfriar',
      'Misture com o gel de babosa',
      'Adicione o vinagre de maçã',
      'Aplique com algodão após limpeza'
    ],
    benefits: ['Antioxidante', 'Equilibra pH', 'Reduz inflamações'],
    skinType: ['oleosa', 'mista', 'acneica'],
    image: '/api/placeholder/400/300'
  },
  {
    id: '4',
    name: 'Máscara Clareadora de Abacate',
    category: 'Clareamento',
    time: '20 min',
    difficulty: 'Médio',
    frequency: '2x por semana',
    ingredients: ['1/2 abacate maduro', '1 colher de mel', '1 colher de suco de limão'],
    steps: [
      'Amasse o abacate até formar uma pasta',
      'Misture com mel e suco de limão',
      'Aplique no rosto evitando área dos olhos',
      'Deixe por 20 minutos e enxágue'
    ],
    benefits: ['Clareia manchas', 'Nutre profundamente', 'Previne envelhecimento'],
    skinType: ['seca', 'normal', 'madura'],
    image: '/api/placeholder/400/300'
  }
]

export default function RoutinePage() {
  const [selectedDay, setSelectedDay] = useState('morning')
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    )
  }

  const getCompletionPercentage = () => {
    const totalSteps = 4 // Número de receitas diárias
    return (completedSteps.length / totalSteps) * 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/quiz" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
            Refazer quiz
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Sua Rotina Personalizada
          </h1>
          <p className="text-xl text-gray-600">
            Criada especialmente para sua pele e seus objetivos
          </p>
        </div>

        {/* Summary Card */}
        <Card className="mb-8 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-purple-800">🌟 Pele Oleosa com Tendência a Acne</CardTitle>
                <CardDescription className="text-purple-600">
                  Rotina focada em controle de oleosidade e tratamento de espinhas
                </CardDescription>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-800">{Math.round(getCompletionPercentage())}%</div>
                <div className="text-sm text-purple-600">Concluído hoje</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/50 rounded-lg p-3">
                <Clock className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                <div className="text-sm font-medium">25 min</div>
                <div className="text-xs text-gray-600">Tempo total</div>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                <Calendar className="w-6 h-6 text-pink-600 mx-auto mb-1" />
                <div className="text-sm font-medium">Diária</div>
                <div className="text-xs text-gray-600">Frequência</div>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                <Sparkles className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <div className="text-sm font-medium">4 receitas</div>
                <div className="text-xs text-gray-600">Personalizadas</div>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                <Heart className="w-6 h-6 text-red-500 mx-auto mb-1" />
                <div className="text-sm font-medium">Fácil</div>
                <div className="text-xs text-gray-600">Dificuldade</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Progresso Diário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={getCompletionPercentage()} className="h-3 mb-4" />
            <div className="text-sm text-gray-600">
              Você completou {completedSteps.length} de 4 passos hoje. Continue assim! 💪
            </div>
          </CardContent>
        </Card>

        {/* Routine Tabs */}
        <Tabs defaultValue="morning" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="morning" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Manhã
            </TabsTrigger>
            <TabsTrigger value="afternoon" className="flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Tarde
            </TabsTrigger>
            <TabsTrigger value="evening" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Noite
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Semanal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="morning" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Rotina Matinal</h3>
              <p className="text-gray-600">Comece o dia com pele limpa e protegida</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {mockRecipes.slice(0, 2).map((recipe) => (
                <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{recipe.name}</CardTitle>
                        <CardDescription>{recipe.category}</CardDescription>
                      </div>
                      <Button
                        size="sm"
                        variant={completedSteps.includes(recipe.id) ? "default" : "outline"}
                        onClick={() => toggleStep(recipe.id)}
                        className="flex items-center gap-1"
                      >
                        {completedSteps.includes(recipe.id) ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Concluído
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            Fazer
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Badge variant="secondary">⏱️ {recipe.time}</Badge>
                        <Badge variant="secondary">📊 {recipe.difficulty}</Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Ingredientes:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>• {ingredient}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Modo de preparo:</h4>
                        <ol className="text-sm text-gray-600 space-y-1">
                          {recipe.steps.map((step, index) => (
                            <li key={index}>{index + 1}. {step}</li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Benefícios:</h4>
                        <div className="flex flex-wrap gap-1">
                          {recipe.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="afternoon" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Cuidados da Tarde</h3>
              <p className="text-gray-600">Refresque e hidrate sua pele</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Tônico Refrescante</CardTitle>
                <CardDescription>Revitalizante para meio do dia</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Aplique o tônico de chá verde para refrescar e controlar a oleosidade ao longo do dia.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evening" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Rotina Noturna</h3>
              <p className="text-gray-600">Limpe e prepare sua pele para o reparo noturno</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {mockRecipes.slice(2, 4).map((recipe) => (
                <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{recipe.name}</CardTitle>
                        <CardDescription>{recipe.category}</CardDescription>
                      </div>
                      <Button
                        size="sm"
                        variant={completedSteps.includes(recipe.id) ? "default" : "outline"}
                        onClick={() => toggleStep(recipe.id)}
                        className="flex items-center gap-1"
                      >
                        {completedSteps.includes(recipe.id) ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Concluído
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            Fazer
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Badge variant="secondary">⏱️ {recipe.time}</Badge>
                        <Badge variant="secondary">📊 {recipe.difficulty}</Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Ingredientes:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>• {ingredient}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Modo de preparo:</h4>
                        <ol className="text-sm text-gray-600 space-y-1">
                          {recipe.steps.map((step, index) => (
                            <li key={index}>{index + 1}. {step}</li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Benefícios:</h4>
                        <div className="flex flex-wrap gap-1">
                          {recipe.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Tratamentos Semanais</h3>
              <p className="text-gray-600">Cuidados intensivos para manter sua pele saudável</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Esfoliação Profunda</CardTitle>
                  <CardDescription>1 vez por semana</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Use o esfoliante de açúcar para remover células mortas e desobstruir poros.
                  </p>
                  <Badge>Dominga</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Máscara Detox</CardTitle>
                  <CardDescription>1 vez por semana</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Máscara de argila para profundamente limpar e purificar a pele.
                  </p>
                  <Badge>Quarta-feira</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Tips Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              Dicas Personalizadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">💧 Hidratação</h4>
                <p className="text-sm text-gray-600">
                  Beba pelo menos 2 litros de água por dia para manter sua pele hidratada de dentro para fora.
                </p>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">🛡️ Proteção Solar</h4>
                <p className="text-sm text-gray-600">
                  Use protetor solar todos os dias, mesmo em dias nublados ou em ambientes internos.
                </p>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">😴 Descanso</h4>
                <p className="text-sm text-gray-600">
                  Durma 7-8 horas por noite. A pele se repara durante o sono.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold mb-4">Pronto para transformar sua pele?</h3>
          <p className="text-gray-600 mb-6">
            Assine nosso plano premium para receber receitas exclusivas e acompanhamento personalizado
          </p>
          <Link href="/checkout">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Assinar Agora
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
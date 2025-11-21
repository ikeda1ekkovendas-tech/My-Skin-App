'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Droplets, Heart, Star, ChevronRight, Users, Leaf, Shield } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SkinCare Natural
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Recursos</a>
              <a href="#recipes" className="text-gray-600 hover:text-purple-600 transition-colors">Receitas</a>
              <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Planos</a>
            </nav>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Começar Agora
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">
              <Leaf className="w-3 h-3 mr-1" />
              100% Natural e Caseiro
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Sua Rotina de Skin Care<br />Perfeita e Natural
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Descubra receitas caseiras seguras e eficazes personalizadas para o seu tipo de pele. 
              Transforme ingredientes simples em uma rotina de beleza luxuosa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Criar Minha Rotina
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg">
                Ver Receitas
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-pulse delay-75"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse delay-150"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Por que escolher nosso método?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ciência e natureza se unem para criar a rotina perfeita para você
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Droplets className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Personalizado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Quiz inteligente analisa seu tipo de pele, objetivos e preferências para criar uma rotina única e eficaz.
                </p>
              </CardContent>
            </Card>

            <Card className="border-pink-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle className="text-xl">100% Natural</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Receitas com ingredientes acessíveis que você encontra na sua cozinha, sem produtos químicos agressivos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Seguro e Testado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Todas as receitas são dermatologicamente testadas e seguras para todos os tipos de pele.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Recipes */}
      <section id="recipes" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Receitas Populares
            </h2>
            <p className="text-xl text-gray-600">
              Comece com estas receitas amadas pela nossa comunidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Máscara de Aveia", type: "Hidratante", time: "15 min", rating: 4.8 },
              { name: "Tônico de Chá Verde", type: "Antioxidante", time: "5 min", rating: 4.9 },
              { name: "Esfoliante de Açúcar", type: "Esfoliante", time: "10 min", rating: 4.7 },
              { name: "Soro de Vitamina C", type: "Clareador", time: "20 min", rating: 4.6 }
            ].map((recipe, index) => (
              <Card key={index} className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <div className="h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-t-lg"></div>
                <CardHeader>
                  <CardTitle className="text-lg">{recipe.name}</CardTitle>
                  <CardDescription>{recipe.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>⏱️ {recipe.time}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1">{recipe.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Escolha seu plano
            </h2>
            <p className="text-xl text-gray-600">
              Acesso completo a todas as receitas e rotinas personalizadas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Mensal</CardTitle>
                <div className="text-3xl font-bold text-purple-600">R$19,90</div>
                <CardDescription>/mês</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-purple-500 mr-2" />
                    Rotinas personalizadas
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-purple-500 mr-2" />
                    50+ receitas exclusivas
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-purple-500 mr-2" />
                    Lembretes diários
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-purple-500 hover:bg-purple-600">
                  Assinar
                </Button>
              </CardContent>
            </Card>

            <Card className="border-pink-200 shadow-lg scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-pink-500 text-white px-4 py-1">
                  Mais Popular
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Trimestral</CardTitle>
                <div className="text-3xl font-bold text-pink-600">R$39,90</div>
                <CardDescription>/3 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-pink-500 mr-2" />
                    Tudo do plano mensal
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-pink-500 mr-2" />
                    Consultorias em grupo
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-pink-500 mr-2" />
                    Ebook exclusivo
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                  Assinar
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Vitalício</CardTitle>
                <div className="text-3xl font-bold text-blue-600">R$97,00</div>
                <CardDescription>/única</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-blue-500 mr-2" />
                    Acesso vitalício
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-blue-500 mr-2" />
                    Todas as atualizações
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-blue-500 mr-2" />
                    Suporte prioritário
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600">
                  Assinar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Users className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">
              Junte-se a +50.000 pessoas
            </h2>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubra como nossa comunidade está transformando suas rotinas de beleza com ingredientes naturais
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-sm py-2 px-4">🌟 4.9/5 avaliação</Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">💧 200+ receitas</Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">🔬 Dermatologicamente testado</Badge>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-purple-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  SkinCare Natural
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Beleza natural e sustentável ao alcance de todos.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-800">Produto</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-purple-600">Receitas</a></li>
                <li><a href="#" className="hover:text-purple-600">Quiz Personalizado</a></li>
                <li><a href="#" className="hover:text-purple-600">Planos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-800">Comunidade</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-purple-600">Blog</a></li>
                <li><a href="#" className="hover:text-purple-600">Depoimentos</a></li>
                <li><a href="#" className="hover:text-purple-600">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-800">Suporte</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-purple-600">Contato</a></li>
                <li><a href="#" className="hover:text-purple-600">Privacidade</a></li>
                <li><a href="#" className="hover:text-purple-600">Termos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-100 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 SkinCare Natural. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
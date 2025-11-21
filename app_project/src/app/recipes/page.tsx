'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Search, Filter, Heart, Clock, Star, Users, Sparkles, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Recipe {
  id: string
  name: string
  category: string
  time: string
  difficulty: string
  rating: number
  reviews: number
  ingredients: string[]
  skinType: string[]
  benefits: string[]
  image: string
  isFavorite: boolean
}

const allRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Máscara Hidratante de Aveia e Mel',
    category: 'Hidratação',
    time: '15 min',
    difficulty: 'Fácil',
    rating: 4.8,
    reviews: 234,
    ingredients: ['Aveia', 'Mel', 'Iogurte natural'],
    skinType: ['seca', 'sensível', 'normal'],
    benefits: ['Hidratação profunda', 'Acalma irritações', 'Remove impurezas'],
    image: '/api/placeholder/400/300',
    isFavorite: false
  },
  {
    id: '2',
    name: 'Esfoliante de Açúcar e Óleo de Coco',
    category: 'Esfoliação',
    time: '10 min',
    difficulty: 'Fácil',
    rating: 4.7,
    reviews: 189,
    ingredients: ['Açúcar mascavo', 'Óleo de coco', 'Limão'],
    skinType: ['normal', 'oleosa', 'mista'],
    benefits: ['Remove células mortas', 'Estimula circulação', 'Deixa pele macia'],
    image: '/api/placeholder/400/300',
    isFavorite: true
  },
  {
    id: '3',
    name: 'Tônico de Chá Verde e Babosa',
    category: 'Tônico',
    time: '5 min',
    difficulty: 'Fácil',
    rating: 4.9,
    reviews: 156,
    ingredients: ['Chá verde', 'Babosa', 'Vinagre de maçã'],
    skinType: ['oleosa', 'mista', 'acneica'],
    benefits: ['Antioxidante', 'Equilibra pH', 'Reduz inflamações'],
    image: '/api/placeholder/400/300',
    isFavorite: false
  },
  {
    id: '4',
    name: 'Máscara Clareadora de Abacate',
    category: 'Clareamento',
    time: '20 min',
    difficulty: 'Médio',
    rating: 4.6,
    reviews: 98,
    ingredients: ['Abacate', 'Mel', 'Limão'],
    skinType: ['seca', 'normal', 'madura'],
    benefits: ['Clareia manchas', 'Nutre profundamente', 'Previne envelhecimento'],
    image: '/api/placeholder/400/300',
    isFavorite: true
  },
  {
    id: '5',
    name: 'Soro Facial de Vitamina C',
    category: 'Soro',
    time: '25 min',
    difficulty: 'Médio',
    rating: 4.5,
    reviews: 145,
    ingredients: ['Laranja', 'Glicerina', 'Vitamina E'],
    skinType: ['normal', 'mista', 'madura'],
    benefits: ['Antioxidante', 'Estimula colágeno', 'Ilumina a pele'],
    image: '/api/placeholder/400/300',
    isFavorite: false
  },
  {
    id: '6',
    name: 'Máscara de Argila Verde',
    category: 'Máscara',
    time: '15 min',
    difficulty: 'Fácil',
    rating: 4.7,
    reviews: 203,
    ingredients: ['Argila verde', 'Água', 'Óleo essencial'],
    skinType: ['oleosa', 'acneica', 'mista'],
    benefits: ['Detox', 'Controla oleosidade', 'Trata acne'],
    image: '/api/placeholder/400/300',
    isFavorite: false
  },
  {
    id: '7',
    name: 'Hidratante de Babosa e Pepino',
    category: 'Hidratação',
    time: '10 min',
    difficulty: 'Fácil',
    rating: 4.8,
    reviews: 167,
    ingredients: ['Babosa', 'Pepino', 'Hidratante'],
    skinType: ['sensível', 'seca', 'normal'],
    benefits: ['Refrescante', 'Calmante', 'Hidratante'],
    image: '/api/placeholder/400/300',
    isFavorite: true
  },
  {
    id: '8',
    name: 'Esfoliante de Café e Mel',
    category: 'Esfoliação',
    time: '12 min',
    difficulty: 'Fácil',
    rating: 4.6,
    reviews: 124,
    ingredients: ['Café moído', 'Mel', 'Óleo de coco'],
    skinType: ['normal', 'seca', 'mista'],
    benefits: ['Remove células mortas', 'Estimula circulação', 'Combate celulite'],
    image: '/api/placeholder/400/300',
    isFavorite: false
  }
]

const categories = ['Todas', 'Hidratação', 'Esfoliação', 'Tônico', 'Máscara', 'Soro', 'Clareamento']
const skinTypes = ['Todas', 'Normal', 'Seca', 'Oleosa', 'Mista', 'Sensível', 'Acneica', 'Madura']
const difficulties = ['Todas', 'Fácil', 'Médio', 'Difícil']

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>(allRecipes)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [selectedSkinType, setSelectedSkinType] = useState('Todas')
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todas')
  const [showFilters, setShowFilters] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    let filtered = allRecipes

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase())) ||
        recipe.benefits.some(ben => ben.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== 'Todas') {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory)
    }

    // Filter by skin type
    if (selectedSkinType !== 'Todas') {
      filtered = filtered.filter(recipe => recipe.skinType.includes(selectedSkinType))
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'Todas') {
      filtered = filtered.filter(recipe => recipe.difficulty === selectedDifficulty)
    }

    setRecipes(filtered)
  }, [searchTerm, selectedCategory, selectedSkinType, selectedDifficulty])

  const toggleFavorite = (recipeId: string) => {
    setRecipes(prev => prev.map(recipe =>
      recipe.id === recipeId ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
    ))
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('Todas')
    setSelectedSkinType('Todas')
    setSelectedDifficulty('Todas')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
            Voltar para home
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Biblioteca de Receitas
          </h1>
          <p className="text-xl text-gray-600">
            Descubra receitas caseiras para todos os tipos de pele
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar receitas, ingredientes ou benefícios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filtros
              {(selectedCategory !== 'Todas' || selectedSkinType !== 'Todas' || selectedDifficulty !== 'Todas') && (
                <Badge variant="secondary" className="ml-2">
                  {[
                    selectedCategory !== 'Todas' ? 1 : 0,
                    selectedSkinType !== 'Todas' ? 1 : 0,
                    selectedDifficulty !== 'Todas' ? 1 : 0
                  ].reduce((a, b) => a + b, 0)}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Filtros</CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Limpar todos
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Categoria</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tipo de Pele</label>
                    <Select value={selectedSkinType} onValueChange={setSelectedSkinType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {skinTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Dificuldade</label>
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map(difficulty => (
                          <SelectItem key={difficulty} value={difficulty}>
                            {difficulty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== 'Todas' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Categoria: {selectedCategory}
                <button onClick={() => setSelectedCategory('Todas')} className="ml-1">×</button>
              </Badge>
            )}
            {selectedSkinType !== 'Todas' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Pele: {selectedSkinType}
                <button onClick={() => setSelectedSkinType('Todas')} className="ml-1">×</button>
              </Badge>
            )}
            {selectedDifficulty !== 'Todas' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Dificuldade: {selectedDifficulty}
                <button onClick={() => setSelectedDifficulty('Todas')} className="ml-1">×</button>
              </Badge>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando <span className="font-semibold">{recipes.length}</span> receitas
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe, index) => (
            <Card 
              key={recipe.id} 
              className={`hover:shadow-lg transition-all duration-300 cursor-pointer group ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-t-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 p-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(recipe.id)
                    }}
                  >
                    <Heart 
                      className={`w-4 h-4 ${recipe.isFavorite ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </Button>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {recipe.name}
                    </CardTitle>
                    <CardDescription>{recipe.category}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{recipe.time}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {recipe.difficulty}
                  </Badge>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{recipe.rating}</span>
                  <span className="text-sm text-gray-500">({recipe.reviews})</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Ingredientes principais:</p>
                    <div className="flex flex-wrap gap-1">
                      {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{recipe.ingredients.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Ideal para:</p>
                    <div className="flex flex-wrap gap-1">
                      {recipe.skinType.slice(0, 2).map((type, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                      {recipe.skinType.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{recipe.skinType.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-sm">
                  Ver Receita Completa
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {recipes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nenhuma receita encontrada</h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar seus filtros ou buscar por outros termos
            </p>
            <Button onClick={clearFilters} variant="outline">
              Limpar filtros
            </Button>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
            <CardContent className="p-8">
              <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Gostou das receitas?</h3>
              <p className="text-gray-600 mb-6">
                Assine nosso plano premium para receber receitas exclusivas, 
                acompanhamento personalizado e muito mais!
              </p>
              <Link href="/checkout">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Assinar Agora
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
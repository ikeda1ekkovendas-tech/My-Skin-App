import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

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
  instructions: string[]
  warnings?: string[]
  frequency: string
  prepTime: string
  activeTime: string
  totalTime: string
}

// Enhanced recipe database with more detailed information
const recipesDatabase: Recipe[] = [
  {
    id: 'oatmeal_honey_mask',
    name: 'Máscara Hidratante de Aveia e Mel',
    category: 'Hidratação',
    time: '15 min',
    difficulty: 'Fácil',
    rating: 4.8,
    reviews: 234,
    ingredients: ['2 colheres de aveia em flocos', '1 colher de mel puro', '1 colher de iogurte natural', '1 colher de chá de água morna'],
    skinType: ['seca', 'sensível', 'normal'],
    benefits: ['Hidratação profunda', 'Acalma irritações', 'Remove impurezas', 'Anti-inflamatório', 'Rico em antioxidantes'],
    image: '/api/placeholder/400/300',
    instructions: [
      'Em uma tigela pequena, misture a aveia com a água morna',
      'Adicione o mel e misture até formar uma pasta homogênea',
      'Incorpore o iogurte natural e misture bem',
      'Com o rosto limpo, aplique a máscara com movimentos suaves',
      'Deixe agir por 15-20 minutos',
      'Remova com água morna em movimentos circulares',
      'Seque o rosto suavemente com uma toalha limpa'
    ],
    warnings: ['Teste uma pequena área da pele antes de usar', 'Evite contato com os olhos', 'Não use se for alérgico a algum ingrediente'],
    frequency: '2-3 vezes por semana',
    prepTime: '5 min',
    activeTime: '15 min',
    totalTime: '20 min'
  },
  {
    id: 'sugar_coconut_scrub',
    name: 'Esfoliante de Açúcar e Óleo de Coco',
    category: 'Esfoliação',
    time: '10 min',
    difficulty: 'Fácil',
    rating: 4.7,
    reviews: 189,
    ingredients: ['2 colheres de açúcar mascavo', '1 colher de óleo de coco virgem', '1/2 colher de chá de suco de limão', '1 gota de óleo essencial de lavanda (opcional)'],
    skinType: ['normal', 'oleosa', 'mista'],
    benefits: ['Remove células mortas', 'Estimula circulação', 'Deixa pele macia', 'Reduz poros dilatados', 'Previne cravos'],
    image: '/api/placeholder/400/300',
    instructions: [
      'Em um recipiente, misture o açúcar mascavo com o óleo de coco',
      'Adicione o suco de limão fresco',
      'Se desejar, adicione uma gota de óleo essencial de lavanda',
      'Misture até obter uma consistência granulada',
      'Com a pele úmida, massage suavemente o rosto em movimentos circulares',
      'Concentre nas áreas mais oleosas ou com cravos',
      'Enxágue bem com água morna',
      'Aplique um hidratante leve após o uso'
    ],
    warnings: ['Não usar em pele irritada ou com acne ativa', 'Evitar área dos olhos', 'Use no máximo 1-2 vezes por semana'],
    frequency: '1 vez por semana',
    prepTime: '3 min',
    activeTime: '5 min',
    totalTime: '8 min'
  },
  {
    id: 'green_tea_toner',
    name: 'Tônico de Chá Verde e Babosa',
    category: 'Tônico',
    time: '5 min',
    difficulty: 'Fácil',
    rating: 4.9,
    reviews: 156,
    ingredients: ['1 xícara de chá verde forte', '2 colheres de gel de babosa', '1 colher de vinagre de maçã', '1/2 xícara de água de rosas'],
    skinType: ['oleosa', 'mista', 'acneica'],
    benefits: ['Antioxidante poderoso', 'Equilibra pH da pele', 'Reduz inflamações', 'Controla oleosidade', 'Previne envelhecimento'],
    image: '/api/placeholder/400/300',
    instructions: [
      'Prepare o chá verde bem forte e deixe esfriar completamente',
      'Misture o gel de babosa com o vinagre de maçã',
      'Combine o chá verde frio com a mistura de babosa',
      'Adicione a água de rosas e misture bem',
      'Transfira para um frasco spray limpo',
      'Aplique no rosto após a limpeza, antes do hidratante',
      'Use diariamente de manhã e à noite'
    ],
    warnings: ['Conservar na geladeira por até 5 dias', 'Faça um teste de alergia antes de usar', 'Evite contato com os olhos'],
    frequency: 'Todos os dias',
    prepTime: '10 min',
    activeTime: '2 min',
    totalTime: '12 min'
  },
  {
    id: 'avocado_mask',
    name: 'Máscara Nutritiva de Abacate',
    category: 'Nutrição',
    time: '20 min',
    difficulty: 'Fácil',
    rating: 4.6,
    reviews: 98,
    ingredients: ['1/2 abacate bem maduro', '1 colher de mel', '1 colher de azeite de oliva extra virgem', '1 colher de iogurte natural'],
    skinType: ['seca', 'normal', 'madura'],
    benefits: ['Nutre profundamente', 'Rico em vitaminas E e C', 'Repara barreira cutânea', 'Antienvelhecimento', 'Elasticidade'],
    image: '/api/placeholder/400/300',
    instructions: [
      'Amasse o abacate com um garfo até formar um purê',
      'Adicione o mel e o azeite de oliva',
      'Incorpore o iogurte natural e misture bem',
      'Aplique uma camada generosa no rosto limpo',
      'Evite a área dos olhos e boca',
      'Deixe agir por 20 minutos',
      'Remova com água morna e sabonete suave',
      'Finalize com seu hidratante habitual'
    ],
    warnings: ['Não usar em pele muito oleosa', 'Teste antes de usar pela primeira vez', 'Use imediatamente após preparo'],
    frequency: '1 vez por semana',
    prepTime: '5 min',
    activeTime: '20 min',
    totalTime: '25 min'
  },
  {
    id: 'clay_mask',
    name: 'Máscara de Argila Verde',
    category: 'Detox',
    time: '15 min',
    difficulty: 'Fácil',
    rating: 4.7,
    reviews: 203,
    ingredients: ['2 colheres de argila verde em pó', 'Água mineral ou chá verde', '1 gota de óleo essencial de tea tree (opcional)', '1/2 colher de mel'],
    skinType: ['oleosa', 'acneica', 'mista'],
    benefits: ['Detox profundo', 'Controla oleosidade excessiva', 'Trata acne e espinhas', 'Minimiza poros', 'Remove toxinas'],
    image: '/api/placeholder/400/300',
    instructions: [
      'Em uma tigela de vidro ou cerâmica, coloque a argila verde',
      'Adicione água ou chá verde aos poucos, misturando',
      'Continue adicionando líquido até formar uma pasta lisa',
      'Adicione o mel e óleo essencial se desejar',
      'Aplique uma camada fina e uniforme no rosto',
      'Evite área dos olhos e boca',
      'Deixe secar por 10-15 minutos (não completamente)',
      'Remova com água morna em movimentos circulares',
      'Hidrate bem a pele após o uso'
    ],
    warnings: ['Não deixar secar completamente na pele', 'Hidratar bem após o uso', 'Não usar mais de 2 vezes por semana'],
    frequency: '1-2 vezes por semana',
    prepTime: '5 min',
    activeTime: '15 min',
    totalTime: '20 min'
  },
  {
    id: 'vitamin_c_serum',
    name: 'Soro Facial de Vitamina C Natural',
    category: 'Soro',
    time: '25 min',
    difficulty: 'Médio',
    rating: 4.5,
    reviews: 145,
    ingredients: ['1 laranja grande', '1 colher de glicerina vegetal', '1 cápsula de vitamina E', '1/2 colher de chá de aloe vera gel'],
    skinType: ['normal', 'mista', 'madura'],
    benefits: ['Antioxidante potente', 'Estimula produção de colágeno', 'Ilumina a pele', 'Uniformiza o tom', 'Protege contra radicais livres'],
    image: '/api/placeholder/400/300',
    instructions: [
      'Esprema o suco da laranja e coe bem',
      'Misture o suco com a glicerina vegetal',
      'Abra a cápsula de vitamina E e adicione o conteúdo',
      'Incorpore o gel de aloe vera',
      'Misture tudo muito bem',
      'Transfira para um frasco escuro com conta-gotas',
      'Aplique algumas gotas no rosto limpo',
      'Use de manhã antes do protetor solar'
    ],
    warnings: ['Conservar na geladeira por até 3 dias', 'Usar apenas à noite se for sensível ao sol', 'Testar antes de usar'],
    frequency: 'Todos os dias',
    prepTime: '15 min',
    activeTime: '5 min',
    totalTime: '20 min'
  },
  {
    id: 'coffee_scrub',
    name: 'Esfoliante de Café e Mel',
    category: 'Esfoliação',
    time: '12 min',
    difficulty: 'Fácil',
    rating: 4.6,
    reviews: 124,
    ingredients: ['2 colheres de café moído', '1 colher de mel', '1 colher de óleo de coco', '1/2 colher de açúcar mascavo'],
    skinType: ['normal', 'seca', 'mista'],
    benefits: ['Remove células mortas', 'Estimula circulação', 'Reduz celulite', 'Deixa pele macia', 'Aroma revigorante'],
    image: '/api/placeholder/400/300',
    instructions: [
      'Misture o café moído com o açúcar mascavo',
      'Adicione o óleo de coco derretido',
      'Incorpore o mel e misture bem',
      'Com a pele úmida, massage suavemente',
      'Foque nas áreas que precisam de mais atenção',
      'Enxágue com água morna',
      'Aplique um hidratante após o uso'
    ],
    warnings: ['Não usar em pele sensível', 'Evitar área dos olhos', 'Pode manchar roupas claras'],
    frequency: '1-2 vezes por semana',
    prepTime: '5 min',
    activeTime: '7 min',
    totalTime: '12 min'
  },
  {
    id: 'cucumber_mask',
    name: 'Máscara Refrescante de Pepino',
    category: 'Hidratação',
    time: '10 min',
    difficulty: 'Fácil',
    rating: 4.8,
    reviews: 167,
    ingredients: ['1/2 pepino médio', '1 colher de iogurte natural', '1 colher de chá de mel', 'Algumas folhas de hortelã'],
    skinType: ['sensível', 'seca', 'normal'],
    benefits: ['Refrescante imediato', 'Reduz inchaços', 'Calmante', 'Hidratação leve', 'Reduz olheiras'],
    image: '/api/placeholder/400/300',
    instructions: [
      'Bata o pepino no liquidificador ou processador',
      'Coe para remover as sementes se desejar',
      'Misture o pepino batido com iogurte natural',
      'Adicione o mel e misture bem',
      'Adicione folhas de hortelã picadas',
      'Aplique no rosto e deixe por 10-15 minutos',
      'Enxágue com água fria',
      'Sinta a sensação refrescante!'
    ],
    warnings: ['Usar imediatamente após preparo', 'Conservar na geladeira por no máximo 1 dia'],
    frequency: '2-3 vezes por semana',
    prepTime: '5 min',
    activeTime: '10 min',
    totalTime: '15 min'
  }
]

// Mock user favorites storage (in a real app, this would be in a database)
const userFavorites = new Map<string, string[]>()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const skinType = searchParams.get('skinType')
  const difficulty = searchParams.get('difficulty')
  const search = searchParams.get('search')
  const userId = searchParams.get('userId')

  let filteredRecipes = [...recipesDatabase]

  // Filter by category
  if (category && category !== 'Todas') {
    filteredRecipes = filteredRecipes.filter(recipe => 
      recipe.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Filter by skin type
  if (skinType && skinType !== 'Todas') {
    filteredRecipes = filteredRecipes.filter(recipe => 
      recipe.skinType.some(type => 
        type.toLowerCase() === skinType.toLowerCase()
      )
    )
  }

  // Filter by difficulty
  if (difficulty && difficulty !== 'Todas') {
    filteredRecipes = filteredRecipes.filter(recipe => 
      recipe.difficulty.toLowerCase() === difficulty.toLowerCase()
    )
  }

  // Search functionality
  if (search) {
    const searchLower = search.toLowerCase()
    filteredRecipes = filteredRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchLower) ||
      recipe.category.toLowerCase().includes(searchLower) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchLower)) ||
      recipe.benefits.some(ben => ben.toLowerCase().includes(searchLower))
    )
  }

  // Add favorite status if userId is provided
  if (userId) {
    const favorites = userFavorites.get(userId) || []
    filteredRecipes = filteredRecipes.map(recipe => ({
      ...recipe,
      isFavorite: favorites.includes(recipe.id)
    }))
  }

  return NextResponse.json({
    success: true,
    recipes: filteredRecipes,
    total: filteredRecipes.length,
    categories: ['Todas', ...Array.from(new Set(recipesDatabase.map(r => r.category)))],
    skinTypes: ['Todas', ...Array.from(new Set(recipesDatabase.flatMap(r => r.skinType)))],
    difficulties: ['Todas', ...Array.from(new Set(recipesDatabase.map(r => r.difficulty)))]
  })
}

export async function POST(request: NextRequest) {
  try {
    const { recipeId, userId, action } = await request.json()

    if (!recipeId || !userId || !action) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    // Get current favorites for user
    const currentFavorites = userFavorites.get(userId) || []

    if (action === 'toggle') {
      const recipeIndex = currentFavorites.indexOf(recipeId)
      
      if (recipeIndex > -1) {
        // Remove from favorites
        currentFavorites.splice(recipeIndex, 1)
      } else {
        // Add to favorites
        currentFavorites.push(recipeId)
      }
    } else if (action === 'add') {
      if (!currentFavorites.includes(recipeId)) {
        currentFavorites.push(recipeId)
      }
    } else if (action === 'remove') {
      const recipeIndex = currentFavorites.indexOf(recipeId)
      if (recipeIndex > -1) {
        currentFavorites.splice(recipeIndex, 1)
      }
    }

    // Update user favorites
    userFavorites.set(userId, currentFavorites)

    return NextResponse.json({
      success: true,
      favorites: currentFavorites,
      isFavorite: currentFavorites.includes(recipeId)
    })

  } catch (error) {
    console.error('Error managing favorites:', error)
    return NextResponse.json(
      { error: 'Erro ao gerenciar favoritos' },
      { status: 500 }
    )
  }
}

// Get recipe by ID
export async function PUT(request: NextRequest) {
  try {
    const { recipeId } = await request.json()

    if (!recipeId) {
      return NextResponse.json(
        { error: 'ID da receita não fornecido' },
        { status: 400 }
      )
    }

    const recipe = recipesDatabase.find(r => r.id === recipeId)

    if (!recipe) {
      return NextResponse.json(
        { error: 'Receita não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      recipe
    })

  } catch (error) {
    console.error('Error getting recipe:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar receita' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

interface QuizResponse {
  skinType: string
  concerns: string[]
  age: string
  routineTime: string
  ingredients: string[]
  frequency: string
  experience: string
}

interface RoutineResponse {
  id: string
  skinAnalysis: string
  recommendations: string[]
  morningRoutine: Recipe[]
  eveningRoutine: Recipe[]
  weeklyTreatments: Recipe[]
  tips: string[]
  expectedResults: string[]
}

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
  warnings?: string[]
}

const recipeDatabase: Recipe[] = [
  {
    id: 'oatmeal_honey_mask',
    name: 'Máscara Hidratante de Aveia e Mel',
    category: 'Hidratação',
    time: '15 min',
    difficulty: 'Fácil',
    frequency: '2-3x por semana',
    ingredients: ['2 colheres de aveia em flocos', '1 colher de mel puro', '1 colher de iogurte natural'],
    steps: [
      'Misture a aveia com o mel até formar uma pasta homogênea',
      'Adicione o iogurte e misture bem',
      'Aplique no rosto limpo com movimentos circulares',
      'Deixe agir por 15 minutos',
      'Enxágue com água morna e seque suavemente'
    ],
    benefits: ['Hidratação profunda', 'Acalma irritações', 'Remove impurezas', 'Anti-inflamatório'],
    warnings: ['Teste uma pequena área primeiro', 'Evite contato com os olhos']
  },
  {
    id: 'sugar_coconut_scrub',
    name: 'Esfoliante de Açúcar e Óleo de Coco',
    category: 'Esfoliação',
    time: '10 min',
    difficulty: 'Fácil',
    frequency: '1x por semana',
    ingredients: ['2 colheres de açúcar mascavo', '1 colher de óleo de coco', 'Algumas gotas de limão'],
    steps: [
      'Misture o açúcar com o óleo de coco',
      'Adicione algumas gotas de limão (opcional)',
      'Massage suavemente na pele úmida',
      'Enxágue bem com água morna',
      'Aplique um hidratante leve'
    ],
    benefits: ['Remove células mortas', 'Estimula circulação', 'Deixa pele macia', 'Reduz poros'],
    warnings: ['Não usar em pele irritada', 'Evitar área dos olhos']
  },
  {
    id: 'green_tea_toner',
    name: 'Tônico de Chá Verde',
    category: 'Tônico',
    time: '5 min',
    difficulty: 'Fácil',
    frequency: 'Todos os dias',
    ingredients: ['1 xícara de chá verde forte', '1 colher de vinagre de maçã', '2 colheres de água de rosas'],
    steps: [
      'Prepare o chá verde e deixe esfriar completamente',
      'Misture com vinagre de maçã e água de rosas',
      'Guarde em um frasco spray',
      'Aplique após a limpeza facial',
      'Use antes do hidratante'
    ],
    benefits: ['Antioxidante', 'Equilibra pH', 'Reduz inflamações', 'Controla oleosidade'],
    warnings: ['Conservar na geladeira por até 3 dias']
  },
  {
    id: 'avocado_mask',
    name: 'Máscara Nutritiva de Abacate',
    category: 'Nutrição',
    time: '20 min',
    difficulty: 'Fácil',
    frequency: '1x por semana',
    ingredients: ['1/2 abacate maduro', '1 colher de mel', '1 colher de azeite de oliva'],
    steps: [
      'Amasse o abacate até formar uma pasta',
      'Misture com mel e azeite',
      'Aplique uma camada generosa no rosto',
      'Deixe por 20 minutos',
      'Remova com água morna'
    ],
    benefits: ['Nutre profundamente', 'Rico em vitaminas', 'Repara a barreira cutânea', 'Antienvelhecimento'],
    warnings: ['Não usar em pele muito oleosa']
  },
  {
    id: 'clay_mask',
    name: 'Máscara de Argila Verde',
    category: 'Detox',
    time: '15 min',
    difficulty: 'Fácil',
    frequency: '1x por semana',
    ingredients: ['2 colheres de argila verde', 'Água mineral ou chá verde', '1 gota de óleo essencial de tea tree'],
    steps: [
      'Misture a argila com líquido até formar pasta',
      'Adicione óleo essencial se desejar',
      'Aplique camada fina uniforme',
      'Deixe secar por 10-15 minutos',
      'Remova com água morna em movimentos circulares'
    ],
    benefits: ['Detox profundo', 'Controla oleosidade', 'Trata acne', 'Minimiza poros'],
    warnings: ['Não deixar secar completamente', 'Hidratar após uso']
  }
]

function generateRoutine(quizData: QuizResponse): RoutineResponse {
  const { skinType, concerns, age, routineTime, ingredients, frequency, experience } = quizData
  
  // Use ZAI to generate personalized recommendations
  const personalizedAnalysis = `
    Baseado nas suas respostas:
    - Tipo de pele: ${skinType}
    - Preocupações: ${concerns.join(', ')}
    - Idade: ${age}
    - Tempo disponível: ${routineTime}
    - Ingredientes disponíveis: ${ingredients.join(', ')}
    - Frequência desejada: ${frequency}
    - Experiência: ${experience}
  `
  
  // Filter recipes based on user profile
  const suitableRecipes = recipeDatabase.filter(recipe => {
    // Check if user has required ingredients
    const hasIngredients = recipe.ingredients.some(ingredient => 
      ingredients.some(userIngredient => 
        ingredient.toLowerCase().includes(userIngredient.toLowerCase()) ||
        userIngredient.toLowerCase().includes(ingredient.toLowerCase())
      )
    )
    
    // Check if recipe is suitable for skin type and concerns
    const isSuitableForSkin = checkSkinCompatibility(recipe, skinType, concerns)
    
    return hasIngredients || isSuitableForSkin
  })
  
  // Organize routines by time of day
  const morningRoutine = suitableRecipes.filter(recipe => 
    recipe.category === 'Hidratação' || recipe.category === 'Tônico'
  ).slice(0, 2)
  
  const eveningRoutine = suitableRecipes.filter(recipe => 
    recipe.category === 'Limpeza' || recipe.category === 'Nutrição' || recipe.category === 'Esfoliação'
  ).slice(0, 2)
  
  const weeklyTreatments = suitableRecipes.filter(recipe => 
    recipe.category === 'Detox' || recipe.category === 'Esfoliação'
  ).slice(0, 2)
  
  return {
    id: generateId(),
    skinAnalysis: generateSkinAnalysis(skinType, concerns, age),
    recommendations: generateRecommendations(skinType, concerns, experience),
    morningRoutine,
    eveningRoutine,
    weeklyTreatments,
    tips: generateTips(skinType, concerns, frequency),
    expectedResults: generateExpectedResults(skinType, concerns, frequency)
  }
}

function checkSkinCompatibility(recipe: Recipe, skinType: string, concerns: string[]): boolean {
  // Simple compatibility logic - in a real app, this would be more sophisticated
  if (skinType === 'oily' && concerns.includes('acne')) {
    return recipe.category === 'Esfoliação' || recipe.category === 'Detox' || recipe.category === 'Tônico'
  }
  
  if (skinType === 'dry') {
    return recipe.category === 'Hidratação' || recipe.category === 'Nutrição'
  }
  
  if (skinType === 'sensitive') {
    return recipe.difficulty === 'Fácil' && !recipe.warnings?.includes('Não usar em pele sensível')
  }
  
  return true
}

function generateSkinAnalysis(skinType: string, concerns: string[], age: string): string {
  const skinTypeDescriptions = {
    normal: 'equilibrada e saudável',
    oily: 'com produção excessiva de sebo',
    dry: 'com falta de hidratação natural',
    combination: 'oleosa na zona T e seca nas bochechas',
    sensitive: 'reativa e facilmente irritada'
  }
  
  return `Sua pele é ${skinTypeDescriptions[skinType as keyof typeof skinTypeDescriptions]} com foco em tratar ${concerns.join(', ')}. Na faixa etária de ${age} anos, recomendamos produtos que ${age === '15-25' ? 'controlem a oleosidade e previnham acne' : age === '26-35' ? 'mantenham a hidratação e previnam sinais' : 'combatam o envelhecimento e nutram profundamente'}.`
}

function generateRecommendations(skinType: string, concerns: string[], experience: string): string[] {
  const recommendations = []
  
  if (experience === 'beginner') {
    recommendations.push('Comece com receitas simples e ingredientes que você já tem em casa')
    recommendations.push('Teste sempre uma pequena área antes de aplicar no rosto todo')
  }
  
  if (concerns.includes('acne')) {
    recommendations.push('Use produtos com propriedades anti-inflamatórias como mel e chá verde')
    recommendations.push('Evite esfoliação excessiva para não irritar a pele')
  }
  
  if (concerns.includes('hydration')) {
    recommendations.push('Hidrate sua pele pelo menos 2 vezes ao dia')
    recommendations.push('Beba bastante água para hidratação de dentro para fora')
  }
  
  return recommendations
}

function generateTips(skinType: string, concerns: string[], frequency: string): string[] {
  const tips = [
    'Sempre limpe o rosto antes de aplicar qualquer tratamento',
    'Use protetor solar todos os dias, mesmo em casa',
    'Durma pelo menos 7 horas por noite para melhor recuperação da pele'
  ]
  
  if (skinType === 'oily') {
    tips.push('Evite lavar o rosto mais de 2 vezes ao dia para não estimular mais oleosidade')
  }
  
  if (concerns.includes('spots')) {
    tips.push('Use ingredientes clareadores como limão e mamão com moderação e sempre à noite')
  }
  
  return tips
}

function generateExpectedResults(skinType: string, concerns: string[], frequency: string): string[] {
  const results = []
  
  if (frequency === 'daily') {
    results.push('Resultados visíveis em 1-2 semanas')
  } else if (frequency === '3x_week') {
    results.push('Resultados visíveis em 2-3 semanas')
  } else {
    results.push('Resultados visíveis em 3-4 semanas')
  }
  
  if (concerns.includes('acne')) {
    results.push('Redução de 50% nas espinhas em 4 semanas')
  }
  
  if (concerns.includes('hydration')) {
    results.push('Pele mais macia e hidratada imediatamente após primeira aplicação')
  }
  
  results.push('Melhora geral na textura e aparência da pele')
  
  return results
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export async function POST(request: NextRequest) {
  try {
    const quizData: QuizResponse = await request.json()
    
    // Validate required fields
    if (!quizData.skinType || !quizData.concerns || !quizData.age) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      )
    }
    
    // Generate personalized routine
    const routine = generateRoutine(quizData)
    
    // In a real app, you would save this to a database
    // For now, we'll just return the generated routine
    
    return NextResponse.json({
      success: true,
      routine,
      message: 'Rotina personalizada gerada com sucesso!'
    })
    
  } catch (error) {
    console.error('Error generating routine:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar rotina personalizada' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'API de rotinas de skin care funcionando',
    availableRecipes: recipeDatabase.length,
    supportedSkinTypes: ['normal', 'oily', 'dry', 'combination', 'sensitive'],
    supportedConcerns: ['acne', 'hydration', 'aging', 'spots', 'pores', 'blackheads', 'dullness', 'sensitivity']
  })
}
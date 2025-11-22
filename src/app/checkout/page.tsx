'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Check, Star, Shield, CreditCard, Lock, ChevronRight, Sparkles, Gift, Zap, Crown } from 'lucide-react'
import Link from 'next/link'

interface Plan {
  id: string
  name: string
  price: number
  originalPrice?: number
  period: string
  description: string
  features: string[]
  badge?: string
  icon: React.ReactNode
  popular?: boolean
}

const plans: Plan[] = [
  {
    id: 'monthly',
    name: 'Plano Mensal',
    price: 19.90,
    originalPrice: 29.90,
    period: '/mês',
    description: 'Perfeito para começar sua jornada',
    features: [
      'Rotinas personalizadas ilimitadas',
      '50+ receitas exclusivas',
      'Lembretes diários inteligentes',
      'Acesso à biblioteca completa',
      'Suporte por email 24/7',
      'Cancelamento a qualquer momento'
    ],
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    id: 'quarterly',
    name: 'Plano Trimestral',
    price: 39.90,
    originalPrice: 59.90,
    period: '/3 meses',
    description: 'Economia de 33% - o mais popular',
    features: [
      'Tudo do plano mensal',
      'Consultorias em grupo mensais',
      'Ebook exclusivo "Guia de Beleza Natural"',
      'Acesso antecipado a novas receitas',
      'Badge de membro premium',
      'Prioridade no suporte'
    ],
    badge: 'Mais Popular',
    icon: <Zap className="w-6 h-6" />,
    popular: true
  },
  {
    id: 'lifetime',
    name: 'Plano Vitalício',
    price: 97.00,
    originalPrice: 197.00,
    period: '/única',
    description: 'Acesso vitalício com economia de 51%',
    features: [
      'Acesso vitalício a tudo',
      'Todas as atualizações futuras',
      'Consulta personalizada 1-a-1',
      'Workshops exclusivos mensais',
      'Comunidade VIP no WhatsApp',
      'Certificado de "Expert em Skin Care Natural"',
      'Presente exclusivo em casa'
    ],
    badge: 'Melhor Oferta',
    icon: <Crown className="w-6 h-6" />
  }
]

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState('quarterly')
  const [billingInfo, setBillingInfo] = useState({
    email: '',
    fullName: '',
    cpf: '',
    phone: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptTerms) {
      alert('Por favor, aceite os termos de serviço')
      return
    }
    
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      alert('Pagamento processado com sucesso! Redirecionando...')
      // In a real app, this would redirect to a success page
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
            Voltar para home
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Escolha seu plano
          </h1>
          <p className="text-xl text-gray-600">
            Transforme sua pele com receitas naturais e personalizadas
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4 text-green-500" />
            <span>Compra 100% segura</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Lock className="w-4 h-4 text-green-500" />
            <span>Dados criptografados</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>4.9/5 avaliação</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Plans Selection */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedPlan === plan.id 
                      ? 'ring-2 ring-purple-500 bg-purple-50/50' 
                      : 'hover:border-purple-200'
                  } ${plan.popular ? 'relative' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-purple-600">
                          {plan.icon}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{plan.name}</CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                        </div>
                      </div>
                      <RadioGroupItem value={plan.id} id={plan.id} />
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-purple-600">
                        R$ {plan.price.toFixed(2)}
                      </span>
                      <span className="text-gray-600">{plan.period}</span>
                      {plan.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          R$ {plan.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Payment Form */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Informações de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Billing Information */}
                  <div>
                    <h3 className="font-medium mb-4">Dados Pessoais</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={billingInfo.email}
                          onChange={(e) => setBillingInfo({...billingInfo, email: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="fullName">Nome Completo *</Label>
                        <Input
                          id="fullName"
                          placeholder="João Silva"
                          value={billingInfo.fullName}
                          onChange={(e) => setBillingInfo({...billingInfo, fullName: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cpf">CPF *</Label>
                        <Input
                          id="cpf"
                          placeholder="000.000.000-00"
                          value={billingInfo.cpf}
                          onChange={(e) => setBillingInfo({...billingInfo, cpf: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          placeholder="(00) 00000-0000"
                          value={billingInfo.phone}
                          onChange={(e) => setBillingInfo({...billingInfo, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-medium mb-4">Método de Pagamento</h3>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label htmlFor="credit" className="flex-1 cursor-pointer">
                          <div className="font-medium">Cartão de Crédito</div>
                          <div className="text-sm text-gray-600">Visa, Mastercard, Elo, Amex</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="pix" id="pix" />
                        <Label htmlFor="pix" className="flex-1 cursor-pointer">
                          <div className="font-medium">Pix</div>
                          <div className="text-sm text-gray-600">Pagamento instantâneo com 5% de desconto</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === 'credit' && (
                    <div>
                      <h3 className="font-medium mb-4">Dados do Cartão</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Número do Cartão *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            value={cardInfo.number}
                            onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardName">Nome no Cartão *</Label>
                          <Input
                            id="cardName"
                            placeholder="JOÃO SILVA"
                            value={cardInfo.name}
                            onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Validade *</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/AA"
                              value={cardInfo.expiry}
                              onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cardInfo.cvv}
                              onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Terms */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        Li e aceito os{' '}
                        <Link href="/terms" className="text-purple-600 hover:underline">
                          Termos de Serviço
                        </Link>
                        {' '}e a{' '}
                        <Link href="/privacy" className="text-purple-600 hover:underline">
                          Política de Privacidade
                        </Link>
                        . Autorizo a cobrança recorrente conforme o plano selecionado.
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={!acceptTerms || isProcessing}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg py-3"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processando...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4" />
                        Finalizar Assinatura - R$ {selectedPlanData?.price.toFixed(2)}
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">{selectedPlanData?.name}</h4>
                  <p className="text-sm text-gray-600">{selectedPlanData?.description}</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>R$ {selectedPlanData?.originalPrice?.toFixed(2) || selectedPlanData?.price.toFixed(2)}</span>
                  </div>
                  {selectedPlanData?.originalPrice && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Desconto</span>
                      <span>-R$ {(selectedPlanData.originalPrice - selectedPlanData.price).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Taxa de serviço</span>
                    <span className="text-green-600">Grátis</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-purple-600">R$ {selectedPlanData?.price.toFixed(2)}</span>
                  </div>
                </div>

                {selectedPlanData?.originalPrice && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-700">
                      <strong>Economia de R$ {(selectedPlanData.originalPrice - selectedPlanData.price).toFixed(2)}</strong> com esta oferta!
                    </p>
                  </div>
                )}

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <h4 className="font-medium text-purple-800 mb-2">Bônus Inclusos:</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>✓ Acesso imediato</li>
                    <li>✓ Suporte prioritário</li>
                    <li>✓ Cancelamento a qualquer momento</li>
                    <li>✓ Garantia de 7 dias</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Compra 100% segura</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">V</span>
                    </div>
                    <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">E</span>
                    </div>
                    <div className="w-8 h-8 bg-yellow-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">E</span>
                    </div>
                    <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MC</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">O que nossas clientes dizem</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Maria Silva",
                rating: 5,
                comment: "Minha pele nunca esteve tão boa! As receitas são fáceis e os resultados aparecem rápido."
              },
              {
                name: "Ana Santos",
                rating: 5,
                comment: "Economizo muito dinheiro usando ingredientes que já tenho em casa. Vale muito a pena!"
              },
              {
                name: "Julia Costa",
                rating: 5,
                comment: "O app mudou minha rotina de skin care. Adoro a personalização e as dicas diárias!"
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-3">"{testimonial.comment}"</p>
                  <p className="font-medium text-purple-600">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

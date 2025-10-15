'use client'

import { useState } from 'react'
import { Play, Pause, RotateCcw, Target, User, BookOpen, Droplets, Coffee, Trophy, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useFastingTimer, useLocalStorage } from '@/hooks/useFasting'
import { FASTING_BENEFITS, MOTIVATIONAL_QUOTES, ALLOWED_BEVERAGES, FASTING_ACTIVITIES } from '@/lib/constants'

export default function FastingApp() {
  const {
    isRunning,
    time,
    startFasting,
    pauseFasting,
    resetFasting,
    formatTime,
    getHours
  } = useFastingTimer()

  const [weight, setWeight] = useLocalStorage('userWeight', '')
  const [height, setHeight] = useLocalStorage('userHeight', '')
  const [fastingGoal, setFastingGoal] = useLocalStorage('fastingGoal', 16)
  
  // Calcular IMC
  const calculateBMI = () => {
    if (weight && height) {
      const weightNum = parseFloat(weight)
      const heightNum = parseFloat(height) / 100
      return (weightNum / (heightNum * heightNum)).toFixed(1)
    }
    return '0'
  }

  // Obter benefício atual baseado nas horas
  const getCurrentBenefit = () => {
    const hours = getHours()
    return FASTING_BENEFITS.find(benefit => hours >= benefit.hours) || FASTING_BENEFITS[0]
  }

  // Obter frase motivacional
  const getMotivationalQuote = () => {
    const hours = getHours()
    const quoteIndex = Math.floor(hours / 12) % MOTIVATIONAL_QUOTES.length
    return MOTIVATIONAL_QUOTES[quoteIndex]
  }

  const currentHours = getHours()
  const currentBenefit = getCurrentBenefit()
  const progressPercentage = Math.min((currentHours / fastingGoal) * 100, 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            FastingTracker
          </h1>
          <p className="text-gray-600">Seu companheiro para o jejum intermitente</p>
        </div>

        <Tabs defaultValue="timer" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm shadow-lg">
            <TabsTrigger value="timer" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Timer</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-white">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Metas</span>
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2 data-[state=active]:bg-white">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Dicas</span>
            </TabsTrigger>
          </TabsList>

          {/* Timer Tab */}
          <TabsContent value="timer" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-800">Cronômetro de Jejum</CardTitle>
                <CardDescription>Acompanhe seu progresso em tempo real</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Timer Display */}
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl font-mono font-bold text-gray-800 mb-4">
                    {formatTime()}
                  </div>
                  <div className="text-lg text-gray-600 mb-4">
                    {currentHours}h de jejum
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Progresso</span>
                      <span>{Math.round(progressPercentage)}% da meta</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  {!isRunning ? (
                    <Button onClick={startFasting} size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg">
                      <Play className="w-5 h-5 mr-2" />
                      Iniciar Jejum
                    </Button>
                  ) : (
                    <Button onClick={pauseFasting} size="lg" variant="outline" className="border-2 hover:bg-gray-50">
                      <Pause className="w-5 h-5 mr-2" />
                      Pausar
                    </Button>
                  )}
                  <Button onClick={resetFasting} size="lg" variant="outline" className="border-2 hover:bg-gray-50">
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reiniciar
                  </Button>
                </div>

                {/* Current Benefit */}
                <div className="text-center">
                  <Badge className={`${currentBenefit.color} text-sm px-4 py-2 shadow-md`}>
                    {currentBenefit.title}
                  </Badge>
                  <p className="text-gray-600 mt-2">{currentBenefit.description}</p>
                  {currentBenefit.scientificBasis && (
                    <p className="text-xs text-gray-500 mt-1 italic">{currentBenefit.scientificBasis}</p>
                  )}
                </div>

                {/* Motivational Quote */}
                {currentHours > 0 && currentHours % 12 === 0 && (
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl text-center shadow-md">
                    <Trophy className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <p className="text-purple-800 font-medium">{getMotivationalQuote().text}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Benefits Timeline */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Benefícios do Jejum por Horas
                </CardTitle>
                <CardDescription>Baseado em estudos científicos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {FASTING_BENEFITS.map((benefit) => {
                    const isActive = currentHours >= benefit.hours
                    const isNext = !isActive && currentHours >= (benefit.hours - 4)
                    return (
                      <div key={benefit.hours} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        isActive ? 'bg-green-50 border-l-4 border-green-500 shadow-md' : 
                        isNext ? 'bg-yellow-50 border-l-4 border-yellow-400' : 'bg-gray-50'
                      }`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          isActive ? 'bg-green-500 text-white' : 
                          isNext ? 'bg-yellow-400 text-white' : 'bg-gray-300 text-gray-600'
                        }`}>
                          {benefit.hours}h
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            isActive ? 'text-green-800' : 
                            isNext ? 'text-yellow-800' : 'text-gray-600'
                          }`}>
                            {benefit.title}
                          </p>
                          <p className={`text-sm ${
                            isActive ? 'text-green-600' : 
                            isNext ? 'text-yellow-600' : 'text-gray-500'
                          }`}>
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Dados Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Ex: 70"
                      className="bg-white/70 border-2 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Altura (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Ex: 175"
                      className="bg-white/70 border-2 focus:border-blue-400"
                    />
                  </div>
                </div>
                
                {weight && height && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md">
                    <h3 className="font-semibold text-blue-800 mb-2">Seu IMC</h3>
                    <div className="text-4xl font-bold text-blue-600 mb-2">{calculateBMI()}</div>
                    <p className="text-sm text-blue-600">
                      {parseFloat(calculateBMI()) < 18.5 ? 'Abaixo do peso' :
                       parseFloat(calculateBMI()) < 25 ? 'Peso normal' :
                       parseFloat(calculateBMI()) < 30 ? 'Sobrepeso' : 'Obesidade'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Metas de Jejum
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="goal">Meta de Horas de Jejum</Label>
                  <Input
                    id="goal"
                    type="number"
                    value={fastingGoal}
                    onChange={(e) => setFastingGoal(parseInt(e.target.value) || 16)}
                    min="4"
                    max="72"
                    className="bg-white/70 border-2 focus:border-blue-400"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Recomendado: 16h para iniciantes, 18-24h para intermediários
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[12, 16, 18, 24].map((hours) => (
                    <Button
                      key={hours}
                      variant={fastingGoal === hours ? "default" : "outline"}
                      onClick={() => setFastingGoal(hours)}
                      className={`h-16 flex flex-col shadow-md ${
                        fastingGoal === hours 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                          : 'border-2 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg font-bold">{hours}h</span>
                      <span className="text-xs">
                        {hours === 12 ? 'Iniciante' :
                         hours === 16 ? 'Clássico' :
                         hours === 18 ? 'Avançado' : 'Experiente'}
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            {/* Hydration */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  Hidratação Durante o Jejum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-700 mb-2">
                      <strong>💧 Água:</strong> Beba pelo menos 2-3 litros por dia. A água ajuda a controlar a fome e mantém o corpo funcionando adequadamente.
                    </p>
                    <p className="text-gray-700">
                      <strong>⚡ Eletrólitos:</strong> Adicione uma pitada de sal marinho ou himalaia na água para repor minerais essenciais.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Beverages */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-amber-600" />
                  Bebidas Permitidas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ALLOWED_BEVERAGES.map((beverage, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-800">{beverage.name}</p>
                        <p className="text-sm text-gray-600 mb-2">{beverage.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {beverage.benefits.map((benefit, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Diet Tips */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Dicas de Alimentação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      🥗 Quebra do Jejum
                    </h4>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li>• Comece com alimentos leves (frutas, vegetais)</li>
                      <li>• Evite alimentos processados e açúcares</li>
                      <li>• Mastigue devagar e aprecie cada mordida</li>
                      <li>• Hidrate-se bem antes da primeira refeição</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                      🍽️ Janela de Alimentação
                    </h4>
                    <ul className="space-y-2 text-sm text-orange-700">
                      <li>• Priorize proteínas magras e gorduras saudáveis</li>
                      <li>• Inclua vegetais coloridos em todas as refeições</li>
                      <li>• Evite carboidratos refinados e processados</li>
                      <li>• Planeje suas refeições com antecedência</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activities */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Como Passar o Tempo em Jejum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      🧠 Atividades Mentais
                    </h4>
                    <ul className="space-y-2 text-sm text-purple-700">
                      {FASTING_ACTIVITIES.mental.map((activity, index) => (
                        <li key={index}>• {activity}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
                      🏃‍♂️ Atividades Físicas
                    </h4>
                    <ul className="space-y-2 text-sm text-teal-700">
                      {FASTING_ACTIVITIES.physical.map((activity, index) => (
                        <li key={index}>• {activity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
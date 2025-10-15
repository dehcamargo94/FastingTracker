import { FastingBenefit, MotivationalQuote } from './types'

export const FASTING_BENEFITS: FastingBenefit[] = [
  {
    hours: 4,
    title: "Glicose Estabilizada",
    description: "Níveis de açúcar no sangue começam a se estabilizar",
    color: "bg-red-100 text-red-800",
    scientificBasis: "Estudos mostram que após 4h sem comer, os níveis de glicose começam a normalizar"
  },
  {
    hours: 8,
    title: "Digestão Completa",
    description: "Sistema digestivo entra em estado de repouso e recuperação",
    color: "bg-orange-100 text-orange-800",
    scientificBasis: "O trato digestivo completa o processamento dos alimentos após 6-8 horas"
  },
  {
    hours: 12,
    title: "Cetose Leve",
    description: "Corpo começa a queimar gordura como fonte de energia",
    color: "bg-yellow-100 text-yellow-800",
    scientificBasis: "Após 12h de jejum, o corpo inicia a produção de corpos cetônicos"
  },
  {
    hours: 16,
    title: "Autofagia Iniciada",
    description: "Processo de limpeza celular e reciclagem de proteínas danificadas",
    color: "bg-emerald-100 text-emerald-800",
    scientificBasis: "Pesquisas indicam que a autofagia se intensifica após 16h de jejum"
  },
  {
    hours: 18,
    title: "Cetose Profunda",
    description: "Queima máxima de gordura e melhora da clareza mental",
    color: "bg-green-100 text-green-800",
    scientificBasis: "Níveis elevados de cetonas promovem neuroproteção e queima de gordura"
  },
  {
    hours: 24,
    title: "Autofagia Avançada",
    description: "Limpeza celular profunda e processos anti-envelhecimento",
    color: "bg-blue-100 text-blue-800",
    scientificBasis: "Estudos mostram pico de autofagia após 24h, removendo células danificadas"
  },
  {
    hours: 48,
    title: "Renovação do Sistema Imune",
    description: "Regeneração de células do sistema imunológico",
    color: "bg-indigo-100 text-indigo-800",
    scientificBasis: "Pesquisas da USC mostram renovação de células imunes após 48-72h"
  },
  {
    hours: 72,
    title: "Regeneração Celular Máxima",
    description: "Renovação celular profunda e máxima produção de células-tronco",
    color: "bg-purple-100 text-purple-800",
    scientificBasis: "Jejuns prolongados estimulam a produção de células-tronco hematopoiéticas"
  }
]

export const MOTIVATIONAL_QUOTES: MotivationalQuote[] = [
  {
    text: "Você está no controle da sua saúde! 💪",
    category: "motivation"
  },
  {
    text: "Cada hora de jejum é um investimento no seu bem-estar! ⭐",
    category: "health"
  },
  {
    text: "Seu corpo está se renovando a cada momento! 🌟",
    category: "health"
  },
  {
    text: "A disciplina de hoje é a saúde de amanhã! 🎯",
    category: "discipline"
  },
  {
    text: "Você é mais forte do que imagina! 🔥",
    category: "motivation"
  },
  {
    text: "Transformação acontece fora da zona de conforto! 🚀",
    category: "motivation"
  },
  {
    text: "O jejum é uma jornada de autodescoberta e cura! 🌱",
    category: "health"
  },
  {
    text: "Cada momento de resistência fortalece sua determinação! ⚡",
    category: "discipline"
  }
]

export const HYDRATION_TIPS = [
  "Beba pelo menos 2-3 litros de água por dia durante o jejum",
  "Adicione uma pitada de sal marinho para repor eletrólitos",
  "Água com limão pode ajudar na digestão e dar sabor",
  "Evite bebidas com calorias que quebram o jejum"
]

export const ALLOWED_BEVERAGES = [
  {
    name: "Café Preto",
    description: "Sem açúcar, leite ou adoçantes. Pode ajudar a suprimir o apetite",
    benefits: ["Supressão do apetite", "Aumento do metabolismo", "Antioxidantes"]
  },
  {
    name: "Chás sem Açúcar",
    description: "Chá verde, preto, branco, oolong. Ricos em antioxidantes",
    benefits: ["Antioxidantes", "Hidratação", "Variedade de sabores"]
  },
  {
    name: "Água com Limão",
    description: "Algumas gotas de limão podem ajudar na digestão",
    benefits: ["Vitamina C", "Melhora da digestão", "Sabor natural"]
  }
]

export const BREAKING_FAST_TIPS = [
  "Comece com alimentos leves como frutas e vegetais",
  "Evite alimentos processados e açúcares refinados",
  "Mastigue devagar e aprecie cada mordida",
  "Hidrate-se bem antes da primeira refeição"
]

export const FEEDING_WINDOW_TIPS = [
  "Priorize proteínas magras e gorduras saudáveis",
  "Inclua vegetais coloridos em todas as refeições",
  "Evite carboidratos refinados e processados",
  "Planeje suas refeições com antecedência"
]

export const FASTING_ACTIVITIES = {
  mental: [
    "Leitura e estudos",
    "Meditação e mindfulness",
    "Trabalhos criativos",
    "Planejamento e organização",
    "Journaling e reflexão",
    "Aprender algo novo"
  ],
  physical: [
    "Caminhadas leves",
    "Yoga e alongamento",
    "Limpeza da casa",
    "Exercícios de respiração",
    "Jardinagem",
    "Exercícios leves"
  ]
}
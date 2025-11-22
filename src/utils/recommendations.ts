import { getAssessments } from './storage';

export interface Trail {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  skills: string[];
  lessons: Lesson[];
  image?: any;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz';
  duration: string;
  completed?: boolean;
}

const ALL_TRAILS: Trail[] = [
  {
    id: '1',
    title: 'IA Básica',
    description: 'Aprenda os fundamentos da Inteligência Artificial e como aplicá-los no dia a dia profissional.',
    duration: '2h',
    level: 'Iniciante',
    category: 'Tecnologia',
    skills: ['ai', 'critical'],
    lessons: [
      { id: '1-1', title: 'O que é IA?', type: 'video', duration: '15min' },
      { id: '1-2', title: 'Aplicações Práticas', type: 'text', duration: '20min' },
      { id: '1-3', title: 'Ferramentas de IA', type: 'video', duration: '25min' },
      { id: '1-4', title: 'Quiz Final', type: 'quiz', duration: '10min' },
    ],
  },
  {
    id: '2',
    title: 'Soft Skills Essenciais',
    description: 'Desenvolva habilidades interpessoais fundamentais para o mercado de trabalho.',
    duration: '1h',
    level: 'Iniciante',
    category: 'Desenvolvimento Pessoal',
    skills: ['communication', 'teamwork', 'time-management'],
    lessons: [
      { id: '2-1', title: 'Comunicação Eficaz', type: 'video', duration: '20min' },
      { id: '2-2', title: 'Trabalho em Equipe', type: 'text', duration: '15min' },
      { id: '2-3', title: 'Gestão do Tempo', type: 'video', duration: '25min' },
    ],
  },
  {
    id: '3',
    title: 'Sustentabilidade no Trabalho',
    description: 'Aprenda práticas sustentáveis para aplicar no ambiente profissional.',
    duration: '1.5h',
    level: 'Iniciante',
    category: 'Sustentabilidade',
    skills: ['sustain', 'critical'],
    lessons: [
      { id: '3-1', title: 'Conceitos de Sustentabilidade', type: 'text', duration: '20min' },
      { id: '3-2', title: 'Práticas Sustentáveis', type: 'video', duration: '30min' },
      { id: '3-3', title: 'Implementação no Trabalho', type: 'text', duration: '20min' },
    ],
  },
  {
    id: '4',
    title: 'Pensamento Crítico Avançado',
    description: 'Desenvolva habilidades de análise e tomada de decisão baseada em evidências.',
    duration: '2.5h',
    level: 'Intermediário',
    category: 'Desenvolvimento Pessoal',
    skills: ['critical', 'communication'],
    lessons: [
      { id: '4-1', title: 'Fundamentos do Pensamento Crítico', type: 'video', duration: '30min' },
      { id: '4-2', title: 'Análise de Argumentos', type: 'text', duration: '40min' },
      { id: '4-3', title: 'Tomada de Decisão', type: 'video', duration: '35min' },
      { id: '4-4', title: 'Quiz Prático', type: 'quiz', duration: '15min' },
    ],
  },
];

export const getAllTrails = (): Trail[] => {
  return ALL_TRAILS;
};

export const getTrailById = (id: string): Trail | undefined => {
  return ALL_TRAILS.find((t) => t.id === id);
};

export const getRecommendedTrails = async (): Promise<Trail[]> => {
  const assessments = await getAssessments();
  
  if (assessments.length === 0) {
    // Se não há avaliações, retornar trilhas iniciais
    return ALL_TRAILS.filter((t) => t.level === 'Iniciante').slice(0, 2);
  }

  // Encontrar competências com notas baixas (menor que 7)
  const lowRatedSkills = assessments
    .filter((a) => a.rating < 7)
    .map((a) => a.skill);

  // Encontrar trilhas que desenvolvem essas competências
  const recommendedTrails = ALL_TRAILS.filter((trail) =>
    trail.skills.some((skill) => lowRatedSkills.includes(skill))
  );

  // Se não há trilhas recomendadas, retornar trilhas gerais
  if (recommendedTrails.length === 0) {
    return ALL_TRAILS.slice(0, 3);
  }

  // Ordenar por relevância (mais skills em comum primeiro)
  return recommendedTrails.sort((a, b) => {
    const aMatches = a.skills.filter((s) => lowRatedSkills.includes(s)).length;
    const bMatches = b.skills.filter((s) => lowRatedSkills.includes(s)).length;
    return bMatches - aMatches;
  });
};

export const getTrailsByCategory = (category: string): Trail[] => {
  return ALL_TRAILS.filter((t) => t.category === category);
};


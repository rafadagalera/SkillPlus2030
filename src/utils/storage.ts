import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Profile {
  name: string;
  email: string;
}

export interface Assessment {
  id: string;
  skill: string;
  skillLabel: string;
  rating: number;
  date: string;
}

export interface TrailProgress {
  trailId: string;
  completed: boolean;
  progress: number; // 0-100
  startedAt?: string;
  completedAt?: string;
}

export interface UserProgress {
  totalPoints: number;
  badges: string[];
  completedTrails: number;
  totalAssessments: number;
  skillsDeveloped: string[];
}

// Token & Profile
export const saveToken = async (token: string) => {
  await AsyncStorage.setItem('@skillupplus:token', token);
};

export const getToken = async (): Promise<string | null> => {
  return AsyncStorage.getItem('@skillupplus:token');
};

export const clearToken = async () => {
  await AsyncStorage.removeItem('@skillupplus:token');
};

export const saveProfile = async (profile: Profile) => {
  await AsyncStorage.setItem('@skillupplus:profile', JSON.stringify(profile));
};

export const getProfile = async (): Promise<Profile | null> => {
  const data = await AsyncStorage.getItem('@skillupplus:profile');
  return data ? JSON.parse(data) : null;
};

export const clearProfile = async () => {
  await AsyncStorage.removeItem('@skillupplus:profile');
};

// Assessments
export const saveAssessment = async (assessment: Omit<Assessment, 'id' | 'date'>) => {
  try {
    const assessments = await getAssessments();
    const newAssessment: Assessment = {
      ...assessment,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    assessments.push(newAssessment);
    await AsyncStorage.setItem('@skillupplus:assessments', JSON.stringify(assessments));
    console.log('Avaliação salva no storage:', newAssessment);
    console.log('Total de avaliações no storage:', assessments.length);
    return newAssessment;
  } catch (error) {
    console.error('Erro ao salvar avaliação no storage:', error);
    throw error;
  }
};

export const getAssessments = async (): Promise<Assessment[]> => {
  try {
    const data = await AsyncStorage.getItem('@skillupplus:assessments');
    if (!data) {
      console.log('Nenhuma avaliação encontrada no storage');
      return [];
    }
    const assessments = JSON.parse(data);
    console.log('Avaliações recuperadas do storage:', assessments.length);
    return assessments;
  } catch (error) {
    console.error('Erro ao ler avaliações do storage:', error);
    return [];
  }
};

export const getAssessmentBySkill = async (skill: string): Promise<Assessment | null> => {
  const assessments = await getAssessments();
  const sorted = assessments
    .filter((a) => a.skill === skill)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return sorted[0] || null;
};

// Trail Progress
export const saveTrailProgress = async (progress: TrailProgress) => {
  const allProgress = await getAllTrailProgress();
  const index = allProgress.findIndex((p) => p.trailId === progress.trailId);
  if (index >= 0) {
    allProgress[index] = progress;
  } else {
    allProgress.push(progress);
  }
  await AsyncStorage.setItem('@skillupplus:trailProgress', JSON.stringify(allProgress));
};

export const getTrailProgress = async (trailId: string): Promise<TrailProgress | null> => {
  const allProgress = await getAllTrailProgress();
  return allProgress.find((p) => p.trailId === trailId) || null;
};

export const getAllTrailProgress = async (): Promise<TrailProgress[]> => {
  const data = await AsyncStorage.getItem('@skillupplus:trailProgress');
  return data ? JSON.parse(data) : [];
};

export const completeTrail = async (trailId: string) => {
  const progress = await getTrailProgress(trailId);
  const updated: TrailProgress = {
    trailId,
    completed: true,
    progress: 100,
    startedAt: progress?.startedAt || new Date().toISOString(),
    completedAt: new Date().toISOString(),
  };
  await saveTrailProgress(updated);
  await addPoints(50); // Pontos por completar trilha
  await checkBadges();
};

// Points & Gamification
export const addPoints = async (points: number) => {
  const current = await getPoints();
  await AsyncStorage.setItem('@skillupplus:points', (current + points).toString());
};

export const getPoints = async (): Promise<number> => {
  const data = await AsyncStorage.getItem('@skillupplus:points');
  return data ? parseInt(data, 10) : 0;
};

export const addBadge = async (badgeId: string) => {
  const badges = await getBadges();
  if (!badges.includes(badgeId)) {
    badges.push(badgeId);
    await AsyncStorage.setItem('@skillupplus:badges', JSON.stringify(badges));
    return true;
  }
  return false;
};

export const getBadges = async (): Promise<string[]> => {
  const data = await AsyncStorage.getItem('@skillupplus:badges');
  return data ? JSON.parse(data) : [];
};

export const checkBadges = async () => {
  const points = await getPoints();
  const completedTrails = (await getAllTrailProgress()).filter((p) => p.completed).length;
  const assessments = await getAssessments();

  // Badge: Primeiros Passos
  if (points >= 50 && !(await getBadges()).includes('first_steps')) {
    await addBadge('first_steps');
  }

  // Badge: Trilha Completa
  if (completedTrails >= 1 && !(await getBadges()).includes('trail_complete')) {
    await addBadge('trail_complete');
  }

  // Badge: Avaliador
  if (assessments.length >= 3 && !(await getBadges()).includes('assessor')) {
    await addBadge('assessor');
  }

  // Badge: Especialista
  if (points >= 200 && !(await getBadges()).includes('expert')) {
    await addBadge('expert');
  }
};

// User Progress Summary
export const getUserProgress = async (): Promise<UserProgress> => {
  const points = await getPoints();
  const badges = await getBadges();
  const trailProgress = await getAllTrailProgress();
  const assessments = await getAssessments();
  const completedTrails = trailProgress.filter((p) => p.completed).length;
  const skillsDeveloped = [...new Set(assessments.map((a) => a.skill))];

  return {
    totalPoints: points,
    badges,
    completedTrails,
    totalAssessments: assessments.length,
    skillsDeveloped,
  };
};

// Clear all data
export const clearAllData = async () => {
  await AsyncStorage.multiRemove([
    '@skillupplus:token',
    '@skillupplus:profile',
    '@skillupplus:assessments',
    '@skillupplus:trailProgress',
    '@skillupplus:points',
    '@skillupplus:badges',
  ]);
};

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { stylesheet, colors } from '../../../assets/stylesheet';
import { getUserProgress, getBadges } from '../../utils/storage';

const BADGE_INFO: Record<string, { name: string; emoji: string; description: string }> = {
  first_steps: {
    name: 'Primeiros Passos',
    emoji: '👣',
    description: 'Ganhou 50 pontos',
  },
  trail_complete: {
    name: 'Trilha Completa',
    emoji: '🏆',
    description: 'Completou sua primeira trilha',
  },
  assessor: {
    name: 'Avaliador',
    emoji: '⭐',
    description: 'Realizou 3 autoavaliações',
  },
  expert: {
    name: 'Especialista',
    emoji: '🎓',
    description: 'Ganhou 200 pontos',
  },
};

export default function ProgressScreen() {
  const [progress, setProgress] = useState({
    totalPoints: 0,
    badges: [] as string[],
    completedTrails: 0,
    totalAssessments: 0,
    skillsDeveloped: [] as string[],
  });
  const [badges, setBadges] = useState<string[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      loadProgress();
    }, [])
  );

  const loadProgress = async () => {
    const userProgress = await getUserProgress();
    const userBadges = await getBadges();
    setProgress(userProgress);
    setBadges(userBadges);
  };

  return (
    <ScrollView contentContainerStyle={stylesheet.scrollContainer}>
      <Text style={stylesheet.titleLarge}>Meu Progresso</Text>

      {/* Pontos */}
      <View style={[stylesheet.card, { backgroundColor: '#E3F2FD' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text style={[stylesheet.text, { fontSize: 14 }]}>Total de Pontos</Text>
            <Text style={[stylesheet.title, { color: colors.primary, marginTop: 4 }]}>
              {progress.totalPoints} pts
            </Text>
          </View>
          <Text style={{ fontSize: 48 }}>⭐</Text>
        </View>
      </View>

      {/* Estatísticas */}
      <View style={stylesheet.card}>
        <Text style={[stylesheet.text, { fontWeight: '600', marginBottom: 12 }]}>Estatísticas</Text>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={stylesheet.text}>Trilhas Concluídas</Text>
          <Text style={[stylesheet.text, { fontWeight: '700', color: colors.success }]}>
            {progress.completedTrails}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={stylesheet.text}>Autoavaliações Realizadas</Text>
          <Text style={[stylesheet.text, { fontWeight: '700', color: colors.primary }]}>
            {progress.totalAssessments}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={stylesheet.text}>Competências Desenvolvidas</Text>
          <Text style={[stylesheet.text, { fontWeight: '700', color: colors.secondary }]}>
            {progress.skillsDeveloped.length}
          </Text>
        </View>
      </View>

      {/* Badges */}
      <View style={stylesheet.card}>
        <Text style={[stylesheet.text, { fontWeight: '600', marginBottom: 12 }]}>Conquistas</Text>
        
        {badges.length === 0 ? (
          <Text style={stylesheet.metaText}>
            Complete trilhas e faça avaliações para ganhar conquistas!
          </Text>
        ) : (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {badges.map((badgeId) => {
              const badge = BADGE_INFO[badgeId];
              if (!badge) return null;
              return (
                <View
                  key={badgeId}
                  style={{
                    backgroundColor: '#FFF9C4',
                    padding: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                    minWidth: 100,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ fontSize: 32, marginBottom: 4 }}>{badge.emoji}</Text>
                  <Text style={[stylesheet.text, { fontSize: 12, fontWeight: '600', textAlign: 'center' }]}>
                    {badge.name}
                  </Text>
                  <Text style={[stylesheet.metaText, { fontSize: 10, textAlign: 'center' }]}>
                    {badge.description}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </View>

      {/* Competências */}
      {progress.skillsDeveloped.length > 0 && (
        <View style={stylesheet.card}>
          <Text style={[stylesheet.text, { fontWeight: '600', marginBottom: 12 }]}>
            Competências em Desenvolvimento
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {progress.skillsDeveloped.map((skill) => (
              <View
                key={skill}
                style={{
                  backgroundColor: colors.surface,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text style={stylesheet.text}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}


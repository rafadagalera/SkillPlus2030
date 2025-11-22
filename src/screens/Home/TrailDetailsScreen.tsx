import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabsParams } from '../../navigation/types';
import { getTrailById } from '../../utils/recommendations';
import { getTrailProgress, saveTrailProgress, completeTrail } from '../../utils/storage';
import { stylesheet, colors, spacing, radius, fonts, shadows } from '../../../assets/stylesheet';

type Props = NativeStackScreenProps<TabsParams, 'TrailDetails'>;

export default function TrailDetailsScreen({ route, navigation }: Props) {
  const { trailId } = route.params;
  const [trail, setTrail] = useState(getTrailById(trailId));
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    loadProgress();
  }, [trailId]);

  const loadProgress = async () => {
    if (!trail) return;
    const trailProgress = await getTrailProgress(trailId);
    if (trailProgress) {
      setProgress(trailProgress.progress);
      setCompleted(trailProgress.completed);
    }
  };

  const startTrail = async () => {
    if (!trail) return;
    await saveTrailProgress({
      trailId,
      completed: false,
      progress: 0,
      startedAt: new Date().toISOString(),
    });
    setProgress(0);
    Alert.alert('Trilha Iniciada!', 'Boa sorte na sua jornada de aprendizado!');
  };

  const completeLesson = async (lessonId: string) => {
    if (!trail) return;
    const lessonIndex = trail.lessons.findIndex((l) => l.id === lessonId);
    if (lessonIndex === -1) return;

    const newProgress = Math.min(100, ((lessonIndex + 1) / trail.lessons.length) * 100);
    await saveTrailProgress({
      trailId,
      completed: newProgress === 100,
      progress: newProgress,
      startedAt: (await getTrailProgress(trailId))?.startedAt || new Date().toISOString(),
    });

    setProgress(newProgress);

    if (newProgress === 100) {
      await completeTrail(trailId);
      setCompleted(true);
      Alert.alert(
        'Parabéns! 🎉',
        'Você completou esta trilha!\n+50 pontos ganhos!'
      );
    }
  };

  if (!trail) {
    return (
      <View style={stylesheet.centeredContainer}>
        <Text style={stylesheet.text}>Trilha não encontrada</Text>
      </View>
    );
  }

  const completedLessons = trail.lessons.filter((l) => l.completed).length;

  return (
    <ScrollView contentContainerStyle={stylesheet.scrollContainer}>
      <Text style={stylesheet.titleLarge}>{trail.title}</Text>

      <View style={stylesheet.card}>
        <Text style={stylesheet.text}>{trail.description}</Text>
        <View style={stylesheet.trailMetaRow}>
          <Text style={[stylesheet.metaText, stylesheet.trailMetaItem]}>
            ⏱ {trail.duration}
          </Text>
          <Text style={[stylesheet.metaText, stylesheet.trailMetaItem]}>
            📊 {trail.level}
          </Text>
          <Text style={stylesheet.metaText}>
            📁 {trail.category}
          </Text>
        </View>
      </View>

      {progress > 0 && (
        <View style={stylesheet.card}>
          <View style={stylesheet.progressRow}>
            <Text style={stylesheet.textBold}>Progresso</Text>
            <Text style={[stylesheet.textBold, { color: colors.primary }]}>{Math.round(progress)}%</Text>
          </View>
          <View style={stylesheet.progressBar}>
            <View
              style={[
                stylesheet.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>
          <Text style={[stylesheet.metaText, { marginTop: spacing.sm }]}>
            {completedLessons} de {trail.lessons.length} lições concluídas
          </Text>
        </View>
      )}

      <Text style={[stylesheet.title, { marginTop: 8 }]}>Lições</Text>

      {trail.lessons.map((lesson, index) => {
        const isCompleted = lesson.completed || (progress > 0 && index < completedLessons);
        const isLocked = progress === 0 && index > 0;

        return (
          <TouchableOpacity
            key={lesson.id}
            style={[
              stylesheet.card,
              isCompleted && stylesheet.lessonCompleted,
              isLocked && stylesheet.lessonLocked,
            ]}
            onPress={() => {
              if (isLocked) {
                Alert.alert('Lição Bloqueada', 'Complete as lições anteriores primeiro.');
                return;
              }
              if (isCompleted) {
                Alert.alert('Lição Concluída', 'Você já completou esta lição!');
                return;
              }
              Alert.alert(
                'Lição',
                `Você completou: ${lesson.title}\n\nTipo: ${lesson.type === 'video' ? 'Vídeo' : lesson.type === 'text' ? 'Texto' : 'Quiz'}\nDuração: ${lesson.duration}`,
                [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Marcar como Concluída',
                    onPress: () => completeLesson(lesson.id),
                  },
                ]
              );
            }}
            disabled={isLocked}
            activeOpacity={0.7}
          >
            <View style={stylesheet.lessonRow}>
              <View style={[
                stylesheet.lessonIconContainer,
                isCompleted && stylesheet.lessonIconCompleted,
                isLocked && stylesheet.lessonIconLocked,
                !isCompleted && !isLocked && stylesheet.lessonIconDefault,
              ]}>
                <Text style={stylesheet.lessonEmoji}>
                  {isCompleted ? '✅' : isLocked ? '🔒' : '📚'}
                </Text>
              </View>
              <View style={stylesheet.lessonContent}>
                <Text style={[stylesheet.textBold, isCompleted && { color: colors.success }]}>
                  {lesson.title}
                </Text>
                <Text style={[stylesheet.metaText, { marginTop: spacing.xs }]}>
                  {lesson.type === 'video' ? '🎥 Vídeo' : lesson.type === 'text' ? '📄 Texto' : '❓ Quiz'} • {lesson.duration}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}

      {progress === 0 && (
        <TouchableOpacity
          style={[stylesheet.button, { marginTop: spacing.lg }]}
          onPress={startTrail}
          activeOpacity={0.8}
        >
          <Text style={stylesheet.buttonText}>Iniciar Trilha</Text>
        </TouchableOpacity>
      )}

      {completed && (
        <View style={[stylesheet.card, stylesheet.completionCard]}>
          <Text style={[stylesheet.textBold, stylesheet.completionText]}>
            🎉 Parabéns! Você completou esta trilha!
          </Text>
        </View>
      )}
    </ScrollView>
  );
}


import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  Profile,
  Assessment,
  getProfile,
  saveProfile,
  clearProfile,
  clearToken,
  getAssessments,
} from '../utils/storage';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { AppDrawerParams } from '../navigation/types';
import { stylesheet, colors } from '../../assets/stylesheet';

type Props = DrawerScreenProps<AppDrawerParams, 'Profile'>;

const SKILL_LABELS: Record<string, string> = {
  communication: 'Comunicação',
  critical: 'Pensamento Crítico',
  ai: 'IA Básica',
  sustain: 'Sustentabilidade',
  teamwork: 'Trabalho em Equipe',
  'time-management': 'Gestão do Tempo',
};

export default function ProfileScreen({ navigation }: Props) {
  const [profile, setProfile] = useState<Profile>({ name: '', email: '' });
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      loadProfile();
      loadAssessments();
    }, [])
  );

  const loadProfile = async () => {
    const p = await getProfile();
    if (p) setProfile(p);
  };

  const loadAssessments = async () => {
    const allAssessments = await getAssessments();
    // Pegar apenas a última avaliação de cada competência
    const latestBySkill = new Map<string, Assessment>();
    allAssessments.forEach((assessment) => {
      const existing = latestBySkill.get(assessment.skill);
      if (!existing || new Date(assessment.date) > new Date(existing.date)) {
        latestBySkill.set(assessment.skill, assessment);
      }
    });
    setAssessments(Array.from(latestBySkill.values()));
  };

  const handleSave = async () => {
    await saveProfile(profile);
    Alert.alert('Salvo', 'Perfil atualizado!');
  };

  const handleLogout = async () => {
    await clearProfile();
    await clearToken();
    // Navigate to Auth stack after logout
    navigation.getParent()?.getParent()?.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return colors.success;
    if (rating >= 6) return '#FFA726';
    return colors.danger;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <ScrollView contentContainerStyle={stylesheet.scrollContainer}>
      <Text style={stylesheet.titleLarge}>Meu Perfil</Text>

      {/* Informações do Perfil */}
      <View style={stylesheet.card}>
        <Text style={[stylesheet.text, { fontWeight: '600', marginBottom: 12 }]}>
          Informações Pessoais
        </Text>

        <TextInput
          style={stylesheet.input}
          placeholder="Nome"
          value={profile.name}
          onChangeText={(t) => setProfile((p) => ({ ...p, name: t }))}
        />

        <TextInput
          style={stylesheet.input}
          placeholder="Email"
          value={profile.email}
          onChangeText={(t) => setProfile((p) => ({ ...p, email: t }))}
        />

        <Button title="Salvar" onPress={handleSave} />
      </View>

      {/* Autoavaliações */}
      <View style={stylesheet.card}>
        <Text style={[stylesheet.text, { fontWeight: '600', marginBottom: 12 }]}>
          Minhas Autoavaliações
        </Text>

        {assessments.length === 0 ? (
          <Text style={stylesheet.metaText}>
            Você ainda não realizou nenhuma autoavaliação.{'\n'}
            Vá para a aba "Autoavaliação" para começar!
          </Text>
        ) : (
          assessments
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((assessment) => {
              const skillLabel = SKILL_LABELS[assessment.skill] || assessment.skillLabel || assessment.skill;
              const ratingColor = getRatingColor(assessment.rating);

              return (
                <View
                  key={assessment.id}
                  style={{
                    padding: 12,
                    marginBottom: 8,
                    backgroundColor: colors.surface,
                    borderRadius: 8,
                    borderLeftWidth: 4,
                    borderLeftColor: ratingColor,
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={[stylesheet.text, { fontWeight: '600' }]}>
                        {skillLabel}
                      </Text>
                      <Text style={[stylesheet.metaText, { fontSize: 12, marginTop: 2 }]}>
                        {formatDate(assessment.date)}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: ratingColor,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                        minWidth: 60,
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 18,
                          fontWeight: '700',
                        }}
                      >
                        {assessment.rating}/10
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
        )}
      </View>

      {/* Resumo */}
      {assessments.length > 0 && (
        <View style={stylesheet.card}>
          <Text style={[stylesheet.text, { fontWeight: '600', marginBottom: 12 }]}>
            Resumo
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={stylesheet.text}>Total de Avaliações:</Text>
            <Text style={[stylesheet.text, { fontWeight: '700', color: colors.primary }]}>
              {assessments.length}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={stylesheet.text}>Média Geral:</Text>
            <Text style={[stylesheet.text, { fontWeight: '700', color: colors.primary }]}>
              {(assessments.reduce((sum, a) => sum + a.rating, 0) / assessments.length).toFixed(1)}/10
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={stylesheet.text}>Competências Avaliadas:</Text>
            <Text style={[stylesheet.text, { fontWeight: '700', color: colors.primary }]}>
              {new Set(assessments.map((a) => a.skill)).size}
            </Text>
          </View>
        </View>
      )}

      {/* Botão Sair */}
      <View style={{ marginTop: 16 }}>
        <Button title="Sair" color={colors.danger} onPress={handleLogout} />
      </View>
    </ScrollView>
  );
}

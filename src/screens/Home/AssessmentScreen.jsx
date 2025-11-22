import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { stylesheet } from '../../../assets/stylesheet';
import { saveAssessment, getAssessmentBySkill, addPoints, checkBadges } from '../../utils/storage';

type SkillOption = {
  label: string;
  value: string;
};

const SKILLS: SkillOption[] = [
  { label: 'Comunicação', value: 'communication' },
  { label: 'Pensamento Crítico', value: 'critical' },
  { label: 'IA Básica', value: 'ai' },
  { label: 'Sustentabilidade', value: 'sustain' },
  { label: 'Trabalho em Equipe', value: 'teamwork' },
  { label: 'Gestão do Tempo', value: 'time-management' },
];

export default function AssessmentScreen() {
  const [skill, setSkill] = useState<string>('communication');
  const [rating, setRating] = useState<string>('');
  const [lastRating, setLastRating] = useState<number | null>(null);

  useEffect(() => {
    loadLastAssessment();
  }, [skill]);

  const loadLastAssessment = async () => {
    const last = await getAssessmentBySkill(skill);
    if (last) {
      setLastRating(last.rating);
    } else {
      setLastRating(null);
    }
  };

  const submitAssessment = async () => {
    if (!rating || isNaN(Number(rating))) {
      Alert.alert('Erro', 'Digite uma nota de 0 a 10.');
      return;
    }

    const score = Number(rating);
    if (score < 0 || score > 10) {
      Alert.alert('Erro', 'A nota deve estar entre 0 e 10.');
      return;
    }

    const skillLabel = SKILLS.find((s) => s.value === skill)?.label || skill;
    
    try {
      await saveAssessment({
        skill,
        skillLabel,
        rating: score,
      });

      // Adicionar pontos por avaliação
      await addPoints(10);
      await checkBadges();

      Alert.alert(
        'Autoavaliação Enviada!',
        `Competência: ${skillLabel}\nNota: ${rating}\n\n+10 pontos ganhos!\n\nRecomendações geradas com sucesso!`
      );

      setRating('');
      loadLastAssessment();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a avaliação.');
    }
  };

  return (
    <ScrollView contentContainerStyle={stylesheet.scrollContainer}>
      <Text style={stylesheet.title}>Autoavaliação de Competências</Text>

      {lastRating !== null && (
        <View style={[stylesheet.card, { backgroundColor: '#E3F2FD', marginBottom: 16 }]}>
          <Text style={[stylesheet.text, { fontWeight: '600' }]}>
            Última avaliação desta competência: {lastRating}/10
          </Text>
        </View>
      )}

      <Text style={stylesheet.label}>Selecione a Competência</Text>

      <View style={stylesheet.pickerWrapper}>
        <Picker selectedValue={skill} onValueChange={(value) => setSkill(value)}>
          {SKILLS.map((s) => (
            <Picker.Item key={s.value} label={s.label} value={s.value} />
          ))}
        </Picker>
      </View>

      <Text style={stylesheet.label}>Sua Nota (0-10)</Text>

      <TextInput
        style={stylesheet.input}
        keyboardType="numeric"
        placeholder="Ex: 7"
        value={rating}
        onChangeText={setRating}
      />

      <Button title="Enviar Avaliação" onPress={submitAssessment} />
    </ScrollView>
  );
}

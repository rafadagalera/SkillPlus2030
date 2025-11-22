import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TrailCard from '../../components/TrailCard';
import { stylesheet } from '../../../assets/stylesheet';
import { getRecommendedTrails, getAllTrails, Trail } from '../../utils/recommendations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabsParams } from '../../navigation/types';

type Props = NativeStackScreenProps<TabsParams, 'Trails'>;

export default function TrailsScreen({ navigation }: Props) {
  const [recommendedTrails, setRecommendedTrails] = useState<Trail[]>([]);
  const [allTrails, setAllTrails] = useState<Trail[]>([]);
  const [showAll, setShowAll] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadTrails();
    }, [])
  );

  const loadTrails = async () => {
    const recommended = await getRecommendedTrails();
    const all = getAllTrails();
    setRecommendedTrails(recommended);
    setAllTrails(all);
  };

  const trailsToShow = showAll ? allTrails : recommendedTrails;

  return (
    <ScrollView contentContainerStyle={stylesheet.scrollContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={stylesheet.title}>
          {showAll ? 'Todas as Trilhas' : 'Trilhas Recomendadas'}
        </Text>
        <TouchableOpacity
          onPress={() => setShowAll(!showAll)}
          style={{ padding: 8 }}
        >
          <Text style={stylesheet.linkText}>
            {showAll ? 'Ver Recomendadas' : 'Ver Todas'}
          </Text>
        </TouchableOpacity>
      </View>

      {!showAll && recommendedTrails.length > 0 && (
        <View style={[stylesheet.card, { backgroundColor: '#E8F5E9', marginBottom: 16 }]}>
          <Text style={[stylesheet.text, { fontWeight: '600' }]}>
            💡 Baseado nas suas autoavaliações, recomendamos estas trilhas para você!
          </Text>
        </View>
      )}

      {trailsToShow.length === 0 ? (
        <View style={stylesheet.card}>
          <Text style={stylesheet.text}>Nenhuma trilha disponível no momento.</Text>
        </View>
      ) : (
        trailsToShow.map((trail) => (
          <TrailCard
            key={trail.id}
            trail={trail}
            onPress={() => navigation.navigate('TrailDetails', { trailId: trail.id })}
          />
        ))
      )}
    </ScrollView>
  );
}

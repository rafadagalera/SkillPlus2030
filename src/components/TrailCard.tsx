import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { stylesheet } from '../../assets/stylesheet';
import { Trail } from '../utils/recommendations';

interface Props {
  trail: Trail;
  onPress?: () => void;
}

export default function TrailCard({ trail, onPress }: Props) {
  return (
    <TouchableOpacity
      style={stylesheet.trailCard}
      onPress={onPress}
    >
      {trail.image && (
        <Image
          source={trail.image}
          style={stylesheet.trailCardImage}
        />
      )}
      <View style={stylesheet.trailCardContent}>
        <Text style={stylesheet.text}>{trail.title}</Text>
        <Text style={stylesheet.metaText}>{trail.level} • {trail.duration} • {trail.category}</Text>
        {trail.description && (
          <Text style={[stylesheet.metaText, { marginTop: 4 }]} numberOfLines={2}>
            {trail.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

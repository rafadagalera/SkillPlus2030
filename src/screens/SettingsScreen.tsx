import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { AppDrawerParams } from '../navigation/types';
import { stylesheet, colors, spacing, radius, fonts } from '../../assets/stylesheet';

type Props = DrawerScreenProps<AppDrawerParams, 'Settings'>;

export default function SettingsScreen({}: Props) {
  return (
    <ScrollView contentContainerStyle={stylesheet.scrollContainer}>
      <Text style={stylesheet.titleLarge}>Configurações</Text>
      
      <View style={stylesheet.card}>
        <View style={[stylesheet.settingsItem, { marginBottom: spacing.sm }]}>
          <View style={[stylesheet.iconContainer, stylesheet.iconContainerInfo]}>
            <Text style={stylesheet.iconEmoji}>🔔</Text>
          </View>
          <View style={stylesheet.settingsItemContent}>
            <Text style={stylesheet.textBold}>Notificações</Text>
            <Text style={stylesheet.metaText}>Gerencie suas notificações</Text>
          </View>
          <Text style={stylesheet.settingsChevron}>›</Text>
        </View>
      </View>

      <View style={stylesheet.card}>
        <View style={[stylesheet.settingsItem, { marginBottom: spacing.sm }]}>
          <View style={[stylesheet.iconContainer, stylesheet.iconContainerWarning]}>
            <Text style={stylesheet.iconEmoji}>🔒</Text>
          </View>
          <View style={stylesheet.settingsItemContent}>
            <Text style={stylesheet.textBold}>Privacidade</Text>
            <Text style={stylesheet.metaText}>Configurações de privacidade</Text>
          </View>
          <Text style={stylesheet.settingsChevron}>›</Text>
        </View>
      </View>

      <View style={stylesheet.card}>
        <View style={stylesheet.settingsItem}>
          <View style={[stylesheet.iconContainer, stylesheet.iconContainerSuccess]}>
            <Text style={stylesheet.iconEmoji}>ℹ️</Text>
          </View>
          <View style={stylesheet.settingsItemContent}>
            <Text style={stylesheet.textBold}>Sobre</Text>
            <Text style={stylesheet.metaText}>Versão 0.0.1</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}


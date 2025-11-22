import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParams } from '../../navigation/types';
import { saveToken, saveProfile } from '../../utils/storage';
import { stylesheet } from '../../../assets/stylesheet';

type Props = NativeStackScreenProps<AuthStackParams, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Informe email e senha');
      return;
    }

    const token = 'token_' + Date.now();
    await saveToken(token);
    await saveProfile({ name: 'Usuário', email });

    // Navigate to App drawer after successful login
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: 'App' }],
    });
  };

  return (
    <View style={stylesheet.container}>
      <Text style={stylesheet.titleLarge}>SkillUpPlus 2030+</Text>

      <TextInput 
        style={stylesheet.input} 
        placeholder="Email" 
        autoCapitalize="none" 
        value={email} 
        onChangeText={setEmail} 
      />
      <TextInput 
        style={stylesheet.input} 
        placeholder="Senha" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />

      <Button title="Entrar" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={stylesheet.link}>
        <Text style={stylesheet.linkText}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

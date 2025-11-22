import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParams } from '../../navigation/types';
import { saveToken, saveProfile } from '../../utils/storage';
import { stylesheet } from '../../../assets/stylesheet';

type Props = NativeStackScreenProps<AuthStackParams, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const token = 'token_' + Date.now();
    await saveToken(token);
    await saveProfile({ name, email });

    // Navigate to App drawer after successful registration
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: 'App' }],
    });
  };

  return (
    <View style={stylesheet.container}>
      <Text style={stylesheet.titleLarge}>Criar conta</Text>

      <TextInput 
        style={stylesheet.input} 
        placeholder="Nome" 
        value={name} 
        onChangeText={setName} 
      />
      <TextInput 
        style={stylesheet.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none" 
      />
      <TextInput 
        style={stylesheet.input} 
        placeholder="Senha" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />

      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
}

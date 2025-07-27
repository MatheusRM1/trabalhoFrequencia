import { Link } from 'expo-router';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function Home() {
  const [matricula, setMatricula] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('matricula').then((savedMatricula) => {
      if (savedMatricula) setMatricula(savedMatricula);
    });
  }, []);

  const handleSaveMatricula = () => {
    AsyncStorage.setItem('matricula', matricula);
    alert('Matrícula salva com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Frequência</Text>

      <TextInput
        placeholder="Digite sua matrícula"
        value={matricula}
        onChangeText={setMatricula}
        style={styles.input}
      />

      <Button title="Salvar Matrícula" onPress={handleSaveMatricula} />

      <View style={styles.menu}>
        <Link href="/scanner" asChild>
          <Button title="Registrar Presença (QR Code)" />
        </Link>

        <Link href="/faltas" asChild>
          <Button title="Consultar Minhas Faltas" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
  menu: { gap: 10, marginTop: 20 },
});
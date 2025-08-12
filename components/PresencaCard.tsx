import { AlunoPresente } from '@/types/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface PresencaCardProps {
  item: AlunoPresente;
}

export default function PresencaCard({ item }: PresencaCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.matricula}>Matrícula: {item.matricula}</Text>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.disciplina}>Disciplina: {item.disciplina}</Text>
      <Text style={styles.horario}>Registrado às: {item.horario}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    padding: 15, 
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  matricula: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 4,
  },
  nome: {
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  disciplina: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  horario: {
    fontSize: 14,
    color: '#666',
  },
});

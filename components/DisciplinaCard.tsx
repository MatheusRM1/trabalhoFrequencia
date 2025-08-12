import { Disciplina } from '@/types/types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DisciplinaCardProps {
  disciplina: Disciplina;
  onPress: (disciplina: Disciplina) => void;
}

export default function DisciplinaCard({ disciplina, onPress }: DisciplinaCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: disciplina.cor }]}
      onPress={() => onPress(disciplina)}
      activeOpacity={0.7}
    >
      <View style={[styles.icon, { backgroundColor: disciplina.cor }]}>
        <Text style={styles.iconText}>
          {disciplina.nome.charAt(0).toUpperCase()}
        </Text>
      </View>
      <Text style={styles.nome}>{disciplina.nome}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: 5,
    alignItems: 'center',
    borderWidth: 2,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 120,
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  nome: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: 18,
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface FaltaItem {
  disciplina: string;
  faltas: number;
  presencas: number;
  totalAulas: number;
}

interface FaltaCardProps {
  item: FaltaItem;
}

export default function FaltaCard({ item }: FaltaCardProps) {
  const calcularPercentualPresenca = (presencas: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((presencas / total) * 100);
  };

  const getStatusColor = (percentual: number) => {
    if (percentual >= 75) return '#4CAF50'; // Verde - OK
    if (percentual >= 50) return '#FF9800'; // Laranja - Atenção
    return '#F44336'; // Vermelho - Crítico
  };

  const percentual = calcularPercentualPresenca(item.presencas, item.totalAulas);
  const statusColor = getStatusColor(percentual);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.disciplina}>{item.disciplina}</Text>
        <View style={[styles.percentualBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.percentualText}>{percentual}%</Text>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{item.presencas}</Text>
          <Text style={styles.statLabel}>Presenças</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#F44336' }]}>{item.faltas}</Text>
          <Text style={styles.statLabel}>Faltas</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{item.totalAulas}</Text>
          <Text style={styles.statLabel}>Total Aulas</Text>
        </View>
      </View>
      
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { 
              width: `${percentual}%`, 
              backgroundColor: statusColor 
            }
          ]} 
        />
      </View>
      
      {percentual < 75 && (
        <Text style={styles.warningText}>
          ⚠️ Atenção: Frequência abaixo do mínimo (75%)
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    padding: 15, 
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  disciplina: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  percentualBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  percentualText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  warningText: {
    fontSize: 12,
    color: '#F44336',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

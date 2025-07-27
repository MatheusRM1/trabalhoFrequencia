import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function fetchFaltas(matricula: string) {
  const response = await fetch(`https://sua-api.com/faltas/${matricula}`);
  return await response.json();
}

export default function Faltas() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['faltas'],
    queryFn: async () => {
      const matricula = await AsyncStorage.getItem('matricula');
      return fetchFaltas(matricula || '');
    },
  });

  if (isLoading) return <Text>Carregando...</Text>;
  if (error) return <Text>Erro ao carregar faltas</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Faltas</Text>
      <FlatList
        data={data?.faltas || []}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.disciplina}: {item.quantidade} faltas</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
});
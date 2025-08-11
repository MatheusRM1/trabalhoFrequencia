import { useAlunosPresentes } from "@/hooks/useAlunosPresentes";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

export default function AlunosPresentes() {
  const { alunosPresentes, loading, error, refetch } = useAlunosPresentes();

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Carregando alunos presentes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Erro: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alunos Presentes Hoje</Text>
      <Text style={styles.subtitle}>
        {alunosPresentes.length} aluno(s) registraram presença
      </Text>
      
      <FlatList
        data={alunosPresentes}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.matricula}>Matrícula: {item.matricula}</Text>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.horario}>Registrado às: {item.horario}</Text>
          </View>
        )}
        keyExtractor={(item) => item.matricula}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 8,
    textAlign: 'center',
    color: '#333'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666'
  },
  item: { 
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
  horario: {
    fontSize: 14,
    color: '#666',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
  },
});

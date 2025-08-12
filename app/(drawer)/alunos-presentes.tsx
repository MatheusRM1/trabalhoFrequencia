import EmptyState from "@/components/EmptyState";
import Loading from "@/components/Loading";
import PresencaCard from "@/components/PresencaCard";
import { useAlunosPresentes } from "@/hooks/useAlunosPresentes";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

export default function AlunosPresentes() {
  const { alunosPresentes, loading, error, refetch } = useAlunosPresentes();

  if (loading) {
    return <Loading message="Carregando presenças..." />;
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
      <Text style={styles.title}>Presenças Registradas Hoje</Text>
      <Text style={styles.subtitle}>
        {alunosPresentes.length} presença(s) registrada(s)
      </Text>
      
      {alunosPresentes.length === 0 ? (
        <EmptyState
          icon="✅"
          title="Nenhuma presença registrada ainda hoje"
          subtitle="Use o scanner de QR Code para registrar presenças"
        />
      ) : (
        <FlatList
          data={alunosPresentes}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
          renderItem={({ item }) => <PresencaCard item={item} />}
          keyExtractor={(item, index) => `${item.matricula}-${item.disciplina}-${index}`}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
  },
});

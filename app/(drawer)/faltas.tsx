import EmptyState from "@/components/EmptyState";
import FaltaCard from "@/components/FaltaCard";
import Loading from "@/components/Loading";
import { useFaltas } from "@/hooks/useFaltas";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

export default function Faltas() {
  const { faltasPorDisciplina, loading, recalcularFaltas } = useFaltas();

  useFocusEffect(
    useCallback(() => {
      recalcularFaltas();
    }, [recalcularFaltas])
  );

  if (loading) {
    return <Loading message="Calculando faltas..." />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Faltas</Text>
      <Text style={styles.subtitle}>
        Resumo da sua frequência por disciplina
      </Text>
      
      {faltasPorDisciplina.length === 0 ? (
        <EmptyState
          icon="📊"
          title="Nenhum dado de frequência encontrado"
          subtitle="Comece a registrar presenças para ver suas estatísticas"
        />
      ) : (
        <FlatList
          data={faltasPorDisciplina}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={recalcularFaltas} />
          }
          renderItem={({ item }) => <FaltaCard item={item} />}
          keyExtractor={(item) => item.disciplina}
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
});

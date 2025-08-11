import { useAlunoData } from "@/hooks/useAlunoData";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Faltas() {
  const { alunoData } = useAlunoData();

  const faltas = alunoData?.faltas || [];

  return (
    <FlatList
      data={faltas}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.disciplina}</Text>
          <Text>Faltas: {item.quantidade}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: "#ccc" },
});

import { useAlunoData } from "@/hooks/useAlunoData";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Home() {
  const [matricula, setMatricula] = useState("");
  const { alunoData, salvarMatricula } = useAlunoData();

  const handleSalvarMatricula = async () => {
    if (!matricula.trim()) {
      Alert.alert("Erro", "Digite uma matrícula válida");
      return;
    }

    try {
      await salvarMatricula(matricula);
      Alert.alert("Sucesso", "Matrícula salva com sucesso!");
    } catch {
      Alert.alert("Erro", "Falha ao salvar matrícula");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Frequência</Text>

      <TextInput
        placeholder={alunoData?.matricula || "Digite sua matrícula"}
        value={matricula}
        onChangeText={setMatricula}
        style={styles.input}
      />
      <Button title="Salvar Matrícula" onPress={handleSalvarMatricula} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
  menu: { gap: 10, marginTop: 20 },
});

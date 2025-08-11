import { useAlunoData } from "@/hooks/useAlunoData";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

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
      <TextInput
        placeholder={alunoData?.matricula || "Digite sua matrícula"}
        value={matricula}
        onChangeText={setMatricula}
        style={styles.input}
      />
      <Button title="Salvar" onPress={handleSalvarMatricula} />

      <Link href="/scanner" asChild>
        <Button title="Registrar Presença" />
      </Link>

      <Link href="/faltas" asChild>
        <Button title="Ver Minhas Faltas" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", gap: 10 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
  menu: { marginTop: 20 },
});

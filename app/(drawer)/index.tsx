import { useAlunoData } from "@/hooks/useAlunoData";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Home() {
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const { alunoData, salvarMatricula } = useAlunoData();

  const handleSalvarMatricula = async () => {
    if (!matricula.trim()) {
      Alert.alert("Erro", "Digite uma matrícula válida");
      return;
    }

    if (!nome.trim()) {
      Alert.alert("Erro", "Digite seu nome");
      return;
    }

    try {
      await salvarMatricula(matricula, nome);
      Alert.alert("Sucesso", "Dados salvos com sucesso!");
      setMatricula("");
      setNome("");
    } catch {
      Alert.alert("Erro", "Falha ao salvar dados");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Frequência</Text>
      
      {alunoData && (
        <View style={styles.dadosAtuais}>
          <Text style={styles.labelDados}>Dados Cadastrados:</Text>
          <Text style={styles.textoDados}>Matrícula: {alunoData.matricula}</Text>
          <Text style={styles.textoDados}>Nome: {alunoData.nome}</Text>
        </View>
      )}

      <Text style={styles.label}>Matrícula:</Text>
      <TextInput
        placeholder="Digite sua matrícula"
        value={matricula}
        onChangeText={setMatricula}
        style={styles.input}
      />
      
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        placeholder="Digite seu nome completo"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      
      <Button title="Salvar Dados" onPress={handleSalvarMatricula} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  dadosAtuais: {
    backgroundColor: '#e8f5e8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  labelDados: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5a2d',
    marginBottom: 5,
  },
  textoDados: {
    fontSize: 14,
    color: '#2d5a2d',
    marginBottom: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: { 
    borderWidth: 1, 
    padding: 12, 
    marginBottom: 15, 
    borderRadius: 5,
    borderColor: '#ddd',
    fontSize: 16,
  },
});

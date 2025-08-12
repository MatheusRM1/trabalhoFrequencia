import DisciplinaCard from "@/components/DisciplinaCard";
import ErrorMessage from "@/components/ErrorMessage";
import PageHeader from "@/components/PageHeader";
import QRScannerView from "@/components/QRScannerView";
import { useAlunoData } from "@/hooks/useAlunoData";
import { useDisciplinas } from "@/hooks/useDisciplinas";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Scanner() {
  const { alunoData } = useAlunoData();
  const { disciplinasDisponiveis, disciplinaSelecionada, selecionarDisciplina, limparSelecao } = useDisciplinas();

  if (!alunoData) {
    return (
      <ErrorMessage 
        title="⚠️ Dados Necessários"
        message="Você precisa cadastrar sua matrícula e nome na tela inicial antes de registrar presenças."
      />
    );
  }

  if (disciplinaSelecionada) {
    return (
      <QRScannerView 
        disciplinaSelecionada={disciplinaSelecionada}
        onVoltarSelecao={limparSelecao}
      />
    );
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Registrar Presença"
        subtitle={`Olá, ${alunoData.nome}! Selecione a disciplina para registrar sua presença:`}
      />

      <FlatList
        data={disciplinasDisponiveis}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.disciplinasList}
        renderItem={({ item }) => (
          <DisciplinaCard 
            disciplina={item}
            onPress={selecionarDisciplina}
          />
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 Após selecionar a disciplina, aponte a câmera para o QR Code da aula
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  disciplinasList: {
    padding: 20,
    gap: 15,
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

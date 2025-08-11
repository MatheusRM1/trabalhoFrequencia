import { useAlunoData } from "@/hooks/useAlunoData";
import { usePresenca } from "@/hooks/usePresenca";
import { useQRScanner } from "@/hooks/useQRScanner";
import { CameraView } from "expo-camera";
import { Alert, StyleSheet } from "react-native";

export default function Scanner() {
  const { alunoData, atualizarDados } = useAlunoData();
  const { registrarPresenca } = usePresenca();
  const { scanned, handleScanComplete } = useQRScanner();

  const handleBarCodeScanned = async ({ data: token }: { data: string }) => {
    if (!alunoData) {
      Alert.alert("Erro", "Matrícula não cadastrada");
      return;
    }

    const sucesso = await registrarPresenca(token, alunoData, atualizarDados);

    if (sucesso) {
      handleScanComplete();
    }
  };

  return (
    <CameraView
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      style={StyleSheet.absoluteFill}
    />
  );
}

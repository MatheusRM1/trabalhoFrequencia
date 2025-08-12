import { useQRScanner } from "@/hooks/useQRScanner";
import { Disciplina } from "@/types/types";
import { CameraView } from "expo-camera";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface QRScannerProps {
  disciplinaSelecionada: Disciplina;
  onVoltarSelecao: () => void;
}

export default function QRScannerView({ disciplinaSelecionada, onVoltarSelecao }: QRScannerProps) {
  const { hasPermission, scanned, handleBarCodeScanned } = useQRScanner(disciplinaSelecionada.nome);

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Solicitando permissão da câmera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Acesso à câmera negado. Permita o acesso nas configurações do app.
        </Text>
        <TouchableOpacity style={styles.backButton} onPress={onVoltarSelecao}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Header com disciplina selecionada */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onVoltarSelecao}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <View style={[styles.disciplinaBadge, { backgroundColor: disciplinaSelecionada.cor }]}>
          <Text style={styles.disciplinaText}>{disciplinaSelecionada.nome}</Text>
        </View>
      </View>

      {/* Área de scan */}
      <View style={styles.overlay}>
        <View style={styles.scanArea}>
          <Text style={styles.scanText}>
            {scanned ? "QR Code processado!" : "Aponte para o QR Code"}
          </Text>
          <Text style={styles.scanSubtext}>
            Registrando presença em: {disciplinaSelecionada.nome}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disciplinaBadge: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 3,
  },
  disciplinaText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 280,
    height: 280,
    borderWidth: 3,
    borderColor: '#00ff00',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  scanText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  scanSubtext: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
    margin: 20,
  },
});

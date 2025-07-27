import { useState } from 'react';
import { View, StyleSheet, Alert, Text, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Scanner() {
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text>Permissão de câmera necessária</Text>
        <Button onPress={requestPermission} title="Permitir acesso" />
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data: token }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    const matricula = await AsyncStorage.getItem('matricula');
    if (!matricula) {
      Alert.alert('Erro', 'Matrícula não cadastrada! Volte ao menu e salve sua matrícula.');
      setScanned(false);
      return;
    }

    try {
      const response = await fetch('https://sua-api.com/registrar-presenca', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, matricula }),
      });

      const result = await response.json();
      Alert.alert(result.success ? '✅ Sucesso!' : '❌ Erro', result.message);
      if (result.success) router.back(); // Volta ao menu após sucesso
    } catch (error) {
      Alert.alert('Erro', 'Falha na conexão com o servidor');
    } finally {
      setTimeout(() => setScanned(false), 3000);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
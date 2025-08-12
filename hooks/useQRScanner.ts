import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAlunosPresentes } from './useAlunosPresentes';

export function useQRScanner(disciplinaSelecionada?: string) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const { registrarPresenca } = useAlunosPresentes();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    
    try {
      const alunoData = await AsyncStorage.getItem('alunoData');
      
      if (!alunoData) {
        Alert.alert(
          'Erro', 
          'Cadastre sua matrícula e nome primeiro na tela inicial!',
          [{ text: 'OK', onPress: () => setScanned(false) }]
        );
        return;
      }
      
      const { matricula, nome } = JSON.parse(alunoData);
      
      if (!disciplinaSelecionada) {
        Alert.alert(
          'Erro',
          'Selecione uma disciplina primeiro!',
          [{ text: 'OK', onPress: () => setScanned(false) }]
        );
        return;
      }
      
      const resultado = await registrarPresenca(matricula, nome, disciplinaSelecionada);
      
      Alert.alert(
        resultado.sucesso ? 'Sucesso' : 'Atenção',
        resultado.mensagem,
        [{ text: 'OK', onPress: () => setScanned(false) }]
      );
      
    } catch (error) {
      console.error('Erro ao processar QR Code:', error);
      Alert.alert(
        'Erro',
        'Erro ao registrar presença. Tente novamente.',
        [{ text: 'OK', onPress: () => setScanned(false) }]
      );
    }
  };

  return {
    hasPermission,
    scanned,
    handleBarCodeScanned
  };
}

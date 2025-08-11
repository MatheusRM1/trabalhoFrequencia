<<<<<<< HEAD:app/(tabs)/scanner.tsx
import { useAlunoData } from "@/hooks/useAlunoData";
import { usePresenca } from "@/hooks/usePresenca";
import { useQRScanner } from "@/hooks/useQRScanner";
import { CameraView } from "expo-camera";
import { Alert, StyleSheet } from "react-native";
=======
import { useState } from 'react';
import { View, StyleSheet, Alert, Text, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
>>>>>>> 21bb7b112466ad28ed3de1df8b6afa63ba180c58:app/(drawer)/scanner.tsx

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

import { AlunoLocalData } from '@/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function useAlunoData() {
  const [alunoData, setAlunoData] = useState<AlunoLocalData | null>(null);
  const [loading, setLoading] = useState(true);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const data = await AsyncStorage.getItem('alunoData');
      if (data) {
        setAlunoData(JSON.parse(data));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do aluno:', error);
    } finally {
      setLoading(false);
    }
  };

  const salvarMatricula = async (matricula: string) => {
    try {
      const novoAlunoData: AlunoLocalData = {
        matricula,
        presencas: [],
        faltas: [
          { disciplina: "Matemática", quantidade: 1 },
          { disciplina: "Programação", quantidade: 0 }
        ]
      };
      
      await AsyncStorage.setItem('alunoData', JSON.stringify(novoAlunoData));
      setAlunoData(novoAlunoData);
    } catch (error) {
      console.error('Erro ao salvar matrícula:', error);
      throw error;
    }
  };

  const atualizarDados = async (novosDados: AlunoLocalData) => {
    try {
      await AsyncStorage.setItem('alunoData', JSON.stringify(novosDados));
      setAlunoData(novosDados);
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      throw error;
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return {
    alunoData,
    loading,
    salvarMatricula,
    atualizarDados,
    recarregarDados: carregarDados
  };
}

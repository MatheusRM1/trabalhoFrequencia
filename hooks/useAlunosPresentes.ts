import { AlunoPresente, RegistroPresenca } from '@/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

export function useAlunosPresentes() {
  const [alunosPresentes, setAlunosPresentes] = useState<AlunoPresente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlunosPresentes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const hoje = new Date().toISOString().split('T')[0];
      const dadosSalvos = await AsyncStorage.getItem(`presencas_${hoje}`);
      
      if (dadosSalvos) {
        const presencas = JSON.parse(dadosSalvos);
        setAlunosPresentes(presencas);
      } else {
        setAlunosPresentes([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      console.error('Erro ao buscar alunos presentes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const registrarPresenca = async (matricula: string, nome: string, disciplina: string): Promise<RegistroPresenca> => {
    try {
      const hoje = new Date().toISOString().split('T')[0];
      const agora = new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      const dadosExistentes = await AsyncStorage.getItem(`presencas_${hoje}`);
      let presencas: AlunoPresente[] = dadosExistentes ? JSON.parse(dadosExistentes) : [];
      
      const jaRegistrado = presencas.find(p => 
        p.matricula === matricula && p.disciplina === disciplina
      );
      
      if (jaRegistrado) {
        return { sucesso: false, mensagem: 'Presença já registrada para esta disciplina hoje!' };
      }
      
      const novaPresenca: AlunoPresente = {
        matricula,
        nome,
        disciplina,
        horario: agora,
        data: hoje
      };
      
      presencas.push(novaPresenca);
      
      await AsyncStorage.setItem(`presencas_${hoje}`, JSON.stringify(presencas));
      
      setAlunosPresentes(presencas);
      
      return { sucesso: true, mensagem: 'Presença registrada com sucesso!' };
    } catch (err) {
      console.error('Erro ao registrar presença:', err);
      return { sucesso: false, mensagem: 'Erro ao registrar presença' };
    }
  };

  useEffect(() => {
    fetchAlunosPresentes();
  }, [fetchAlunosPresentes]);

  return {
    alunosPresentes,
    loading,
    error,
    refetch: fetchAlunosPresentes,
    registrarPresenca
  };
}

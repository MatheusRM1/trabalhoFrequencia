import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

export function useFaltas() {
  const [faltasPorDisciplina, setFaltasPorDisciplina] = useState<{disciplina: string, faltas: number, presencas: number, totalAulas: number}[]>([]);
  const [loading, setLoading] = useState(false);

  const calcularFaltas = useCallback(async () => {
    try {
      setLoading(true);
      
      const alunoData = await AsyncStorage.getItem('alunoData');
      if (!alunoData) {
        setFaltasPorDisciplina([]);
        return;
      }

      const { matricula } = JSON.parse(alunoData);

      const disciplinasConfig = [
        { disciplina: 'Matemática', aulasSemanais: 4, semanas: 8 },
        { disciplina: 'Português', aulasSemanais: 3, semanas: 8 },
        { disciplina: 'História', aulasSemanais: 2, semanas: 8 },
        { disciplina: 'Desenvolvimento Mobile', aulasSemanais: 3, semanas: 8 },
        { disciplina: 'Física', aulasSemanais: 3, semanas: 8 },
        { disciplina: 'Química', aulasSemanais: 2, semanas: 8 }
      ];

      const resultados = [];

      for (const config of disciplinasConfig) {
        const totalAulasEsperadas = config.aulasSemanais * config.semanas;
        let presencasRegistradas = 0;

        const hoje = new Date();
        for (let i = 0; i < 60; i++) {
          const data = new Date(hoje);
          data.setDate(data.getDate() - i);
          const dataStr = data.toISOString().split('T')[0];
          
          const presencasData = await AsyncStorage.getItem(`presencas_${dataStr}`);
          if (presencasData) {
            const presencas = JSON.parse(presencasData);
            const presencasAluno = presencas.filter((p: any) => 
              p.matricula === matricula && p.disciplina === config.disciplina
            );
            presencasRegistradas += presencasAluno.length;
          }
        }

        const faltas = Math.max(0, totalAulasEsperadas - presencasRegistradas);
        
        resultados.push({
          disciplina: config.disciplina,
          faltas,
          presencas: presencasRegistradas,
          totalAulas: totalAulasEsperadas
        });
      }

      setFaltasPorDisciplina(resultados);

    } catch (error) {
      console.error('Erro ao calcular faltas:', error);
      setFaltasPorDisciplina([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    calcularFaltas();
  }, [calcularFaltas]);

  return {
    faltasPorDisciplina,
    loading,
    recalcularFaltas: calcularFaltas
  };
}

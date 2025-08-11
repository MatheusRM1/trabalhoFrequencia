import { AlunoPresente } from '@/types/types';
import { useEffect, useState } from 'react';

export function useAlunosPresentes() {
  const [alunosPresentes, setAlunosPresentes] = useState<AlunoPresente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlunosPresentes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const hoje = new Date().toISOString().split('T')[0];
      const response = await fetch(`https://sua-api.com/alunos-presentes/${hoje}`);
      
      if (!response.ok) {
        throw new Error('Falha ao buscar alunos presentes');
      }
      
      const data = await response.json();
      setAlunosPresentes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao buscar alunos presentes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunosPresentes();
  }, []);

  return {
    alunosPresentes,
    loading,
    error,
    refetch: fetchAlunosPresentes
  };
}

import { AlunoLocalData } from '@/types/types';
import { useEffect, useState } from 'react';

export function useFaltas(matricula?: string) {
  const [faltasAPI, setFaltasAPI] = useState<AlunoLocalData['faltas']>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFaltas = async (matriculaParam: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://sua-api.com/faltas/${matriculaParam}`);
      
      if (!response.ok) {
        throw new Error('Falha ao buscar faltas');
      }
      
      const data = await response.json();
      setFaltasAPI(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao buscar faltas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (matricula) {
      fetchFaltas(matricula);
    }
  }, [matricula]);

  return {
    faltasAPI,
    loading,
    error,
    refetch: () => matricula && fetchFaltas(matricula)
  };
}

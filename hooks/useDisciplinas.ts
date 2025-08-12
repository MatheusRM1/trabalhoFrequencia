import { Disciplina } from '@/types/types';
import { useState } from 'react';

export function useDisciplinas() {
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<Disciplina | null>(null);

  const disciplinasDisponiveis: Disciplina[] = [
    {
      id: 'matematica',
      nome: 'Matemática',
      cor: '#2196F3'
    },
    {
      id: 'portugues',
      nome: 'Português',
      cor: '#4CAF50'
    },
    {
      id: 'historia',
      nome: 'História',
      cor: '#FF9800'
    },
    {
      id: 'mobile',
      nome: 'Desenvolvimento Mobile',
      cor: '#9C27B0'
    },
    {
      id: 'fisica',
      nome: 'Física',
      cor: '#F44336'
    },
    {
      id: 'quimica',
      nome: 'Química',
      cor: '#00BCD4'
    }
  ];

  const selecionarDisciplina = (disciplina: Disciplina) => {
    setDisciplinaSelecionada(disciplina);
  };

  const limparSelecao = () => {
    setDisciplinaSelecionada(null);
  };

  return {
    disciplinasDisponiveis,
    disciplinaSelecionada,
    selecionarDisciplina,
    limparSelecao
  };
}

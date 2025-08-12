export type AlunoLocalData = {
  matricula: string;
  nome: string;
  faltas: {
    disciplina: string;
    quantidade: number;
  }[];
};

export type AlunoPresente = {
  matricula: string;
  nome: string;
  disciplina: string;
  horario: string;
  data: string;
};

export interface RegistroPresenca {
  sucesso: boolean;
  mensagem: string;
}

export type Disciplina = {
  id: string;
  nome: string;
  cor: string;
};
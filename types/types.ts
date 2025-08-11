export type Presenca = {
  token: string;
  data: string;
};

export type AlunoLocalData = {
  matricula: string;
  presencas: Presenca[];
  faltas: {
    disciplina: string;
    quantidade: number;
  }[];
};

export type AlunoPresente = {
  matricula: string;
  nome: string;
  horario: string;
};
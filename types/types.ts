export type Presenca = {
  token: string;
  data: string;
};

export type AlunoLocalData = {
  matricula: string;
  presencas: Presenca[];
  faltas: [{
    disciplina: string;
    quantidade: number;
  }];
};
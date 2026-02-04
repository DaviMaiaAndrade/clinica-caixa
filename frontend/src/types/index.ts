export interface Especialidade {
  id: string;
  nome: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Medico {
  id: string;
  nome: string;
  especialidadeId: string;
  percentual: number;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  especialidade?: Especialidade;
}

export interface Consulta {
  id: string;
  data: string;
  quantidade: number;
  especialidadeId: string;
  medicoId: string;
  valorDinheiro: number;
  valorCartao: number;
  valorPix: number;
  valorTotal: number;
  valorMedico: number;
  valorClinica: number;
  observacao?: string;
  createdAt: string;
  updatedAt: string;
  especialidade?: Especialidade;
  medico?: Medico;
}

export interface TotaisPeriodo {
  valorTotal: number;
  valorDinheiro: number;
  valorCartao: number;
  valorPix: number;
  valorMedico: number;
  valorClinica: number;
  quantidade: number;
}
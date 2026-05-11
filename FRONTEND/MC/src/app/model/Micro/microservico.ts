export interface RequisicaoDTO {
  metodo: string;
  endpoint: string;
  descricao: string;
}

export interface Microservico {
  id: string;
  nome: string;
  url: string;
  requisicoes: RequisicaoDTO[];
  descricao: string;

  status: string;
  healthEndpoint: string;
  responseTime: number;

  createdAt: Date;
  updatedAt: Date;
}
export interface RequisicaoDTO {
  endpoints: string;
  metodo: 'GET' | 'POST' | 'PUT' | 'DELETE';

  headers: Record<string, string>;

  queryParams: Record<string, string | number | boolean>;

  body: any;
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

  createdAt?: Date;
  updatedAt?: Date;
}
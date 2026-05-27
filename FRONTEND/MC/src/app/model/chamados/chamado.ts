export interface Chamado {
  id: string;
  titulo: string;
  descricao: string;
  prioridade: string;
  status: string;

  usuarioId: string;
  responsavelId: string;
  categoria: string;

  prazo: Date;
  atrasado: boolean;

  comentarios: string[];

  createdAt: Date;
  updatedAt: Date;
}
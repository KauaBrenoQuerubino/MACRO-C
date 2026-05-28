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

  comentarios: ComentarioDTO[];

  createdAt: Date;
  updatedAt: Date;
}


export interface ComentarioDTO {
    comentario: string;
    id_usuario: string;
}
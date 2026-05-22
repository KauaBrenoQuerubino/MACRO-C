export interface Conversa {
    id: string,
    participantesId: string[],
    dataCriacao: string
}

export interface Mensagem {
    id: string,
    idRemetente: string,
    idDestinatario: string,
    conteudo: string,
    dataEnvio: string,
    lida: boolean
}

export interface ConversaDTO {
    id: string,
    nome: string,
    participantesId: string[],
    mensagem: Mensagem[]

}
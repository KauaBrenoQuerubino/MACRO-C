export interface Conversa {
    id: string,
    participantesId: string[],
    dataCriacao: string
}

export interface Mensagem {
    id?: string,
    idRemetente: string,
    idDestinatario: string,
    conteudo: string,
    dataEnvio?: string,
    lido?: boolean
}

export interface ConversaDTO {
    participantesIDs: string[]
}

export interface ConversaResponse {
    id: string,
    FotoPerfil: string,
    nome: string,
    participantesId: string[],
    mensagem: Mensagem[] | undefined

}
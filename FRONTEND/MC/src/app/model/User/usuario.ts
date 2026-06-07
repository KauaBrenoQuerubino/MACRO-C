export interface Usuario {
  id: string;
  FotoPerfil: string;
  nome: string;
  email: string;
  senhaHash: string;
  perfil: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsuarioDTO {
    
  FotoPerfil: string;
  nome: string;
  email: string;
  senha: string;
  perfil: string;
  status: string;


}

export interface UpdateUsuarioDTO {
  fotoPerfil: string;
  nome: string;
  email: string;
  perfil: string;
  status: string;
  
}

export interface UpdateSenhaDTO {
  senhaAtual: string;
  novaSenha: string;

}

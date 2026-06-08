export interface PasswordResetTokenDTO {
    token: string;
    email: string;
}

export interface ResetSenhaDTO {
    email: string;
    novaSenha: string;
    token: string;
}

export interface EmailDTO {
    email: string;
}
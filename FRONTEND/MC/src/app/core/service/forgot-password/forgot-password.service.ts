import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { EmailDTO, PasswordResetTokenDTO, ResetSenhaDTO } from '../../../model/forgot-senha/forgot-senha';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  private url = signal(`${environment.url}/email`)

 public verificarEmail(email: EmailDTO): Observable<any> {
  return this.http.post(`${this.url()}/forgotPassword`, email)
 }  
 public validarCodigo(validarCodigo: PasswordResetTokenDTO): Observable<any> {
  return this.http.post(`${this.url()}/validarCodigo`, validarCodigo)
 }  
 public resetarSenha(novaSenha: ResetSenhaDTO): Observable<any> {
  return this.http.post(`${this.url()}/novaSenha`, novaSenha)
 }  

}

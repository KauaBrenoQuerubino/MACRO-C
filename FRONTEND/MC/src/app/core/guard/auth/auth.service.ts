import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment';
import { LoginDTO } from '../../../model/login/login-dto';
import { UpdateSenhaDTO } from '../../../model/User/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  private url = signal(`${environment.url}/auth`)
  private tokenKey = 'auth_token';
  private idKey = 'auth_id';
  private userData: any = null;
  private usuario = signal<any | null>(null);



  isLoggedIn = signal<boolean>(this.hasToken());

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get id(): string | null {
    return localStorage.getItem(this.idKey);
  }


  public login(loginDTO: LoginDTO): Observable<any> {
  
    return this.http.post(`${this.url()}/login`, loginDTO).pipe(
      tap((response: any) => {
        

        if(response?.token) {
          localStorage.setItem(this.idKey, response.id)
          localStorage.setItem(this.tokenKey, response.token)
        }
      })
    )

  }

  sessao(token: string | null): Observable<any> {
    if (!token) throw new Error('Token inexistente');
    return this.http.post(`${this.url()}/sessao`, { token });
  }



  logout(): void {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.clear();
    this.userData = null;
    this.isLoggedIn.set(false);

    // Navega para login e limpa histórico
    document.body.classList.remove('dark-theme');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  hasToken(): boolean {
    return !!this.token;
  }


  isAuthenticated(): Observable<any> {
    const currentToken = this.token;
    if (!currentToken) {
      this.router.navigate(['/login'], { replaceUrl: true });
      throw new Error('Token inexistente');
    }

    return this.sessao(currentToken).pipe(
      tap((response) => {
        this.userData = response;
      })
    );
  }

  getUserRule(): string | null {
    return this.userData?.perfil || null;
  }

  public alterarSenha(usuarioId: string, updateSenhaDTO: UpdateSenhaDTO): Observable<any> {
    return this.http.put(`${this.url()}/${usuarioId}/senha`, updateSenhaDTO)
  }

  

}

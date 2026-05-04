import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environment/environment';
import { LoginDTO } from '../../model/login/login-dto';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  private url = signal(`${environment.url}/auth`)
  private tokenKey = 'auth_token';
  private userData: any = null;

  isLoggedIn = signal<boolean>(this.hasToken());

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }





  public login(LoginDTO: LoginDTO): Observable<any> {
  
    return this.http.post(`${this.url()}/login`, LoginDTO).pipe(
      tap((response: any) => {
        if(response?.token) {
          localStorage.setItem('token', response.token)

        }
      })
    )

  }

  sessao(token: string): Observable<any> {
    if (!token) throw new Error('Token inexistente');
    return this.http.post(`${this.url}/sessao`, { token });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.clear();
    this.userData = null;
    this.isLoggedIn.set(false);

    // Navega para login e limpa histórico
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
    return this.userData?.rule || null;
  }

}

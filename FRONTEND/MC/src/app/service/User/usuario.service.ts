import { Injectable, signal } from '@angular/core';
import { Usuario } from '../../model/User/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  private url = signal(`${environment.url}/usuario`)

  public pegarTodosUsuarios(limit: number): Observable<Usuario[]> {
    const token = localStorage.getItem('auth_token');
    return this.http.get<Usuario[]>(`${this.url()}/all/${limit}`, {
            headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}) 
          }
        });
  }
}

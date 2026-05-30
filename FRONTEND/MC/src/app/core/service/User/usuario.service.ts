import { Injectable, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { Usuario, UsuarioDTO } from '../../../model/User/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  private url = signal(`${environment.url}/usuario`)

  public criarUsuario(usuario: UsuarioDTO): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url()}`, usuario);
  }

  public editarUsuario(id: string, usuario: UsuarioDTO): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url()}/${id}`, usuario);
  }

  public pegarUsuarioPorId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url()}/${id}`);
  }

  public pegarTodosUsuarios(limit: number): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(`${this.url()}/all/${limit}`, {});
  }

  public deletarUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url()}/${id}`);
  }


}

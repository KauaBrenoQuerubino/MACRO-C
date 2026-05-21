import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { Microservico } from '../../../model/Micro/microservico';



@Injectable({
  providedIn: 'root'
})
export class MicrosService {

  constructor(private http: HttpClient) { }

  private url = signal(`${environment.url}/micros`)


  public salvar(microservico: Microservico): Observable<any> {
    return this.http.post(`${this.url()}`, microservico)
  }

  public atualizar(microservico: Microservico): Observable<any> {
    return this.http.put(`${this.url()}`, microservico)
  }

  public deletar(id: string): Observable<any> {
    return this.http.delete(`${this.url()}/${id}`)
  }

  public executarAcao(acao: string, id: string): Observable<any> {  
    return this.http.post(`${this.url()}/${acao}/${id}`, {})
  }

  public pegarTodosMicros(limit: number): Observable<Microservico[]> {
    return this.http.get<Microservico[]>(`${this.url()}/all/${limit}`, {});
  }

  public pegarPorId(id: string): Observable<Microservico> {
    return this.http.get<Microservico>(`${this.url()}/${id}`, {});
  }
}

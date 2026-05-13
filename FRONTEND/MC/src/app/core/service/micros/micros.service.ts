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

  public executarAcao(acao: string, id: string): Observable<any> {  
    return this.http.post(`${this.url()}/${acao}/${id}`, {})
  }

  public pegarTodosMicros(limit: number): Observable<Microservico[]> {
    return this.http.get<Microservico[]>(`${this.url()}/all/${limit}`, {});
  }
}

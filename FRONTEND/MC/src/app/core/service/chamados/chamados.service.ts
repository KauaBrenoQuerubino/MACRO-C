import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { Chamado, ComentarioDTO } from '../../../model/chamados/chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {

  constructor(private http: HttpClient) { }

  private url = signal(`${environment.url}/chamados`)

  public save(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(this.url(), chamado, {});
  }

  public update(chamado: Chamado): Observable<Chamado> {
    return this.http.put<Chamado>(this.url(), chamado, {});
  }

  public adicionarComentario(id: string, comentario: ComentarioDTO): Observable<Chamado> {
    return this.http.post<Chamado>(`${this.url()}/${id}/comentario`, comentario, {});
  }
  
  public findById(id: string): Observable<Chamado> {
    return this.http.get<Chamado>(`${this.url()}/${id}`, {});
  }

  public findAll(limit: number): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${this.url()}/all/${limit}`, {});
  }

  public findByStatus(status: String): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${this.url()}/status/${status}`, {});
  }




}
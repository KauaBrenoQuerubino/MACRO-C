import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { Chamado } from '../../../model/chamados/chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {

  constructor(private http: HttpClient) { }

  private url = signal(`${environment.url}/chamados`)
  
  public findByStatus(status: String): Observable<Chamado[]> {
    
    return this.http.get<Chamado[]>(`${this.url()}/status/${status}`, {});

  }


}
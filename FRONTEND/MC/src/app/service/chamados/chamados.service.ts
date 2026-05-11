import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Chamado } from '../../model/chamados/chamado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {

  constructor(private http: HttpClient) { }

  private url = signal(`${environment.url}/chamados`)
  
  public findByStatus(status: String): Observable<Chamado[]> {
    
    const token = localStorage.getItem('auth_token');
    return this.http.get<Chamado[]>(`${this.url()}/status/${status}`, {
        headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}) 
      }
    });

  }


}
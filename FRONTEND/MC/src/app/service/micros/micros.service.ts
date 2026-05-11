import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Microservico } from '../../model/Micro/microservico';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MicrosService {

  constructor(private http: HttpClient) { }

  private url = signal(`${environment.url}/micros`)

  public pegarTodosMicros(limit: number): Observable<Microservico[]> {
    const token = localStorage.getItem('auth_token');
    return this.http.get<Microservico[]>(`${this.url()}/all/${limit}`, {
            headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}) 
          }
        });
  }
}

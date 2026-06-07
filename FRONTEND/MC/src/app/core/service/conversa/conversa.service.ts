import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Conversa, ConversaDTO, ConversaResponse, Mensagem } from '../../../model/conversa/conversa';

@Injectable({
  providedIn: 'root'
})
export class ConversaService {

  constructor(private http: HttpClient) { }

  
  private url = signal(`${environment.url}/conversa`)

  salvar(conversa: ConversaDTO): Observable<any> {
    return this.http.post(`${this.url()}`, conversa)
  }

  pegarPorId(id: string): Observable<any> {
    return this.http.get(`${this.url()}/${id}`, {})
  }

  pegarTodas(limit: number): Observable<any> {
    return this.http.get(`${this.url()}/all/${limit}`, {})
  }

  pegarPorUserID(id: string): Observable<any> {
    return this.http.get(`${this.url()}/user/${id}`, {})
  }
  
  enviarMensagem(idConversa: string, mensagem: Mensagem): Observable<any> {
    return this.http.post(`${this.url()}/${idConversa}/sendMensagem`, mensagem)
  }

  listarMensagens(idConversa: string): Observable<any> {
    return this.http.get(`${this.url()}/${idConversa}/readMensagem`, {})
  }

  listarMensagensNaoLidas(idRemetente: string): Observable<any> {
    return this.http.get(`${this.url()}/${idRemetente}/notReadMensagens`, {})
  }

  lerMensagem(idConversa: string, idMensagem: string): Observable<any> {
    return this.http.post(`${this.url()}/${idConversa}/markAsRead/${idMensagem}`, {})
  }

}

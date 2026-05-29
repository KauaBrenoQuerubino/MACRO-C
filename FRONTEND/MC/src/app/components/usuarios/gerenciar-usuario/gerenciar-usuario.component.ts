import { Component, Input } from '@angular/core';
import { Usuario } from '../../../model/User/usuario';

@Component({
  selector: 'app-gerenciar-usuario',
  imports: [],
  templateUrl: './gerenciar-usuario.component.html',
  styleUrl: './gerenciar-usuario.component.scss'
})
export class GerenciarUsuarioComponent {

  constructor() { }


  @Input() usuario: Usuario = {
    id: '',
    FotoPerfil: '',
    nome: '',
    email: '',
    senhaHash: '',
    perfil: '',
    status: '',
    createdAt: '',
    updatedAt: ''
  };



  async onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const base64: string = await this.converterParaBase64(file);
      this.usuario.FotoPerfil = base64.split(',')[1];
    }
  }

  converterParaBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      

      reader.onload = () => {
        resolve(reader.result as string); 
      };
      reader.onerror = error => reject(error);
    });
  }

}

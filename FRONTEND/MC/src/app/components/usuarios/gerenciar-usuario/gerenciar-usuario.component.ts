import { Component, Input } from '@angular/core';
import { Usuario, UsuarioDTO } from '../../../model/User/usuario';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../core/service/User/usuario.service';

@Component({
  selector: 'app-gerenciar-usuario',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './gerenciar-usuario.component.html',
  styleUrl: './gerenciar-usuario.component.scss'
})
export class GerenciarUsuarioComponent {

  constructor(private usuarioService: UsuarioService) { }


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

  editMode = false;

  modoDeEnvio = 'Criar'

  ngOnInit() {

    if(this.usuario == null || this.usuario.createdAt == '') {
      this.modoDeEnvio = 'Criar'
      this.editMode = true;
    }
    else {
      this.modoDeEnvio = 'Editar'
    }


  }

  criarUsuario() {

    const userDTO: UsuarioDTO = {
      FotoPerfil: this.usuario.FotoPerfil,
      nome: this.usuario.nome,
      email: this.usuario.email,
      senha: this.usuario.senhaHash,
      perfil: this.usuario.perfil

    } 


    

    this.usuarioService.criarUsuario(userDTO).subscribe({
      next: res => {
        console.log(res)
      }
    })
  }



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

import { Component, EventEmitter, Output } from '@angular/core';
import { UsuarioService } from '../../../core/service/User/usuario.service';
import { UpdateUsuarioDTO, Usuario, UsuarioDTO } from '../../../model/User/usuario';
import { MatMenuModule } from '@angular/material/menu';
import { A11yModule } from "@angular/cdk/a11y";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../modal-dialog/confirm-dialog/confirm-dialog.component';
import { NotificationService } from '../../../until/notification.service';
import { LodingComponent } from "../../../until/loding/loding.component";
import { finalize } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  imports: [MatMenuModule, A11yModule, LodingComponent],
  standalone: true,
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent {

  constructor(
    private usuarioService: UsuarioService, 
    private dialog: MatDialog,
    private notify: NotificationService) {}

  usuarios: Usuario[] = [];

  isLoading = true


  ngOnInit(){
    this.carregarUsuarios()
 

  }

  carregarUsuarios() {
   this.usuarioService.pegarTodosUsuarios(100).pipe(finalize(() => {this.isLoading = false})).subscribe({
      next: res => {
        this.usuarios = res;
      }
    })
  }


  @Output() usuarioSelecionado = new EventEmitter<Usuario>();

  selecionarUsuario(usuario: Usuario) {
    this.usuarioSelecionado.emit(usuario);
  }

  deletarUsuario( id: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
         data: {
           titulo: 'Confirmação',
           mensagem: 'Deseja realmente excluir?'
         }
         }
       );
       
       dialogRef.afterClosed().subscribe(result => {
         if (result) {
           this.usuarioService.deletarUsuario(id).subscribe({
             next: res => {
              this.notify.success("Usuario deletado");
              this.carregarUsuarios()
             }, error: err => {
            this.notify.error(err.error.message)
            this.carregarUsuarios()
            
          }
           })
         } 
       });
    
    
  }

  arquivarUsuario(usuario: Usuario) {

    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       data: {
         titulo: 'Confirmação',
         mensagem: 'Deseja realmente Arquivar o usuario?'
       }
       }
     );
     
     dialogRef.afterClosed().subscribe(result => {
       if (result) {

        usuario.status = "DESATIVADO"

        const userDTO: UpdateUsuarioDTO = {
          
          fotoPerfil: usuario.FotoPerfil,
          nome: usuario.nome,
          email: usuario.email,
          perfil: usuario.perfil,
          status: usuario.status
    
        } 


         this.usuarioService.editarUsuario(usuario.id, userDTO).subscribe({
          next: res => {
            this.notify.success("Usuario Arquivado");
          }, error: err => {
            this.notify.error(err.error.message)
            
          }
         })
       } 
     });

    
  }


}

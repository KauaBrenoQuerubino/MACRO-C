import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MicrosComponent } from './components/micros/micros.component';
import { IndexComponent } from './components/index/index.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChamadosComponent } from './components/chamados/chamados.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AuthGuard } from './core/guard/auth/protect/auth-guard.guard';
import { AdminGuard } from './core/guard/auth/protect/admin-guard.guard';
import { GerenciarUsuarioComponent } from './components/usuarios/gerenciar-usuario/gerenciar-usuario.component';
import { EditarUsuarioComponent } from './components/usuarios/editar-usuario/editar-usuario.component';
import { EsqueciASenhaComponent } from './components/esqueci-a-senha/esqueci-a-senha.component';

export const routes: Routes = [


    {
        path: '',
        component: IndexComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuard]

            },
            {
                path: 'sistemas',
                component: MicrosComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'chat',
                component: ChatComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'chamados',
                component: ChamadosComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'editar-usuario',
                component: EditarUsuarioComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'esqueci-a-senha',
        component: EsqueciASenhaComponent
    },
    {
        path: '**',
        redirectTo: "/dashboard"
    }
];

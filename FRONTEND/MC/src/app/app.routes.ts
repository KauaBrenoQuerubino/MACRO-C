import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MicrosComponent } from './components/micros/micros.component';
import { IndexComponent } from './components/index/index.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChamadosComponent } from './components/chamados/chamados.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

export const routes: Routes = [


    {
        path: '',
        component: IndexComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'sistemas',
                component: MicrosComponent,
            },
            {
                path: 'chat',
                component: ChatComponent
            },
            {
                path: 'chamados',
                component: ChamadosComponent
            },
            {
                path: 'usuarios',
                component: UsuariosComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

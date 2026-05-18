import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MicrosComponent } from './components/micros/micros.component';
import { IndexComponent } from './components/index/index.component';

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
                component: MicrosComponent
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

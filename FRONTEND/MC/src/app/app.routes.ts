import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MicrosComponent } from './components/micros/micros.component';

export const routes: Routes = [
    {
        path: '',
        component: MicrosComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent

    },
    {
        path: 'login',
        component: LoginComponent
    }
];

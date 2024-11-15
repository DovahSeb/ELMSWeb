import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/components/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'employees',
        loadComponent: () => import('./features/employees/components/list-employees/list-employees.component').then(c => c.ListEmployeesComponent)
    },
];

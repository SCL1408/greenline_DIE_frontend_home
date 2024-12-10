import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';


export const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent),
                title: 'GreenLine'
            }
        ]
    }
];

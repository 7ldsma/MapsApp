import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'maps',
        loadChildren: () => import('./maps/maps.module').then( m => m.MapsModule ),
    },
    {
        path: '**',
        redirectTo: 'maps',
    }

];

import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'private',
        loadChildren: () => import('./private/private.module').then(m => m.PrivateModule),
        canActivate: [authGuard]
    },
    {
        path: 'public',
        loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
    },
    {
        path: '**',
        redirectTo: 'public', 
        pathMatch: 'full'
    }
];

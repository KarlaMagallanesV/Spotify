import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { AuthPage } from './feature/auth-page/auth-page';
import { AuthCallback } from './feature/auth-page/auth-callback';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthPage
  },
  {
    path: 'auth/callback',
    component: AuthCallback
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'albums',
        loadComponent: () => import('./feature/album-page/album-page').then(c => c.AlbumPage)
      }
    ]
  }
];

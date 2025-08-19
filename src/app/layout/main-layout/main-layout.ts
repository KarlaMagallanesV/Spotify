import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SpotifyAuthApi } from '../../core/services/spotify-auth-api';
import { SpotifyUserApi } from '../../core/services/spotify-user-api';

export interface SpotifyUser {
  display_name: string;
  images?: { url: string }[];
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
})
export class MainLayout implements OnInit {
  // Inyección de servicios
  private authApi = inject(SpotifyAuthApi);
  private userApi = inject(SpotifyUserApi);

  // Usuario de Spotify, puede ser null
  user: SpotifyUser | null = null;

  ngOnInit(): void {
    // Si ya hay sesión iniciada, cargamos el usuario
    if (this.authApi.isLogging) {
      this.loadUser();
    }
  }

  // Carga de datos del usuario desde la API
  private loadUser(): void {
    this.userApi.getCurrentUser().subscribe({
      next: (data: SpotifyUser) => {
        console.log('Spotify user data:', data);
        this.user = data;
      },
      error: (err) => console.error('Error al obtener usuario', err)
    });
  }

  // Login usando el servicio de autenticación
  login(): void {
    this.authApi.login();
  }

  // Logout y limpieza de datos de usuario
  logout(): void {
    this.authApi.logout();
    this.user = null;
  }
}

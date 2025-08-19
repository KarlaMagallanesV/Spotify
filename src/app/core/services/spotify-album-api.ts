// spotify-album-api.ts - Versión actualizada usando tus interfaces
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Album, 
  AlbumDetails,
  NewReleasesResponse,
  AlbumSearchResponse,
  UserSavedAlbumsResponse,
  ArtistAlbumsResponse,
  SpotifyPage 
} from '../interfaces/spotify-response';
import { environment as env } from '../../../environments/environment';
import { SpotifyAuthApi } from './spotify-auth-api';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAlbumApi {
  #http = inject(HttpClient);
  #auth: SpotifyAuthApi = inject(SpotifyAuthApi);

  private get headers(): HttpHeaders {
    const token = this.#auth.token;
    if (!token) throw new Error('No hay token. Inicia sesión con Spotify primero.');
    
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  /**
   * 🎵 Obtener nuevos lanzamientos
   */
  getNewReleases(limit: number = 20, offset: number = 0): Observable<NewReleasesResponse> {
    return this.#http.get<NewReleasesResponse>(
      `${env.spotify.apiUrl}/v1/browse/new-releases?limit=${limit}&offset=${offset}`,
      { headers: this.headers }
    );
  }

  /**
   * 💿 Obtener detalles de un álbum específico
   */
  getAlbumById(albumId: string): Observable<AlbumDetails> {
    return this.#http.get<AlbumDetails>(
      `${env.spotify.apiUrl}/v1/albums/${albumId}`,
      { headers: this.headers }
    );
  }

  /**
   * 📀 Obtener múltiples álbumes
   */
  getAlbums(albumIds: string[]): Observable<{ albums: Album[] }> {
    const ids = albumIds.join(',');
    return this.#http.get<{ albums: Album[] }>(
      `${env.spotify.apiUrl}/v1/albums?ids=${ids}`,
      { headers: this.headers }
    );
  }

  /**
   * 🔍 Buscar álbumes
   */
  searchAlbums(
    query: string, 
    limit: number = 20, 
    offset: number = 0
  ): Observable<AlbumSearchResponse> {
    const encodedQuery = encodeURIComponent(query);
    return this.#http.get<AlbumSearchResponse>(
      `${env.spotify.apiUrl}/v1/search?q=${encodedQuery}&type=album&limit=${limit}&offset=${offset}`,
      { headers: this.headers }
    );
  }

  /**
   * 🎤 Obtener álbumes de un artista
   */
  getArtistAlbums(
    artistId: string, 
    limit: number = 20, 
    offset: number = 0,
    includeGroups: string = 'album,single,compilation'
  ): Observable<ArtistAlbumsResponse> {
    return this.#http.get<ArtistAlbumsResponse>(
      `${env.spotify.apiUrl}/v1/artists/${artistId}/albums?limit=${limit}&offset=${offset}&include_groups=${includeGroups}`,
      { headers: this.headers }
    );
  }

  /**
   * 📚 Obtener álbumes guardados del usuario
   */
  getUserSavedAlbums(
    limit: number = 20, 
    offset: number = 0
  ): Observable<UserSavedAlbumsResponse> {
    return this.#http.get<UserSavedAlbumsResponse>(
      `${env.spotify.apiUrl}/v1/me/albums?limit=${limit}&offset=${offset}`,
      { headers: this.headers }
    );
  }

  /**
   * ❤️ Guardar álbum en biblioteca
   */
  saveAlbum(albumId: string): Observable<void> {
    return this.#http.put<void>(
      `${env.spotify.apiUrl}/v1/me/albums`,
      { ids: [albumId] },
      { headers: this.headers }
    );
  }

  /**
   * 💔 Remover álbum de biblioteca
   */
  removeAlbum(albumId: string): Observable<void> {
    return this.#http.delete<void>(
      `${env.spotify.apiUrl}/v1/me/albums`,
      { 
        headers: this.headers,
        body: { ids: [albumId] }
      }
    );
  }

  /**
   * ✅ Verificar si álbumes están guardados
   */
  checkSavedAlbums(albumIds: string[]): Observable<boolean[]> {
    const ids = albumIds.join(',');
    return this.#http.get<boolean[]>(
      `${env.spotify.apiUrl}/v1/me/albums/contains?ids=${ids}`,
      { headers: this.headers }
    );
  }

  /**
   * 🌟 Obtener álbumes recomendados (featured playlists como álbumes)
   */
  getFeaturedPlaylists(limit: number = 20, offset: number = 0): Observable<any> {
    return this.#http.get(
      `${env.spotify.apiUrl}/v1/browse/featured-playlists?limit=${limit}&offset=${offset}`,
      { headers: this.headers }
    );
  }

  /**
   * 🎭 Obtener álbumes por categoría
   */
  getCategoryAlbums(categoryId: string, limit: number = 20, offset: number = 0): Observable<any> {
    return this.#http.get(
      `${env.spotify.apiUrl}/v1/browse/categories/${categoryId}/playlists?limit=${limit}&offset=${offset}`,
      { headers: this.headers }
    );
  }
}
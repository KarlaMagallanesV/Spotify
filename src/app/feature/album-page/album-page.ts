import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyAlbumApi } from '../../core/services/spotify-album-api';
import { Album, Artist } from '../../core/interfaces/spotify-response';

@Component({
  selector: 'app-album-page',
  standalone: true,
  imports: [],
  templateUrl: './album-page.html'
})
export class AlbumPage implements OnInit {
  private albumService = inject(SpotifyAlbumApi);
  private router = inject(Router);
  
  // Estados de datos
  newReleases: Album[] = [];
  savedAlbums: Album[] = [];
 
  // Estados de UI
  loading = false;
  loadingSaved = false;
  error: string | null = null;

  // Getter que combina ambas listas para el template
  get albums(): Album[] {
    return [...this.newReleases, ...this.savedAlbums];
  }

  ngOnInit(): void {
    this.loadNewReleases();
    this.loadSavedAlbums();
  }

  loadNewReleases(): void {
    this.loading = true;
    this.error = null;
   
    this.albumService.getNewReleases(20, 0).subscribe({
      next: (response) => {
        this.newReleases = response.albums.items;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar nuevos lanzamientos';
        this.loading = false;
        console.error('Error loading new releases:', error);
      }
    });
  }

  loadSavedAlbums(): void {
    this.loadingSaved = true;
   
    this.albumService.getUserSavedAlbums(20, 0).subscribe({
      next: (response) => {
        this.savedAlbums = response.items.map(item => item.album);
        this.loadingSaved = false;
      },
      error: (error) => {
        console.error('Error loading saved albums:', error);
        this.loadingSaved = false;
      }
    });
  }

  openAlbum(albumId: string): void {
    this.router.navigate(['/album', albumId]);
  }

  saveAlbum(albumId: string, event: Event): void {
    event.stopPropagation();
   
    this.albumService.saveAlbum(albumId).subscribe({
      next: () => {
        console.log('Álbum guardado exitosamente');
        this.loadSavedAlbums();
      },
      error: (error) => {
        console.error('Error al guardar álbum:', error);
      }
    });
  }

  removeAlbum(albumId: string, event: Event): void {
    event.stopPropagation();
   
    this.albumService.removeAlbum(albumId).subscribe({
      next: () => {
        console.log('Álbum removido exitosamente');
        this.loadSavedAlbums();
      },
      error: (error) => {
        console.error('Error al remover álbum:', error);
      }
    });
  }

  getArtistNames(artists: Artist[]): string {
    return artists.map(artist => artist.name).join(', ');
  }

  retry(): void {
    this.loadNewReleases();
    this.loadSavedAlbums();
  }

  getAlbumImage(album: Album): string {
    return album.images?.[0]?.url || '/assets/album-placeholder.png';
  }

  getFormattedYear(date: Date): string {
    return new Date(date).getFullYear().toString();
  }
}
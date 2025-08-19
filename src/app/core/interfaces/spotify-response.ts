export interface SpotifyTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

export interface SpotifyPage<T> {
  href: string;
  items: T[];
  limit: number;
  next: string;
  offset: number;
  previous: string | null;
  total: number;
}

export interface Album {
  album_type: AlbumTypeEnum;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
}


export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

/** 👤 Usuario de Spotify */
export interface SpotifyUser {
  display_name: string;
  external_urls: ExternalUrls;
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  type: 'user';
  uri: string;
}

// Agregar estas interfaces a tu archivo existing interfaces/spotify-response.ts

/** 🎵 Track de un álbum */
export interface Track {
  id: string;
  name: string;
  artists: Artist[];
  duration_ms: number;
  explicit: boolean;
  preview_url: string | null;
  track_number: number;
  uri: string;
  external_urls: ExternalUrls;
  disc_number: number;
  is_local: boolean;
  is_playable?: boolean;
  type: 'track';
  href: string;
}

/** 💿 Detalles completos de un álbum */
export interface AlbumDetails extends Album {
  tracks: SpotifyPage<Track>;
  genres: string[];
  label: string;
  popularity: number;
  copyrights: Array<{
    text: string;
    type: string;
  }>;
}

/** 📚 Álbum guardado en la biblioteca del usuario */
export interface SavedAlbum {
  added_at: string;
  album: Album;
}

/** 🎨 Respuesta de nuevos lanzamientos */
export interface NewReleasesResponse {
  albums: SpotifyPage<Album>;
}

/** 🔍 Respuesta de búsqueda de álbumes */
export interface AlbumSearchResponse {
  albums: SpotifyPage<Album>;
}

/** 👤 Respuesta de álbumes guardados del usuario */
export interface UserSavedAlbumsResponse extends SpotifyPage<SavedAlbum> {}

/** 🎼 Respuesta de álbumes de un artista */
export interface ArtistAlbumsResponse extends SpotifyPage<Album> {}

// También puedes extender el enum AlbumTypeEnum si necesitas más tipos
export enum AlbumTypeEnum {
  Album = "album",
  Ep = "ep",
  Single = "single",
  Compilation = "compilation",
}

// Y agregar más tipos de artista si es necesario
export enum ArtistType {
  Artist = "artist",
}
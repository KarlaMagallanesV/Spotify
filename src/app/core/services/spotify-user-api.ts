import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpotifyUserApi {
    private http = inject(HttpClient);

    getCurrentUser(): Observable<any> {
        return this.http.get('https://api.spotify.com/v1/me');
    }
}

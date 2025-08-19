import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyAuthApi } from '../../core/services/spotify-auth-api';

@Component({
    selector: 'app-auth-callback',
    template: `<p>Procesando login con Spotify...</p>`
})
export class AuthCallback implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private authApi = inject(SpotifyAuthApi);

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const code = params['code'];
            if (code) {
                this.authApi.exchangeCodeForToken(code).subscribe({
                    next: () => this.router.navigate(['/album']),
                    error: (err) => console.error('Error al intercambiar token', err)
                });
            }
        });
    }
}

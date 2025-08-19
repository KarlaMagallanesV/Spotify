export const environment = {
  production: false,
  spotify: {
    tokenUrl: 'https://accounts.spotify.com/api/token',
    authorizationUrl: 'https://accounts.spotify.com/authorize',
    apiUrl: 'https://api.spotify.com',
    clientId: '33a2784358d247839a94c281f5a29cba',
    clientSecret: '0b9b96de09be428697776ab643af0789',
    redirectUri: 'http://127.0.0.1:4200/auth',
    scope: 'user-read-email user-read-private'
  }
};

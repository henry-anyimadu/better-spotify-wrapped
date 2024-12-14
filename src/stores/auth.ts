import { defineStore } from 'pinia';

export const useSpotifyAuthStore = defineStore('spotifyAuth', {
    state: () => {
        // Load initial state from localStorage
        const accessToken = localStorage.getItem('spotify_access_token');
        const refreshToken = localStorage.getItem('spotify_refresh_token');

        console.log('Initial auth state:', { accessToken: !!accessToken, refreshToken: !!refreshToken });

        return {
            accessToken,
            refreshToken
        };
    },
    getters: {
        isAuthenticated: (state) => !!state.accessToken
    },
    actions: {
        setTokens(accessToken: string, refreshToken: string) {
            console.log('Setting tokens in store');
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;

            // Store in localStorage
            localStorage.setItem('spotify_access_token', accessToken);
            localStorage.setItem('spotify_refresh_token', refreshToken);
        },
        logout() {
            console.log('Logging out, clearing tokens');
            this.accessToken = null;
            this.refreshToken = null;
            localStorage.removeItem('spotify_access_token');
            localStorage.removeItem('spotify_refresh_token');
        }
    }
});

import { defineStore } from 'pinia';
import { SpotifyTrack, SpotifyArtist } from '../types/spotify';
import { getTopTracks, getTopArtists } from '../services/spotify';

interface UserStatsState {
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
  isLoading: boolean;
  error: string | null;
}

export const useUserStatsStore = defineStore('userStats', {
  state: (): UserStatsState => ({
    topTracks: [],
    topArtists: [],
    isLoading: false,
    error: null
  }),

  getters: {
    // Get the most popular genre across all artists
    mostPopularGenre: (state) => {
      const genres = state.topArtists.flatMap(artist => artist.genres);
      const genreCount = genres.reduce((acc, genre) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(genreCount)
        .sort(([,a], [,b]) => b - a)
        .map(([genre]) => genre)[0];
    },

    // Average popularity of top artists
    averageArtistPopularity: (state) => {
      if (state.topArtists.length === 0) return 0;
      const sum = state.topArtists.reduce((acc, artist) => acc + Number(artist.popularity), 0);
      return Math.round(sum / state.topArtists.length);
    },

    // Get artist by ID
    getArtistById: (state) => (id: string) => {
      return state.topArtists.find(artist => artist.id === id);
    },

    // Get track by ID
    getTrackById: (state) => (id: string) => {
      return state.topTracks.find(track => track.id === id);
    }
  },

  actions: {
    async fetchAllUserStats(accessToken: string) {
      this.isLoading = true;
      this.error = null;

      try {
        // Fetch both top tracks and artists in parallel
        const [tracksResponse, artistsResponse] = await Promise.all([
          getTopTracks(accessToken, 'medium_term', 50),
          getTopArtists(accessToken, 'medium_term', 50)
        ]);

        this.topTracks = tracksResponse.items;
        this.topArtists = artistsResponse.items;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    clearStats() {
      this.topTracks = [];
      this.topArtists = [];
      this.error = null;
    }
  }
});

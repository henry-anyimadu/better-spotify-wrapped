import axios from 'axios';
import { config } from '../config/environment.ts'

const api = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getTopTracks = async (accessToken: string, timeRange: string, limit: number = 50) => {
    try {
        const response = await api.get(
            `https://api.spotify.com/v1/me/top/tracks`,
            {
                params: {
                    time_range: timeRange,
                    limit: limit,
                    offset: 0,
                    market: 'from_token'
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            }
        );
        const tracks = response.data;
        console.log('Top tracks:', tracks); // Add logging


        return tracks;
    } catch (error) {
        console.error('Error fetching top tracks:', error);
        throw error;
    }
};

export const getTopArtists = async (accessToken: string, timeRange: string, limit: number = 50) => {
    try {
        const response = await api.get(
            `https://api.spotify.com/v1/me/top/artists`,
            {
                params: {
                    time_range: timeRange,
                    limit: limit,
                    offset: 0
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            }
        );
        const artists = response.data;
        console.log('Top artists:', artists); // Add logging
        return artists;
    } catch (error) {
        console.error('Error fetching top artists:', error);
        throw error;
    }
};

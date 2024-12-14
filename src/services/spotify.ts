import axios from 'axios';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getTopTracks = async (accessToken: string, timeRange: string, limit: number) => {
    try {
        const response = await api.get(
            `https://api.spotify.com/v1/me/top/tracks`,
            {
                params: {
                    time_range: timeRange,
                    limit: limit
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            }
        );
        console.log('Top tracks response:', response.data); // Add logging
        return response.data;
    } catch (error) {
        console.error('Error fetching top tracks:', error);
        throw error;
    }
};

export const getTopArtists = async (accessToken: string, timeRange: string, limit: number) => {
    try {
        const response = await api.get(
            `https://api.spotify.com/v1/me/top/artists`,
            {
                params: {
                    time_range: timeRange,
                    limit: limit
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            }
        );
        console.log('Top artists response:', response.data); // Add logging
        return response.data;
    } catch (error) {
        console.error('Error fetching top artists:', error);
        throw error;
    }
};

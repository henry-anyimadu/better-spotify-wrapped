export interface SpotifyUser {
    id: string;
    display_name: string;
    email: string;
    images: { url: string }[];
}

export interface SpotifyTrack {
    id: string;
    name: string;
    artists: { name: string }[];
    album: {
        name: string;
        images: { url: string }[];
    };
}

export interface SpotifyArtist {
    id: string;
    name: string;
    popularity: string;
    images: { url: string }[];
    genres: string[];
}

export interface SpotifyImage {
    url: string;
    height: number | null;
    width: number | null;
}

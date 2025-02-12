interface Config {
    apiUrl: string;
    redirectUri: string;
}

const configs: { [key: string]: Config } = {
    development: {
        apiUrl: 'http://localhost:3000',
        redirectUri: 'http://localhost:5173/callback'
    },
    production: {
        apiUrl: 'https://wrapify-backend.vercel.app',
        redirectUri: 'https://wrapify.henryany.com/callback'
    }
};

const environment = import.meta.env.MODE || 'development';

export const config: Config = configs[environment];

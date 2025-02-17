/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                'fancy-hover': {
                    '0%': {
                        transform: 'translateY(0)',
                        boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
                        borderWidth: '2px'
                    },
                    '100%': {
                        transform: 'translateY(-12px)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        borderWidth: '4px'
                    }
                },
                'fancy-unhover': {
                    '0%': {
                        transform: 'translateY(-12px)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        borderWidth: '4px'
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
                        borderWidth: '2px'
                    }
                }
            },
            animation: {
                'fancy-hover': 'fancy-hover 0.2s ease-in forwards',
                'fancy-unhover': 'fancy-unhover 0.3s ease-in forwards'
            },
            boxShadow: {
                'hover-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }
        },
    },
    plugins: [],
    safelist: [
        'animate-fancy-hover'
    ]
}

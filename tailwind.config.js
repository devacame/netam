module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        screens: {
            'sm': { 'max': '640px' },
            'md': { 'min': '641px', 'max': '1023px' },
            'lg': { 'min': '1024px' },
        },
        extend: {
            textColor: {
                'bluePrime': '#334257',
                'blueSub': '#476072',
                'baseColor': '#6b727b',
                'lightBlue': '#548CA8',
                'light': '#F9F9F9',
            },
            backgroundColor: {
                'active': true,
                'lightBlue': '#548CA8',
                'light': '#F9F9F9',
                'lightPoint': '#FEFBF3',
                'dark': '#1A1A1D',
                'darkBody': '#18181b',
                'darkPoint': '#323232',
            },
            fontFamily: {
                body: ['SpoqaHanSansNeo'],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}

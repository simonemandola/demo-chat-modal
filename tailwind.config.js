module.exports = {
    content: [
        // Example content paths...
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    theme: {
        container: {
            center: true,
        },
        extend: {
            width: {
                'fit': 'fit-content',
            },
            maxHeight: {
                '38rem': '38rem',
            },
            gridTemplateColumns: {
                'header': '1fr 3rem',
                'document-message': '1fr 4rem',
                'text-message': '2rem minmax(0, auto) 2rem',
                'submit': '2rem 1fr 2rem',
            },
        },
    },
    plugins: [],
}
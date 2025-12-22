/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx,md,mdx}', './components/**/*.{js,ts,jsx,tsx,md,mdx}'],
    theme: {
        screens: {
            xs: '360px',
            s: '560px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        extend: {
            keyframes: {
                unblur: {
                    from: { filter: 'blur(5px)' },
                    to: { filter: 'blur(0px)' },
                },
            },
            animation: {
                unblur: 'unblur 0.3s ease-in-out', // Change the time and easing here
            },
        },
    },
    variants: {
        extend: {
            filter: ['hover', 'focus'],
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                '@keyframes unblur': {
                    from: { filter: 'blur(5px)' },
                    to: { filter: 'blur(0px)' },
                },
            };
            addUtilities(newUtilities, ['responsive', 'hover']);
        },
        require('@tailwindcss/typography'),
    ],
    darkMode: 'class',
};

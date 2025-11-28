/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Share Tech Mono', 'monospace'],
                display: ['Cinzel', 'serif'],
                cyber: ['Orbitron', 'sans-serif'],
            },
            backgroundImage: {
                'metal-gradient': 'linear-gradient(135deg, #2c3e50 0%, #000000 100%)',
                'brushed-metal': 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px)',
            },
            boxShadow: {
                glow: '0 0 20px rgba(255, 255, 255, 0.1)',
            },
        },
    },
    plugins: [],
};

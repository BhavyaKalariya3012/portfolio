/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // F1 Racing Theme Colors
                f1: {
                    red: '#FF1801',
                    'red-dark': '#CC0000',
                    'red-glow': '#FF4444',
                },
                racing: {
                    blue: '#00D2FF',
                    'blue-dark': '#0099CC',
                    'blue-glow': '#44E4FF',
                    gold: '#FFD700',
                    silver: '#C0C0C0',
                },
                carbon: {
                    DEFAULT: '#0D0D0D',
                    50: '#1A1A1A',
                    100: '#121212',
                    200: '#0F0F0F',
                    300: '#0A0A0A',
                    400: '#050505',
                    900: '#000000',
                },
                pit: {
                    lane: '#1a1a2e',
                    wall: '#16213e',
                    light: '#0f3460',
                }
            },
            fontFamily: {
                racing: ['Orbitron', 'sans-serif'],
                display: ['Outfit', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'speed-lines': 'speedLines 0.5s linear infinite',
                'tire-spin': 'tireSpin 0.5s linear infinite',
                'engine-pulse': 'enginePulse 0.1s ease-in-out infinite',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
                'flag-wave': 'flagWave 1s ease-in-out infinite',
                'exhaust-flicker': 'exhaustFlicker 0.15s ease-in-out infinite',
                'rev-meter': 'revMeter 0.8s ease-out',
                'slide-in-left': 'slideInLeft 0.6s ease-out',
                'slide-in-right': 'slideInRight 0.6s ease-out',
                'fade-up': 'fadeUp 0.8s ease-out',
            },
            keyframes: {
                speedLines: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                tireSpin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                enginePulse: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.02)' },
                },
                glowPulse: {
                    '0%, 100%': { opacity: '0.5', boxShadow: '0 0 20px rgba(255, 24, 1, 0.3)' },
                    '50%': { opacity: '1', boxShadow: '0 0 40px rgba(255, 24, 1, 0.6)' },
                },
                flagWave: {
                    '0%, 100%': { transform: 'skewX(-2deg)' },
                    '50%': { transform: 'skewX(2deg)' },
                },
                exhaustFlicker: {
                    '0%, 100%': { opacity: '0.8' },
                    '50%': { opacity: '1' },
                },
                revMeter: {
                    '0%': { strokeDashoffset: '100%' },
                    '100%': { strokeDashoffset: '0%' },
                },
                slideInLeft: {
                    '0%': { transform: 'translateX(-100px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(100px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                fadeUp: {
                    '0%': { transform: 'translateY(40px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
            backgroundImage: {
                'carbon-fiber': `repeating-linear-gradient(
          45deg,
          #0d0d0d 0px,
          #0d0d0d 2px,
          #1a1a1a 2px,
          #1a1a1a 4px
        )`,
                'racing-stripe': 'linear-gradient(90deg, transparent 0%, #FF1801 50%, transparent 100%)',
                'track-gradient': 'linear-gradient(180deg, #0D0D0D 0%, #1a1a2e 50%, #0D0D0D 100%)',
                'kerb-red': 'repeating-linear-gradient(45deg, #FF1801 0px, #FF1801 10px, #FFFFFF 10px, #FFFFFF 20px)',
                'kerb-blue': 'repeating-linear-gradient(45deg, #00D2FF 0px, #00D2FF 10px, #FFFFFF 10px, #FFFFFF 20px)',
                'finish-line': 'repeating-linear-gradient(90deg, #000 0px, #000 20px, #fff 20px, #fff 40px)',
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            boxShadow: {
                'glow-red': '0 0 30px rgba(255, 24, 1, 0.5), 0 0 60px rgba(255, 24, 1, 0.3)',
                'glow-blue': '0 0 30px rgba(0, 210, 255, 0.5), 0 0 60px rgba(0, 210, 255, 0.3)',
                'glow-gold': '0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.3)',
                'neon-red': '0 0 5px #FF1801, 0 0 15px #FF1801, 0 0 30px #FF1801',
                'neon-blue': '0 0 5px #00D2FF, 0 0 15px #00D2FF, 0 0 30px #00D2FF',
                'carbon': '0 10px 40px rgba(0, 0, 0, 0.8)',
                'hud': 'inset 0 0 20px rgba(0, 210, 255, 0.1)',
            },
            borderRadius: {
                'hud': '2px',
            }
        },
    },
    plugins: [],
}

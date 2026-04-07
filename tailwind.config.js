module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e8c47c',
        'primary-dim': 'rgba(232,196,124,0.15)',
        bg: '#0a0a0a',
        'bg-surface': 'rgba(255,255,255,0.02)',
        'text-primary': '#f0f0f0',
        'text-secondary': 'rgba(255,255,255,0.35)',
        'text-muted': 'rgba(255,255,255,0.15)',
        rule: 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1400px',
      },
    },
  },
  plugins: [],
}

// tailwind.config.js
//
// Design system v2 — Editorial (Variation A).
// Teal-dominant palette, four font families wired through CSS variables,
// editorial-spec typography scale.
//
// Palette rationale:
//   ink    — darkest teal, body copy and primary dark surfaces
//   deep   — primary teal, dominant structural colour (headers, buttons)
//   brand  — mid teal, links and accents within prose
//   soft   — tinted paper for secondary surfaces
//   paper  — warm off-white canvas (the "editorial paper" feel)
//   line   — hairline borders throughout
//   accent — brass for premium-moment details (NOT a utility colour;
//            reserve for pullquote marks, first-letter drops, gate detail)

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New teal-dominant palette (replaces old 'brand' tokens).
        // Use these as the primary naming; the full 50-950 stays in case
        // any deep utilities need it.
        teal: {
          ink:    '#15363d',
          deep:   '#2b5863',
          brand:  '#3e6e7a',
          muted:  '#6a8088',
          soft:   '#e4ecee',
          paper:  '#f6f3ed',
          line:   '#cfd4d5',
        },
        paper: '#f6f3ed',
        accent: {
          DEFAULT: '#c8a87a',
          deep:    '#a88558',
          soft:    '#e9d9bd',
        },
        // Legacy brand scale kept for modal/animation code that references it.
        // New code should use 'teal.*' instead.
        brand: {
          50:  '#F0F4F5',
          100: '#D9E5E8',
          200: '#B0CDD3',
          300: '#7DAEBB',
          400: '#4D8E9E',
          500: '#3e6e7a',   // brand
          600: '#2b5863',   // deep
          700: '#1e434c',
          800: '#15363d',   // ink
          900: '#0e252b',
          950: '#060F13',
        },
      },

      fontFamily: {
        // sans / body — Inter, for UI chrome and microtype
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        // display — Fraunces, for all H1/H2/H3 structural headings
        display: ['var(--font-display)', 'Georgia', 'serif'],
        // editorial — Instrument Serif italic, for voice moments
        editorial: ['var(--font-editorial)', 'Georgia', 'serif'],
        // body prose — Cormorant Garamond, for lede/quote body copy
        prose: ['var(--font-prose)', 'Georgia', 'serif'],
      },

      fontSize: {
        'display-xl': ['2.6rem',   { lineHeight: '0.98', letterSpacing: '-0.02em' }],
        'display-lg': ['2.2rem',   { lineHeight: '0.98', letterSpacing: '-0.02em' }],
        'display':    ['1.8rem',   { lineHeight: '1.02', letterSpacing: '-0.01em' }],
        'display-sm': ['1.4rem',   { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'lede':       ['1.0625rem', { lineHeight: '1.5' }],     // Cormorant 17/25
        'prose':      ['1rem',      { lineHeight: '1.55' }],
        'caption':    ['0.75rem',   { lineHeight: '1.3', letterSpacing: '0' }],
      },

      maxWidth: {
        'prose-editorial': '38rem',  // ~608px, tight editorial measure
        'prose-wide':      '45rem',
      },

      boxShadow: {
        'cta': '0 10px 30px -10px rgba(21,54,61,0.5)',
        'editorial': '0 20px 60px -25px rgba(21,54,61,0.35)',
      },

      borderRadius: {
        'editorial': '0',   // sharp, not rounded
      },

      keyframes: {
        'backdrop-in':  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'backdrop-out': { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
        'modal-in':  { '0%': { opacity: '0', transform: 'scale(0.9) translateY(20px)' }, '100%': { opacity: '1', transform: 'scale(1) translateY(0)' } },
        'modal-out': { '0%': { opacity: '1', transform: 'scale(1) translateY(0)' }, '100%': { opacity: '0', transform: 'scale(0.9) translateY(20px)' } },
        'fade-in': { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        'backdrop-in':  'backdrop-in 0.3s ease-out',
        'backdrop-out': 'backdrop-out 0.3s ease-in',
        'modal-in':     'modal-in 0.3s ease-out',
        'modal-out':    'modal-out 0.3s ease-in',
        'fade-in':      'fade-in 0.4s ease-out',
      },
    },
  },
  plugins: [],
};

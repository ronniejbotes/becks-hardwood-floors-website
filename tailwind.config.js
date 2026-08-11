/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm paper base — never pure white, which reads clinical next to wood tones.
        paper: '#FBF8F4',
        sand: '#F2EAE0',
        linen: '#E7DCCE',
        // Warm near-black. Pure #000 next to oak looks like a hole in the page.
        ink: '#1C1714',
        espresso: '#241C17',
        walnut: '#3A2C22',
        // Single accent, pulled from the mid-tone of a finished red oak floor.
        oak: '#B0692B',
        'oak-deep': '#8A4E1B',
        'oak-soft': '#D9A167',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        card: '28px',
        pill: '999px',
      },
      boxShadow: {
        lift: '0 1px 2px rgba(28,23,20,0.04), 0 8px 24px -8px rgba(28,23,20,0.12)',
        'lift-lg': '0 2px 4px rgba(28,23,20,0.05), 0 24px 56px -16px rgba(28,23,20,0.22)',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

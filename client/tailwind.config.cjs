/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        "25": "repeat(25, minmax(0, 1fr))",
      },
    }
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  
  theme: {
    extend: {
      screens: {
        'xs': '475px',  // Extra small devices
        'sm': '640px',  // Small devices (default)
        'md': '768px',  // Medium devices (default)
        'lg': '1024px', // Large devices (default)
        'xl': '1280px', // Extra-large devices (default)
        '2xl': '1536px' // Custom large screen
      }
    },
  },
  plugins: [  require('preline/plugin'),],
};


 
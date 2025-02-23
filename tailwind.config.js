  /** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
      "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        screens: {
          mb: { max: "739px" },
          tl: { min: "740px", max: "1023px" },
          pc: { min: "1024px", max: "1239px" },
        },
        colors: {
          primary: 'black', 
          secondary: '#181818',
        },
      },
    },
    plugins: [
      function ({ addComponents }) {
        addComponents({
          ".res": {
            maxWidth: "1200px", margin: "0 auto",
            "@screen tl": {
              width: "644px", margin: "0 auto",
            },
            "@screen pc": {
              width: "983px", margin: "0 auto",
            },
          },
        });
      },
    ],
  };

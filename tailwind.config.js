const { transform } = require('next/dist/build/swc');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        heartAnimate: 'heartAnimate 1.33s ease-in-out infinite',
        myFace: 'myFace 8s ease-in-out infinite',
      },
      keyframes: {
        // 心跳
        heartAnimate: {
          '0%, 100%': { transform: 'scale(1)' },
          '10%, 30%': { transform: 'scale(.9)' },
          '20%, 40%, 50%, 70%, 80%': { transform: 'scale(1.1)' },
        },
        // 调皮的表情
        myFace: {
          '0%, 100%': { transform: 'translateY(0) rotate(0)' },
          '2%, 24%, 80%': { transform: 'translateY(1.5px) rotate(1.5deg)' },
          '4%, 68%, 98%': { transform: 'translateY(-1.5px) rotate(-.5deg)' },
          '38%, 6%': { transform: 'translateY(1.5px) rotate(-1.5deg)' },
          '8%, 86%': { transform: 'translateY(-1.5px) rotate(-1.5deg)' },
          '10%, 72%': { transform: 'translateY(2.5px) rotate(1.5deg)' },
          '12%, 64%, 78%, 96%': { transform: 'translateY(-.5px) rotate(1.5deg)' },
          '14%, 54%': { transform: 'translateY(-1.5px) rotate(1.5deg)' },
          '16%': { transform: 'translateY(-.5px) rotate(-1.5deg)' },
          '18%, 22%': { transform: 'translateY(.5px) rotate(-1.5deg)' },
          '20%, 36%, 46%': { transform: 'translateY(-1.5px) rotate(2.5deg)' },
          '26%, 50%': { transform: 'translateY(.5px) rotate(.5deg)' },
          '28%': { transform: 'translateY(.5px) rotate(1.5deg)' },
          '30%, 40%, 62%, 76%, 88%': { transform: 'translateY(-.5px) rotate(2.5deg)' },
          '32%, 34%, 66%': { transform: 'translateY(1.5px) rotate(-.5deg)' },
          '42%': { transform: 'translateY(2.5px) rotate(-1.5deg)' },
          '44%, 70%': { transform: 'translateY(1.5px) rotate(.5deg)' },
          '48%, 74%, 82%': { transform: 'translateY(-.5px) rotate(.5deg)' },
          '52%, 56%, 60%': { transform: 'translateY(2.5px) rotate(2.5deg)' },
          '58%': { transform: 'translateY(.5px) rotate(2.5deg)' },
          '84%': { transform: 'translateY(1.5px) rotate(2.5deg)' },
          '90%': { transform: 'translateY(2.5px) rotate(-.5deg)' },
          '92%': { transform: 'translateY(.5px) rotate(-.5deg)' },
          '94%': { transform: 'translateY(2.5px) rotate(.5deg)' },
        },
      },
      fontFamily: {
        longCang: ['long-cang','sans-serif'],
      },
    },
  },
  plugins: [],
};

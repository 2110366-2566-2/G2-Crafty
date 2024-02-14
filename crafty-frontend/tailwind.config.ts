import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...colors,
      ct_brown: {
        100: '#FFF4E8',
        200: '#EAC696',
        300: '#C8AE7D',
        400: '#765827',
        500: '#65451F',
        600: '#513719',
      },
      ct_gray: {
        100: '#EEEEEE',
        200: '#DDDDDD',
        300: '#CCCCCC',
        400: '#BBBBBB',
        500: '#9A9A9A',
        600: '#5C5C5C',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        ct_xs: '-1px 1px 1px 0 rgba(0, 0, 0, 0.05)',
        ct_sm: '-1px 1px 1px 0 rgba(0, 0, 0, 0.06), -1px 1px 2px 0 rgba(0, 0, 0, 0.1)',
        ct_md: '-4px 4px 3px 0 rgba(0, 0, 0, 0.06), -2px 2px 2px 0 rgba(0, 0, 0, 0.06)',
        ct_l: '-10px 10px 8px 0 rgba(0, 0, 0, 0.04), -4px 4px 3px 0 rgba(0, 0, 0, 0.1)',
        ct_xl:
          '-8px 8px 12px 0 rgba(0, 0, 0, 0.1), -3px 3px 6px 0 rgba(0, 0, 0, 0.15), 0px 0px 4px 0 rgba(0, 0, 0, 0.20)',
        ct_2xl: '1px -1px 20px 0 rgba(0, 0, 0, 0.15), -20px 20px 25px 0 rgba(0, 0, 0, 0.15)',
      },
      width: {
        ct_sm: 'full',
        ct_md: '600px',
        ct_lg: '1024px',
      },
    },
  },
  daisyui: {
    themes: ['light', 'dark', 'cupcake'],
  },
  plugins: [require('daisyui')],
};
export default config;

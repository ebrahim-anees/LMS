/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'course-details-heading-small': ['26px', '36px'],
        'course-details-heading-large': ['36px', '44px'],
        'home-heading-small': ['28px', '34px'],
        'home-heading-large': ['48px', '56px'],
        default: ['15px', '21px'],
      },
      gridTemplateColumns: {
        auto: 'repeat(auto-fit, minmax(200px, 1fr))',
      },
      spacing: {
        'section-height': '500px',
      },
      maxWidth: {
        'course-card': '424px',
      },
      boxShadow: {
        'custom-card': '0px 4px 15px 2px rgba(0, 0, 0, 0.1)',
        'light-hover': '0 4px 10px rgba(79,70,229,0.3)',
        'light-active': '0 2px 5px rgba(79,70,229,0.5)',
        'dark-hover': '0 4px 10px rgba(255,215,0,0.3)',
        'dark-active': '0 2px 5px rgba(255,215,0,0.5)',
      },
      colors: {
        'light-white': '#F9FAFB',
        'light-black': '#1F2937',
        'light-purple': '#4F46E5',
        'light-sky': '#A5B4FC',
        'light-gray': '#D1D5DB',
        'light-dGray': '#374151',

        'light-sky-40': 'rgba(165,180,252,0.4)',
        'light-sky-20': 'rgba(165,180,252,0.2)',
        'light-sky-07': 'rgba(165,180,252,0.07)',
        'light-sky-02': 'rgba(165,180,252,0.02)',

        'dark-black': '#111827',
        'dark-white': '#E5E7EB',
        'dark-gold': '#FBBF24',
        'dark-blue': '#3B82F6',
        'dark-gray': '#D1D5DB',
        'dark-dGray': '#374151',

        'dark-gold-55': 'rgba(251,191,36,0.55)',
        'dark-gold-35': 'rgba(251,191,36,0.35)',
        'dark-gold-15': 'rgba(251,191,36,0.15)',
        'dark-gold-001': 'rgba(251,191,36,0.001)',
      },
      keyframes: {
        'slide-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'slide-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(50%)' },
        },
      },
      animation: {
        'slide-right': 'slide-right 100s linear infinite alternate',
        'slide-left': 'slide-left 100s linear infinite alternate',
      },
    },
  },
  plugins: [
    // ... other plugins ...
    function ({ addComponents }) {
      addComponents({
        '.rich-text': {
          '& *': {
            color: 'inherit',
          },
        },
      });
    },
  ],
};

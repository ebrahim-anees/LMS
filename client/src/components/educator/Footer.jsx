import { assets } from '../../assets';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

export default function Footer() {
  const { theme } = useContext(AppContext);
  return (
    <footer
      className={`bg-dark-black flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t transition-colors duration-300 bg-gradient-to-b 
        ${
          theme === 'light'
            ? 'border-t-light-purple from-light-sky-20 to-light-sky-02'
            : 'border-t-dark-gold from-dark-gold-35 to-dark-gold-001'
        }`}
    >
      <div className="flex items-center gap-4">
        <Link to="/">
          <img
            src={theme === 'light' ? assets.light_fLogo : assets.dark_fLogo}
            alt="logo"
            className="w-20 hidden md:block"
          />
        </Link>
        <span
          className={`hidden md:block h-7 w-px transition-colors duration-300 ${
            theme === 'light' ? 'bg-light-gray' : 'bg-dark-gray'
          }`}
        ></span>
        <p
          className={`py-4 text-center text-xs md:text-sm transition-colors duration-300 ${
            theme === 'light' ? 'text-light-white' : 'text-dark-white'
          }`}
        >
          copyright 2025{' '}
          <span
            className={`font-semibold ${
              theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
            }`}
          >
            &copy;docCode
          </span>
          . All rights reserved.
        </p>
      </div>
      <div
        className={`flex items-center gap-3 max-md:mt-4 filter 
`}
      >
        {['facebook', 'x', 'instagram'].map((platform) => (
          <a href="#" key={platform}>
            <img
              src={
                theme === 'light'
                  ? assets[`light_${platform}_icon`]
                  : assets[`dark_${platform}_icon`]
              }
              alt={`${platform}_icon`}
            />
          </a>
        ))}
      </div>
    </footer>
  );
}

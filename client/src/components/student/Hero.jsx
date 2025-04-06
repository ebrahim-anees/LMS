import clsx from 'clsx';
import { assets } from './../../assets';
import SearchBar from './SearchBar';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

export default function Hero() {
  const { theme } = useContext(AppContext);
  const gradientClass = clsx(
    'flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b',
    {
      'from-light-sky-20 to-light-sky-02': theme === 'light',
      'from-dark-gold-35 to-dark-gold-001': theme === 'dark',
    }
  );
  const highlightClass = clsx({
    'text-light-purple': theme === 'light',
    'text-dark-gold': theme === 'dark',
  });
  return (
    <div className={gradientClass}>
      <h1
        className={`md:text-home-heading-large text-home-heading-small relative font-bold ${
          theme === 'light' ? 'text-light-black' : 'text-dark-white'
        } max-w-3xl mx-auto`}
      >
        Empower your future with the courses designed to{' '}
        <span className={highlightClass}>fit your choice</span>
        <img
          src={theme === 'light' ? assets.light_sketch : assets.dark_sketch}
          alt="sketch"
          className="md:block hidden absolute -bottom-7 right-0"
        />
      </h1>
      <p
        className={`md:block hidden ${
          theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
        } max-w-2xl mx-auto`}
      >
        We bring together world-class instructors, interactive content, and a
        supportive community to help you achieve your personal and professional
        goals.
      </p>
      <p
        className={`md:hidden ${
          theme === 'light' ? 'text-light-gray' : 'text-dark-gold'
        } max-w-sm mx-auto`}
      >
        We bring together world-class instructors to help you achieve your
        professional goals.
      </p>
      <SearchBar />
    </div>
  );
}

import { assets } from '../../assets';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export default function Navbar() {
  const { user } = useUser();
  const { theme, toggleTheme } = useContext(AppContext);

  const iconClass = clsx('transition-all ease-in-out', {
    'text-light-purple': theme === 'light',
    'text-dark-white': theme === 'dark',
  });
  return (
    <div
      className={`flex items-center justify-between border-gray-500 py-4 px-4 sm:px-10 md:px-14 lg:px-36 border-b bg-gradient-to-b
    ${
      theme === 'light'
        ? 'from-light-sky-40 to-light-sky-07 border-light-sky-40'
        : 'from-dark-gold-55 via-dark-gold-35 to-dark-dGray border-dark-gold-35'
    }
    `}
    >
      <Link to="/">
        <img
          src={theme === 'light' ? assets.light_logo : assets.dark_logo}
          alt="logo"
          className="w-28 lg:w-32"
        />
      </Link>
      <div
        className={`flex items-center gap-5 relative ${
          theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
        }`}
      >
        <p>Hi! {user?.fullName || 'Developers'}</p>
        {user ? (
          <UserButton />
        ) : (
          <img src={assets.profile_img} alt="profile_img" className="max-w-8" />
        )}
        <button
          onClick={toggleTheme}
          className="w-[20px] h-[20px] focus:outline-none"
        >
          <FontAwesomeIcon
            icon={theme === 'dark' ? faSun : faMoon}
            className={iconClass}
          />
        </button>
      </div>
    </div>
  );
}

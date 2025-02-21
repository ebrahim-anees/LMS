import { assets } from '../../assets';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

export default function Navbar() {
  const { isEducator, setIsEducator } = useContext(AppContext);
  const navigate = useNavigate();
  const isCourseListPage = location.pathname.includes('/course-list');

  const { user } = useUser();
  const { openSignIn } = useClerk();

  const navbarClass = clsx(
    'flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4',
    {
      'bg-white': isCourseListPage,
      'bg-cyan-100/70': !isCourseListPage,
    }
  );
  return (
    <div className={navbarClass}>
      <img
        src={assets.logo}
        alt="logo"
        onClick={() => navigate('/')}
        className="w-28 lg:w-32 cursor-pointer"
      />
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user ? (
            <>
              <button
                onClick={() => {
                  navigate('/educator');
                }}
              >
                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>
              | <Link to="/my-enrollments">My Enrollments</Link>
            </>
          ) : null}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>
      {/* Phone screen */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user ? (
            <>
              <button
                onClick={() => {
                  navigate('/educator');
                }}
              >
                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>
              |{' '}
              <Link to="/my-enrollments" className="text-center">
                My Enrollments
              </Link>
            </>
          ) : null}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            <img src={assets.user_icon} alt="user" />
          </button>
        )}
      </div>
    </div>
  );
}

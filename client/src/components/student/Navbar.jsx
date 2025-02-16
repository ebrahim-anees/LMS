import React from 'react';
import { assets } from '../../assets';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

export default function Navbar() {
  const isCourseListPage = location.pathname.includes('/course-list');
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
        className="w-28 lg:w-32 cursor-pointer"
      />
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          <button>Become Educator</button>|{' '}
          <Link to="/my-enrollments">My Enrollments</Link>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full">
          Create Account
        </button>
      </div>
      {/* Phone screen */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <button>Become Educator</button>|{' '}
        <Link to="/my-enrollments" className='text-center'>My Enrollments</Link>
        <button>
          <img src={assets.user_icon} alt="user" />
        </button>
      </div>
    </div>
  );
}

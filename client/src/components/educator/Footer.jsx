import React from 'react';
import { assets } from '../../assets';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="w-20 hidden md:block" />
        </Link>
        <span className="hidden md:block h-7 w-px bg-gray-500/60"></span>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          copyright 2025 &copy; DocCode. All rights reserved.
        </p>
      </div>
      <div className="flex items-center gap-3 max-md:mt-4">
        {['facebook', 'twitter', 'instagram'].map((plateform) => (
          <a href="#" key={plateform} >
            <img src={assets[`${plateform}_icon`]} alt={`${plateform}_icon`} />
          </a>
        ))}
      </div>
    </footer>
  );
}

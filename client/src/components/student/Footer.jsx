import React from 'react';
import { assets } from '../../assets';

export default function Footer() {
  return (
    <div className="flex flex-col h-[70vh]">
      <footer className="bg-gray-900 md:px-36 text-left min-w-[100vw] mt-auto">
        <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-24 py-10 border-b border-white/30">
          <div className="flex flex-[2] flex-col md:items-start items-center w-full">
            <img src={assets.logo_dark} alt="logo" />
            <p className="mt-6 text-center md:text-left text-sm text-white/80">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui non
              at vero laudantium nisi quam.
            </p>
          </div>
          <div className="flex flex-1 flex-col md:items-start items-center w-full">
            <h3 className="font-semibold text-white mb-5">Company</h3>
            <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
              {['Home', 'About us', 'Contact us', 'Privacy Policy'].map(
                (item, i) => (
                  <li key={i}>
                    <a href="#">{item}</a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="hidden md:flex flex-[2] flex-col w-full ">
            <h3 className="font-semibold text-white mb-5">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-white/80">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
            <div className="flex items-center gap-2 pt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm"
              />
              <button className="bg-blue-600 w-24 h-9 text-white rounded">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <p className="py-4 text-center text-xs md:text-sm text-white/60">
          Copyright &copy;docCode 2025. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

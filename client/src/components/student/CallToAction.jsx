import React from 'react';
import { assets } from '../../assets';
import { useContext } from 'react';

import { AppContext } from '../../context/AppContext';

export default function CallToAction() {
  const { theme } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0">
      <h2
        className={`text-xl md:text-4xl ${
          theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
        } font-semibold`}
      >
        Learn anything, anytime, anywhere
      </h2>
      <p
        className={`${
          theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
        } text-sm md:text-base`}
      >
        Incididunt sint fugiat pariatur cupidatat consectetur sit illum anim id
        veniam aliqua proident execpteur commodo do ea.
      </p>
      <div className="flex gap-6 items-center font-medium mt-4">
        <button
          className={`${
            theme === 'light'
              ? 'btn-light'
              : 'btn-dark'
          } px-10 py-3 rounded-md`}
        >
          Get Started
        </button>
        <button
          className={`flex items-center gap-2 ${
            theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
          }`}
        >
          Learn more
          <img src={theme === 'light'? assets.light_arrow_icon: assets.dark_arrow_icon} alt="arrow_icon" />
        </button>
      </div>
    </div>
  );
}

import { assets } from '../../assets';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

export default function Footer() {
  const { theme } = useContext(AppContext);
  return (
    <div className="flex flex-col h-[70vh]">
      <footer
        className={`bg-dark-black bg-gradient-to-b  border-t md:px-36 text-left min-w-[100vw] mt-auto 
          ${
            theme === 'light'
              ? 'border-t-light-purple from-light-sky-20 to-light-sky-02'
              : 'border-t-dark-gold from-dark-gold-35 to-dark-gold-001'
          }`}
      >
        <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-24 py-10 border-b border-white/30">
          <div className="flex flex-[2] flex-col md:items-start items-center w-full">
            <img
              src={theme === 'light' ? assets.light_fLogo : assets.dark_fLogo}
              alt="logo"
            />
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
            <div className={`flex items-center gap-2 pt-4`}>
              <input
                type="email"
                placeholder="Enter your email"
                className={`outline-none w-64 h-9 rounded px-2 text-sm
                  ${
                    theme === 'light'
                      ? 'bg-light-white text-light-purple placeholder-light-dGray/50'
                      : 'bg-dark-black text-dark-gold placeholder-dark-gray/50'
                  }
                  `}
              />
              <button
                className={`${
                  theme === 'light' ? 'btn-light' : 'btn-dark'
                } w-24 h-9 rounded`}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <p
          className={`py-4 text-center text-xs md:text-sm ${
            theme === 'light' ? 'text-light-white' : 'text-dark-white'
          }`}
        >
          Copyright{' '}
          <span
            className={`font-semibold ${
              theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
            }`}
          >
            &copy;docCode
          </span>{' '}
          2025. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

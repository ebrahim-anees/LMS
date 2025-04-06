import { assets } from '../../assets';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

export default function Companies() {
  const { theme } = useContext(AppContext);
  const logos = [
    'microsoft_logo',
    'walmart_logo',
    'accenture_logo',
    'adobe_logo',
    'paypal_logo',
    'google_logo',
    'khanAcademy_logo',
    'coursera_logo',
    'linkenin_logo',
    'duolingo_logo',
  ];

  const animateLogos = (logosArray) => {
    return (
      <>
        {[...Array(3)].map((_, setIndex) =>
          logosArray.map((logo, i) => (
            <div
              key={`logo-${setIndex}-${i}`}
              className={`${
                theme === 'light' ? 'bg-light-purple/15' : 'bg-dark-white/75'
              } p-4 rounded-lg h-20 w-32 md:h-24 md:w-40 flex items-center justify-center select-none`}
            >
              <img
                src={assets[logo]}
                alt={logo}
                className="w-full h-full object-contain"
              />
            </div>
          ))
        )}
      </>
    );
  };

  return (
    <div className="pt-16 w-screen">
      <p
        className={`text-base ${
          theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
        }`}
      >
        Trusted by learners from
      </p>
      {Array.from({ length: 2 }, (_, i) => (
        <div className="relative w-full" key={i}>
          <div className="absolute inset-0 pointer-events-none z-10" />
          <div className="flex items-center justify-center md:mt-10 mt-5 overflow-hidden">
            <div
              className={`flex gap-6 md:gap-16 ${
                i === 0 ? 'animate-slide-right' : 'animate-slide-left'
              }`}
            >
              {i === 0
                ? animateLogos(logos)
                : animateLogos([...logos].reverse())}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

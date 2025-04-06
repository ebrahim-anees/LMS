import { assets } from '../assets';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function DashboardMiniCard({ icon, firstText, secondText }) {
  const { theme } = useContext(AppContext);

  return (
    <div
      className={`flex items-center gap-3 border-[1px] bg-gradient-to-r p-4 w-56 rounded-md transition-all duration-300 
      ${
        theme === 'light'
          ? 'text-dark-dGray border-light-purple/20 from-light-white via-light-purple/5 to-light-purple/10 hover:shadow-[0_4px_15px_rgba(79,70,229,0.15)]'
          : 'text-dark-gray border-dark-blue/30 from-[rgba(59,130,246,0.02)] via-[rgba(59,130,246,0.08)] to-[rgba(59,130,246,0.12)] hover:shadow-[0_4px_15px_rgba(59,130,246,0.2)]'
      }`}
    >
      <img src={assets[icon]} alt={icon} />
      <div>
        <p
          className={`text-2xl font-medium ${
            theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
          }`}
        >
          {firstText}
        </p>
        <p
          className={`text-base whitespace-nowrap font-semibold ${
            theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
          }`}
        >
          {secondText}
        </p>
      </div>
    </div>
  );
}

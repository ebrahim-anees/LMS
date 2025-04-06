import { useContext } from 'react';
import { assets } from '../../assets';
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export default function Sidebar() {
  const { isEducator, theme } = useContext(AppContext);

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/educator',
      icon: theme === 'light' ? assets.light_home_icon : assets.dark_home_icon,
    },
    {
      name: 'Add Course',
      path: '/educator/add-course',
      icon: theme === 'light' ? assets.light_add_icon : assets.dark_add_icon,
    },
    {
      name: 'My Courses',
      path: '/educator/my-courses',
      icon:
        theme === 'light'
          ? assets.light_my_course_icon
          : assets.dark_my_course_icon,
    },
    {
      name: 'Student Enrolled',
      path: '/educator/student-enrolled',
      icon:
        theme === 'light'
          ? assets.light_person_tick_icon
          : assets.dark_person_tick_icon,
    },
  ];

  const navLinkClass = ({ isActive }) =>
    clsx(
      'flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 transition-colors duration-300',
      {
        // Active link styles
        'bg-light-sky/50 border-r-[6px] border-light-purple text-light-black font-semibold':
          isActive && theme === 'light',
        'bg-dark-blue/50 border-r-[6px] border-dark-gold text-dark-white font-semibold':
          isActive && theme === 'dark',

        // Default & hover styles
        'hover:bg-light-sky/20 border-r-[6px] border-light-white hover:border-light-purple/20 text-light-black':
          !isActive && theme === 'light',
        'hover:bg-dark-blue/20 border-r-[6px] border-dark-black hover:border-dark-gold/20 text-dark-white':
          !isActive && theme === 'dark',
      }
    );

  return (
    isEducator && (
      <div
        className={clsx(
          'md:w-64 w-16 border-r min-h-screen text-base py-2 flex flex-col transition-colors duration-300',
          theme === 'light'
            ? 'border-light-gray bg-light-white text-light-black'
            : 'border-dark-gray bg-dark-black text-dark-white'
        )}
      >
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/educator'}
            className={navLinkClass}
          >
            <img src={item.icon} alt="item_icon" className="w-6 h-6" />
            <p className="hidden md:block text-center">{item.name}</p>
          </NavLink>
        ))}
      </div>
    )
  );
}

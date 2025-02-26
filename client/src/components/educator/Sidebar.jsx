import { useContext } from 'react';
import { assets } from '../../assets';
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
export default function Sidebar() {
  const { isEducator } = useContext(AppContext);
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/educator',
      icon: assets.home_icon,
    },
    {
      name: 'Add Course',
      path: '/educator/add-course',
      icon: assets.add_icon,
    },
    {
      name: 'My Courses',
      path: '/educator/my-courses',
      icon: assets.my_course_icon,
    },
    {
      name: 'Student Enrolled',
      path: '/educator/student-enrolled',
      icon: assets.person_tick_icon,
    },
  ];
  const navLinkClass = ({ isActive }) =>
    clsx(
      'flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3',
      {
        'bg-indigo-50 border-r-[6px] border-indigo-500/90': isActive,
        'hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90':
          !isActive,
      }
    );
  return (
    isEducator && (
      <div className="md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col">
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

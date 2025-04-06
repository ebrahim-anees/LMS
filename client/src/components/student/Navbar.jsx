import { assets } from '../../assets';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const { isEducator, serverUrl, setIsEducator, getToken, theme, toggleTheme } =
    useContext(AppContext);
  const navigate = useNavigate();

  const { user } = useUser();
  const { openSignIn } = useClerk();

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate('/educator');
        return;
      }
      const token = await getToken();
      const { data } = await axios.get(`${serverUrl}/educator/update-role`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const primaryColor = theme === 'light' ? '#4F46E5' : '#FBBF24';
  const colorText = theme === 'light' ? '#1F2937' : '#E5E7EB';
  const textGray = theme === 'light' ? '#374151' : '#D1D5DB';
  const btnText = theme === 'light' ? '#F9FAFB' : '#111827';

  const signInAppearance = {
    variables: {
      colorPrimary: primaryColor,
      colorBackground: btnText, // Background color
      colorText: colorText,
      colorInputPlaceholder: '#374151', // This sets the placeholder color
    },
    elements: {
      headerTitle: { color: primaryColor },
      headerSubtitle: { color: textGray },

      socialButtonsBlockButton: {
        background: primaryColor,
        color: btnText,
        transition: 'box-shadow 0.3s ease', // Smooth transition for shadow effect
        ':hover': {
          background: primaryColor,
          boxShadow:
            theme === 'light'
              ? '0 6px 20px rgba(79, 70, 229, 0.3)' // Increased opacity and shadow spread for light theme
              : '0 4px 15px rgba(249, 191, 36, 0.3)', // Dark theme shadow
        },
      },
      formButtonPrimary: {
        background: primaryColor,
        color: btnText,
      },
      formFieldInput: {
        '::placeholder': {
          color: '#374151',
          opacity: 1, // Ensure full opacity
        },
      },
      footerActionText: { color: colorText }, // "Don't have an account?"
    },
  };
  const userButtonAppearance = {
    variables: {
      colorPrimary: primaryColor,
      colorText: colorText,
      colorBackground: btnText,
    },
    elements: {
      userButtonPopoverActionButtonIcon: {
        color: colorText, // For icons next to the text
      },
      userButtonPopoverActionButton: {
        color: colorText,
        '&:hover': {
          color: colorText,
          backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151', // Hover background
        },
      },
    },
  };

  const navbarClass = clsx(
    `flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b py-4 bg-gradient-to-b `,
    {
      'from-light-sky-40 to-light-sky-20 border-light-sky-40':
        theme === 'light',
      'from-dark-gold-55 to-dark-gold-35 border-dark-gold-001':
        theme === 'dark',
    }
  );
  const iconClass = clsx('transition-all duration-300 ease-in-out', {
    'text-light-purple': theme === 'light',
    'text-dark-white': theme === 'dark',
  });
  return (
    <div className={navbarClass}>
      <img
        src={theme === 'light' ? assets.light_logo : assets.dark_logo}
        alt="logo"
        onClick={() => navigate('/')}
        className="w-28 lg:w-32 cursor-pointer"
      />
      <div
        className={`hidden md:flex items-center gap-5 ${
          theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
        }`}
      >
        <div className={`flex items-center gap-5 `}>
          {user && (
            <>
              <button onClick={becomeEducator}>
                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>
              | <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton appearance={userButtonAppearance} />
        ) : (
          <button
            onClick={() =>
              openSignIn({
                appearance: signInAppearance,
              })
            }
            className={`px-5 py-2 rounded-full transition-all duration-300 ease-in-out transform 
              ${
                theme === 'light'
                  ? 'btn-light'
                  : 'bg-dark-white text-dark-black hover:bg-gray-300 active:scale-95 focus:ring-gray-500 focus:ring-1 focus:ring-dark-blue/50 focus:outline-none'
              }`}
          >
            Create Account
          </button>
        )}
        <button
          onClick={toggleTheme}
          className="w-[20px] h-[20px] focus:outline-none"
        >
          <FontAwesomeIcon
            icon={theme === 'dark' ? faSun : faMoon}
            className={iconClass}
          />
        </button>
      </div>
      {/* Phone screen */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button onClick={becomeEducator}>
                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>
              |{' '}
              <Link to="/my-enrollments" className="text-center">
                My Enrollments
              </Link>
            </>
          )}
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
        <button onClick={toggleTheme} className="focus:outline-none">
          <FontAwesomeIcon
            icon={theme === 'dark' ? faSun : faMoon}
            className={`text-${theme}-secondary`}
          />
        </button>
      </div>
    </div>
  );
}

import { useContext } from 'react';
import { assets } from '../assets';
import { AppContext } from '../context/AppContext';
import clsx from 'clsx';
export default function Rating({ course, isCourseDetails = false }) {
  const { calcRating, theme } = useContext(AppContext);
  const ratingClass = clsx('flex items-center space-x-2', {
    'pt-3 pb-1 text-sm': isCourseDetails,
  });
  return (
    <div className={ratingClass}>
      <p
        className={`relative bottom-[0.5px] ${
          theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
        }`}
      >
        {calcRating(course)}
      </p>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <img
            key={i}
            src={
              calcRating(course) > i
                ? theme === 'light'
                  ? assets.light_star
                  : assets.dark_star
                : theme === 'light'
                ? assets.light_star_blank
                : assets.dark_star_blank
            }
            alt="rating"
            className="w-3.5 h-3.5"
          />
        ))}
      </div>
      {isCourseDetails && (
        <>
          <p className={`${theme === 'light'? 'text-light-purple': 'text-dark-gold'}`}>
            ({course.courseRatings.length}{' '}
            {course.courseRatings.length > 1 ? 'ratings ' : 'rating '})
          </p>
          <p className={`${theme === 'light'? 'text-light-dGray': 'text-dark-gray'}`}>
            {course.enrolledStudents.length}{' '}
            {course.enrolledStudents.length > 1 ? 'students' : 'student'}
          </p>
        </>
      )}
    </div>
  );
}

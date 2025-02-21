import React, { useContext } from 'react';
import { assets } from '../assets';
import { AppContext } from '../context/AppContext';
import clsx from 'clsx';
export default function Rating({ course, isCourseDetails = false }) {
  const { calcRating } = useContext(AppContext);
  const ratingClass = clsx('flex items-center space-x-2', {
    'pt-3 pb-1 text-sm': isCourseDetails,
  });
  return (
    <div className={ratingClass}>
      <p>{calcRating(course)}</p>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <img
            key={i}
            src={calcRating(course) > i ? assets.star : assets.star_blank}
            alt="rating"
            className="w-3.5 h-3.5"
          />
        ))}
      </div>
      {isCourseDetails ? (
        <>
          <p className="text-blue-500">
            ({course.courseRatings.length}{' '}
            {course.courseRatings.length > 1 ? 'ratings ' : 'rating '})
          </p>
          <p>
            {course.enrolledStudents.length}{' '}
            {course.enrolledStudents.length > 1 ? 'students' : 'student'}
          </p>
        </>
      ) : null}
    </div>
  );
}

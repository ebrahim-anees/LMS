import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import Rating from '../../section/Rating';
export default function CourseCard({ course }) {
  const { currency, theme } = useContext(AppContext);
  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className={`bg-gradient-to-t border ${
        theme === 'light'
          ? 'border-light-purple from-light-sky-07 to-light-sky-40'
          : 'border-dark-dGray from-dark-gold-001 to-dark-gold-35'
      } pb-6 overflow-hidden rounded-lg`}
    >
      <img
        src={course.courseThumbnail}
        alt="course_thumbnail"
        className="w-full"
      />
      <div className="p-3 text-left">
        <h3 className={`text-base font-semibold line-clamp-1 ${theme === 'light'? 'text-light-black':'text-dark-white'}`}>
          {course.courseTitle}
        </h3>
        <p className={`${theme === 'light'? 'text-light-dGray opacity-50': 'text-dark-gray opacity-50'}`}>{course.educator.name}</p>
        <Rating course={course} />
        <p className={`text-base font-semibold ${theme === 'light'? 'text-light-dGray': 'text-dark-gray'}`}>
          {currency}
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

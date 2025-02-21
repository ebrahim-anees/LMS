import { assets } from '../../assets';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import Rating from '../../section/Rating';
export default function CourseCard({ course }) {
  const { currency, calcRating } = useContext(AppContext);
  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg"
    >
      <img
        src={course.courseThumbnail}
        alt="course_thumbnail"
        className="w-full"
      />
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold line-clamp-1">{course.courseTitle}</h3>
        <p className="text-gray-500">{course.educator.name}</p>
        <Rating course={course} />
        <p className="text-base font-semibold text-gray-800">
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

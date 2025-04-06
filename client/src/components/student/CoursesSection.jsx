import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';
export default function CoursesSection() {
  const { courses, theme } = useContext(AppContext);

  return (
    <div className="py-16 md:px-40 px-8">
      <h2
        className={`text-3xl font-medium ${
          theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
        }`}
      >
        Learn from the best
      </h2>
      <p
        className={`text-sm md:text-base ${
          theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
        } mt-3`}
      >
        Discover our top-rated courses across various categories. From coding
        and design to business and wellness, <br /> our courses are crafted to
        deliver results.
      </p>
      <div className="grid grid-cols-auto gap-4 px-4 my-10 md:px-0 md:my-16">
        {courses?.slice(0, 4).map((course, i) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>
      <Link
        to="/course-list"
        onClick={() => scrollTo(0, 0)}
        className={`px-10 py-3 rounded-md ${
          theme === 'light' ? 'btn-light' : 'btn-dark'
        }
        
        `}
      >
        Show all courses
      </Link>
    </div>
  );
}

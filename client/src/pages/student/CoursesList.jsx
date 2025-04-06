import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../../components/student/SearchBar';
import { AppContext } from '../../context/AppContext';
import CourseCard from '../../components/student/CourseCard';
import { assets } from '../../assets';
import Footer from '../../components/student/Footer';
export default function CoursesList() {
  const { courses, theme } = useContext(AppContext);
  const { input } = useParams();
  const navigate = useNavigate();
  const [filteredCourses, setFilteredCourses] = useState([]);
  useEffect(() => {
    if (courses?.length > 0) {
      if (input) {
        setFilteredCourses(
          [...courses].filter((course) =>
            course.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        );
      } else {
        setFilteredCourses([...courses]);
      }
    }
  }, [input, courses]);
  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1
              className={`text-4xl font-semibold ${
                theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
              }`}
            >
              Course List
            </h1>
            <p
              className={`${
                theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
              }`}
            >
              <span
                className={`cursor-pointer ${
                  theme === 'light' ? 'text-light-purple' : 'text-dark-blue'
                }`}
                onClick={() => navigate('/')}
              >
                Home
              </span>
              /<span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>
        {input ? (
          <div
            className={`inline-flex items-center gap-4 px-4 py-2 border rounded-md mt-8 -mb-8 ${
              theme === 'light'
                ? 'border-light-black text-light-black'
                : 'border-dark-white text-dark-white'
            }

          `}
          >
            <p>{input}</p>
            <img
              src={
                theme === 'light'
                  ? assets.light_cross_icon
                  : assets.dark_cross_icon
              }
              alt="cross_icon"
              className="cursor-pointer"
              onClick={() => navigate('/course-list')}
            />
          </div>
        ) : (
          <p
            className={`w-max px-4 py-2 border ${
              theme === 'light'
                ? 'border-light-black text-light-black'
                : 'border-dark-white text-dark-white'
            } rounded-md mt-8 -mb-8`}
          >
            All courses
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {filteredCourses.map((course, i) => (
            <CourseCard key={i} course={course} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

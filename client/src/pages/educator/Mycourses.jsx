import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../section/Loading';
import { clsx } from 'clsx';
import { toast } from 'react-toastify';
import axios from 'axios';
export default function Mycourses() {
  const { courses, currency, serverUrl, isEducator, getToken, theme } =
    useContext(AppContext);
  const [myCourses, setMyCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${serverUrl}/educator/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setMyCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses();
    }
  }, [isEducator]);

  const tHeadClass = (i) =>
    clsx('px-4 py-3 font-semibold', {
      'text-center': i !== 0,
    });
  return myCourses ? (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0 mb-16">
      <div className="w-full">
        <h2
          className={`pb-4 text-lg font-medium ${
            theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
          }`}
        >
          My courses
        </h2>
        <div
          className={`flex flex-col items-center max-w-4xl w-full !mt-0 overflow-hidden rounded-md border shadow-md ${
            theme === 'light'
              ? 'border-light-purple bg-gradient-to-t from-light-sky-07 to-light-sky-40'
              : 'border-dark-dGray bg-gradient-to-t from-dark-gold-001 to-dark-gold-35'
          }`}
        >
          <table className="table-fixed md:table-auto w-full overflow-hidden">
            <thead
              className={`border-b text-sm text-left bg-gray-500/10 ${
                theme === 'light'
                  ? 'text-light-black border-light-sky-20'
                  : 'text-dark-white border-dark-gold-35'
              }`}
            >
              <tr>
                {['All Courses', 'Earnings', 'Students', 'Published on'].map(
                  (head, i) => (
                    <th
                      key={i}
                      className={`px-4 py-3 font-semibold ${
                        theme === 'light'
                          ? 'text-light-black'
                          : 'text-dark-white'
                      }`}
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody
              className={`text-sm ${
                theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
              }`}
            >
              {courses.map((course) => (
                <tr
                  key={course._id}
                  className={`border-b ${
                    theme === 'light'
                      ? 'border-light-sky-07'
                      : 'border-dark-gold-15'
                  }`}
                >
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <img
                      src={course.courseThumbnail}
                      alt="course_thumbnail"
                      className="w-16 rounded-md"
                    />
                    <span className="truncate hidden md:block">
                      {course.courseTitle}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {currency}{' '}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100)
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {course.enrolledStudents.length}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

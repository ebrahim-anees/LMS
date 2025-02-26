import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../section/Loading';
import { clsx } from 'clsx';
export default function Mycourses() {
  const { courses, currency } = useContext(AppContext);
  const [myCourses, setMyCourses] = useState(null);

  useEffect(() => setMyCourses(courses), [courses]);
  const tHeadClass = (i) =>
    clsx('px-4 py-3 font-semibold', {
      'text-center': i !== 0,
    });
  return myCourses ? (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0 mb-16">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">My courses</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
              <tr>
                {['All Courses', 'Earnings', 'Students', 'Published on'].map(
                  (head, i) => (
                    <th key={i} className={tHeadClass(i)}>
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <img
                      src={course.courseThumbnail}
                      alt="course_thumbnail"
                      className="w-16"
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

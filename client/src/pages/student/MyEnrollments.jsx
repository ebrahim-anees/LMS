import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';

export default function MyEnrollments() {
  const navigate = useNavigate();
  const { enrolledCourses, calcCourseDuration } = useContext(AppContext);
  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 0, totalLectures: 12 },
    { lectureCompleted: 8, totalLectures: 14 },
    { lectureCompleted: 10, totalLectures: 10 },
    { lectureCompleted: 12, totalLectures: 18 },
    { lectureCompleted: 14, totalLectures: 20 },
    { lectureCompleted: 16, totalLectures: 16 },
  ]);
  return (
    <>
      <div className="md:px-36 px-8 pt-10">
        <h1 className="text-2xl font-semibold">My Enrollments</h1>
        <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
            <tr>
              {['Course', 'Duration', 'Completed', 'Status'].map((header, i) => (
                <th key={i} className="px-4 py-3 font-semibold truncate">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {enrolledCourses.map((course, i) => (
              <tr key={i} className="border-b border-gray-500/20">
                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                  <img
                    src={course.courseThumbnail}
                    alt="course_thumbnail"
                    className="w-14 sm:w-24 md:w-28"
                  />
                  <div className="flex-1">
                    <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
                    <Line
                      percent={
                        progressArray[i]
                          ? (progressArray[i].lectureCompleted /
                              progressArray[i].totalLectures) *
                            100
                          : 0
                      }
                      strokeWidth={2}
                      className="bg-gray-300 rounded-full"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {calcCourseDuration(course)}
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {progressArray[i] && (
                    <>
                      {progressArray[i].lectureCompleted} /{' '}
                      {progressArray[i].totalLectures}{' '}
                    </>
                  )}
                  <span className="max-sm:text-xs">Lectures</span>
                </td>
                <td className="px-4 py-3 max-sm:text-right">
                  <button
                    className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:texxt-xs text-white"
                    onClick={() => navigate(`/player/${course._id}`)}
                  >
                    {progressArray[i] &&
                    progressArray[i].lectureCompleted ===
                      progressArray[i].totalLectures
                      ? 'Completed'
                      : 'On Going'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

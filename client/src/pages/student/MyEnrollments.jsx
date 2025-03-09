import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from './../../section/Loading';

export default function MyEnrollments() {
  const navigate = useNavigate();
  const {
    enrolledCourses,
    calcCourseDuration,
    userData,
    fetchEnrolledCourses,
    serverUrl,
    getToken,
    calcNumOfLectures,
  } = useContext(AppContext);
  const [progressArray, setProgressArray] = useState([]);

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const tempProgressArray = await Promise.all(
        enrolledCourses?.map(async (course) => {
          const { data } = await axios.post(
            `${serverUrl}/user/get-course-progress`,
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          let totalLectures = calcNumOfLectures(course);
          const lectureCompleted = data.progressData
            ? data.progressData.lectureCompleted.length
            : 0;
          return {
            totalLectures,
            lectureCompleted,
          };
        })
      );
      setProgressArray(tempProgressArray);
    } catch (err) {
      console.log('here it is');
      toast.error(err.message);
    }
  };
  useEffect(() => {
    if (userData) fetchEnrolledCourses();
  }, [userData]);
  useEffect(() => {
    if (enrolledCourses?.length > 0) getCourseProgress();
  }, [enrolledCourses]);
  return enrolledCourses ? (
    <div>
      <div className="md:px-36 px-8 pt-10 mb-20">
        <h1 className="text-2xl font-semibold">My Enrollments</h1>
        <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
            <tr>
              {['Course', 'Duration', 'Completed', 'Status'].map(
                (header, i) => (
                  <th key={i} className="px-4 py-3 font-semibold truncate">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {enrolledCourses?.map((course, i) => (
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
                      {progressArray[i]?.lectureCompleted} /{' '}
                      {progressArray[i]?.totalLectures}{' '}
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
    </div>
  ) : (
    <Loading />
  );
}

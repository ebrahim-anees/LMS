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
    theme,
  } = useContext(AppContext);
  const [progressArray, setProgressArray] = useState([]);

  const dummyProgressArray = [
    { totalLectures: 20, lectureCompleted: 5 },
    { totalLectures: 15, lectureCompleted: 10 },
    { totalLectures: 30, lectureCompleted: 25 },
    { totalLectures: 12, lectureCompleted: 12 }, // Completed course
    { totalLectures: 18, lectureCompleted: 7 },
  ];

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
      // setProgressArray(tempProgressArray);
      setProgressArray(dummyProgressArray);
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
    getCourseProgress();
  }, [enrolledCourses]);
  return enrolledCourses ? (
    <div>
      <div className="md:px-36 px-8 pt-10 mb-20">
        <h1
          className={`text-2xl font-semibold ${
            theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
          }`}
        >
          My Enrollments
        </h1>
        <div
          className={`flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md border shadow-md mt-5 ${
            theme === 'light'
              ? 'border-light-purple bg-gradient-to-t from-light-sky-07 to-light-sky-40'
              : 'border-dark-dGray bg-gradient-to-t from-dark-gold-001 to-dark-gold-35'
          }`}
        >
          <table className="md:table-auto table-fixed w-full overflow-hidden ">
            <thead
              className={`border-b text-sm text-left bg-gray-500/10 max-sm:hidden ${
                theme === 'light'
                  ? 'text-light-black border-light-sky-20'
                  : 'text-dark-white border-dark-gold-35'
              }`}
            >
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
            <tbody
              className={`${
                theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
              }`}
            >
              {enrolledCourses?.map((course, i) => (
                <tr
                  key={i}
                  className={`border-b ${
                    theme === 'light'
                      ? 'border-light-sky-07'
                      : 'border-dark-gold-15'
                  }`}
                >
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                    <img
                      src={course.courseThumbnail}
                      alt="course_thumbnail"
                      className="w-14 sm:w-24 md:w-28"
                    />
                    <div className="flex-1">
                      <p className="mb-1 max-sm:text-sm">
                        {course.courseTitle}
                      </p>
                      <Line
                        percent={
                          progressArray[i]
                            ? (progressArray[i].lectureCompleted /
                                progressArray[i].totalLectures) *
                              100
                            : 0
                        }
                        strokeWidth={2}
                        trailWidth={2}
                        strokeColor={`${
                          theme === 'light' ? '#4F46E5' : '#FBBF24'
                        }`}
                        trailColor="#D1D5DB"
                        className="rounded-full"
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
                      className={`w-max rounded my-4 px-3 sm:px-5 py-1.5 sm:py-2 max-sm:text-xs
                        ${theme === 'light' ? 'btn-light' : 'btn-dark'}
                        `}
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
      </div>
      <Footer />
    </div>
  ) : (
    <Loading />
  );
}

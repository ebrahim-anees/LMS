import React, { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../section/Loading';
import Rating from '../../section/Rating';
import { assets } from '../../assets';
import Footer from '../../components/student/Footer';
import YouTube from 'react-youtube';
import CourseContentCard from '../../section/CourseContentCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import clsx from 'clsx';
export default function CourseDetails() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const {
    calcCourseDuration,
    calcNumOfLectures,
    currency,
    calcRating,
    serverUrl,
    userData,
    getToken,
    theme,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/course/${id}`);
      if (data.success) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const enrollCourse = async () => {
    try {
      if (!userData) {
        return toast.warn('Login to Enroll');
      }
      if (isAlreadyEnrolled) {
        return toast.warn('Already Enrolled');
      }
      const token = await getToken();
      const { data } = await axios.post(
        `${serverUrl}/user/purchase`,
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        const { session_url } = data;
        window.location.replace(session_url);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [id]);
  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData]);

  const handlePlayerData = (videoId) => {
    if (videoId) {
      setPlayerData({ videoId });
    }
  };
  const sectionClass = clsx(
    'absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b',
    {
      'from-light-sky-20 to-light-sky-02': theme === 'light',
      'from-dark-gold-35 to-dark-gold-001': theme === 'dark',
    }
  );

  return courseData ? (
    <>
      <div className="flex items-center md:flex-row md:items-start flex-col-reverse gap-10 relative justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
        <div className={sectionClass}></div>

        <div className="max-w-xl z-10 text-gray-500">
          <h1
            className={`md:text-course-details-heading-large text-course-details-heading-small font-semibold ${
              theme === 'light' ? 'text-light-purple' : 'text-dark-white'
            }`}
          >
            {courseData.courseTitle}
          </h1>
          <p
            className={`pt-4 md:text-base text-sm ${
              theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
            }`}
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200) + '...',
            }}
          />
          <Rating course={courseData} isCourseDetails={true} />
          <p
            className={`text-sm ${
              theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
            }`}
          >
            Course by{' '}
            <span
              className={`${
                theme === 'light' ? 'text-light-purple' : 'text-dark-blue'
              } underline`}
            >
              {courseData.educator.name}
            </span>
          </p>
          <div className="pt-8 text-gray-800">
            <h2
              className={`${
                theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
              } text-xl font-semibold`}
            >
              Course Structure
            </h2>
            <CourseContentCard
              courseData={courseData}
              handlePlayerData={handlePlayerData}
            />
          </div>
          <div className="py-20 text-sm md:text-default">
            <h3
              className={`${
                theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
              } text-xl font-semibold`}
            >
              Course Description
            </h3>
            <div
              className={`${
                theme === 'light' ? 'text-light-dGray' : 'text-dark-white'
              }`}
            >
              <div
                className="pt-3 rich-text"
                dangerouslySetInnerHTML={{
                  __html: courseData.courseDescription,
                }}
              />
            </div>
          </div>
        </div>

        <div
          className={`max-w-course-card z-10 overflow-hidden min-w-[33px] sm:min-w-[420px] border-[1px] transition-all duration-300 rounded-b-lg
          ${
            theme === 'light'
              ? 'text-dark-dGray gradient-light'
              : 'text-dark-gray gradient-dark'
          }
          `}
        >
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img
              src={courseData.courseThumbnail}
              alt="course_thumbnail"
              className="w-full"
            />
          )}
          <div className="p-5">
            <div className="flex items-center gap-2">
              <img
                src={
                  theme === 'light'
                    ? assets.light_time_left_clock_icon
                    : assets.dark_time_left_clock_icon
                }
                alt="clock_icon"
                className="w-3.5"
              />
              <p
                className={`font-medium ${
                  theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
                }`}
              >
                <span className="font-extrabold">5 days</span> left at this
                price!
              </p>
            </div>
            <div className="flex gap-3 items-center pt-2">
              <p
                className={`md:text-4xl text-2xl font-semibold ${
                  theme === 'light' ? 'text-light-black' : 'text-dark-white'
                }`}
              >
                {currency}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p
                className={`line-through md:text-lg 
                ${theme === 'light' ? 'text-light-sky' : 'text-dark-blue/40'}`}
              >
                {currency}
                {courseData.coursePrice}
              </p>
              <p
                className={`${
                  theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
                } md:text-lg`}
              >
                {courseData.discount}%off
              </p>
            </div>
            <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img
                  src={theme === 'light' ? assets.light_star : assets.dark_star}
                  alt="star_icon"
                />
                <p
                  className={`${
                    theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
                  }`}
                >
                  {calcRating(courseData)}
                </p>
              </div>
              <span className="h-4 w-px bg-gray-500/40" />
              <div className="flex items-center gap-1">
                <img
                  src={
                    theme === 'light'
                      ? assets.light_time_clock_icon
                      : assets.dark_time_clock_icon
                  }
                  alt="clock_icon"
                />
                <p
                  className={`${
                    theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
                  }`}
                >
                  {calcCourseDuration(courseData)}
                </p>
              </div>
              <span className="h-4 w-px bg-gray-500/40" />
              <div className="flex items-center gap-1">
                <img
                  src={
                    theme === 'light'
                      ? assets.light_lesson_icon
                      : assets.dark_lesson_icon
                  }
                  alt="lesson_icon"
                />
                <p
                  className={`${
                    theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
                  }`}
                >
                  {calcNumOfLectures(courseData)} lessons
                </p>
              </div>
            </div>
            <button
              onClick={enrollCourse}
              className={`w-full ${
                theme === 'light' ? 'btn-light' : 'btn-dark'
              } md:mt-6 mt-4 py-3 rounded font-medium transition-all duration-300`}
            >
              {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
            </button>
            <div className="pt-6">
              <p
                className={`md:text-xl text-lg font-medium ${
                  theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
                }`}
              >
                What's in the course?
              </p>
              <ul
                className={`ml-4 pt-2 text-sm md:text-default list-disc ${
                  theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
                }`}
              >
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Unlimited access to all future updates.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
}

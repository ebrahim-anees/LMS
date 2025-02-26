import { createContext, useState, useEffect } from 'react';
import { dummyCourses } from '../assets';
import humanizeDuration from 'humanize-duration';

export const AppContext = createContext();
export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [courses, setCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const fetchCourses = () => {
    setCourses(dummyCourses);
  };
  const calcRating = (course) => {
    if (course.courseRatings.length === 0) return 0;
    let totalRating = 0;
    course.courseRatings.forEach((rating) => (totalRating += rating.rating));
    return (totalRating / course.courseRatings.length).toFixed(1);
  };
  const calcDuration = (duration) => {
    return humanizeDuration(duration * 60 * 1000, { units: ['h', 'm'] });
  };
  const calcChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.forEach(
      (lecture) => (time += lecture.lectureDuration)
    );
    return calcDuration(time);
  };
  const calcCourseDuration = (course) => {
    let time = 0;
    course.courseContent.forEach((chapter) =>
      chapter.chapterContent.forEach(
        (lecture) => (time += lecture.lectureDuration)
      )
    );
    return calcDuration(time);
  };
  const calcNumOfLectures = (course) => {
    let lectures = 0;
    course.courseContent.forEach(
      (chapter) => (lectures += chapter.chapterContent.length)
    );
    return lectures;
  };
  const fetchEnrolledCourses = () => {
    setEnrolledCourses(dummyCourses);
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrolledCourses();
  }, []);

  const value = {
    currency,
    courses,
    calcRating,
    isEducator,
    calcChapterTime,
    calcCourseDuration,
    calcNumOfLectures,
    calcDuration,
    enrolledCourses,
    fetchEnrolledCourses,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

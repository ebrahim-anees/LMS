import { createContext, useState, useEffect } from 'react';
import humanizeDuration from 'humanize-duration';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();
export const AppContextProvider = (props) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const currency = import.meta.env.VITE_CURRENCY;
  const [courses, setCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const { getToken } = useAuth();
  const { user } = useUser();

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/course/all`);
      if (data.success) {
        setCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const fetchUserData = async () => {
    if (user.publicMetadata.role === 'educator') {
      setIsEducator(true);
    }
    try {
      const token = await getToken();
      const { data } = await axios.get(`${serverUrl}/user/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const calcRating = (course) => {
    if (course.courseRatings.length === 0) return 0;
    let totalRating = 0;
    course.courseRatings.forEach((rating) => (totalRating += rating.rating));
    return Math.floor(totalRating / course.courseRatings.length);
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
  const fetchEnrolledCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${serverUrl}/user/enrolled-courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setEnrolledCourses(data.enrolledCourses.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const toggleTheme = () => {
    const newMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(newMode);
    localStorage.setItem('theme', newMode);
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchEnrolledCourses();
    }
  }, [user]);

  const value = {
    currency,
    courses,
    calcRating,
    isEducator,
    setIsEducator,
    calcChapterTime,
    calcCourseDuration,
    calcNumOfLectures,
    calcDuration,
    enrolledCourses,
    fetchEnrolledCourses,
    serverUrl,
    userData,
    setUserData,
    getToken,
    fetchCourses,
    theme,
    toggleTheme,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

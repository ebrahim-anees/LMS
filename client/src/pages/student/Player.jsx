import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import YouTube from 'react-youtube';
import CourseContentCard from '../../section/CourseContentCard';
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';
import Loading from './../../section/Loading';

export default function Player() {
  const {
    enrolledCourses,
    calcChapterTime,
    fetchEnrolledCourses,
    serverUrl,
    userData,
    getToken,
  } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course);
        course.courseRatings.map((item) => {
          if (item.userId === userData._id) {
            setInitialRating(item.rating);
          }
        });
      }
    });
  };

  const markLectureAsCompleted = async (lectureId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${serverUrl}/user/update-course-progress`,
        { courseId, lectureId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${serverUrl}/user/get-course-progress`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setProgressData(data.progressData);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRate = async (rating) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${serverUrl}/user/add-rating`,
        { courseId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        fetchEnrolledCourses();
        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePlayerData = (lecture, index, i) => {
    setPlayerData({
      ...lecture,
      chapter: index + 1,
      lecture: i + 1,
    });
  };

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
  }, [courseId, enrolledCourses]);

  useEffect(() => {
    getCourseProgress();
  }, []);
  return courseData ? (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>

          <CourseContentCard
            courseData={courseData}
            isPlayer={true}
            handlePlayerData={handlePlayerData}
            progressData={progressData}
            playerData={playerData}
          />
          <div className="flex items-center gap-2 py-3 mt-10">
            <h3 className="text-xl font-bold">Rate this Course:</h3>
            <Rating 
              initialRating={initialRating} 
              onRate={handleRate} 
            />
          </div>
        </div>
        <div className="md:mt-10">
          {playerData?.lectureUrl ? (
            <div>
              <YouTube
                videoId={playerData.lectureUrl.split('/').pop()}
                iframeClassName="w-full aspect-video"
              />
              <div className="flex justify-between items-center mt-1">
                <p>
                  {playerData.chapter}.{playerData.lecture}{' '}
                  {playerData.lectureTitle}
                </p>
                <button
                  onClick={() => markLectureAsCompleted(playerData.lectureId)}
                  className="text-blue-600"
                >
                  {progressData?.lectureCompleted.includes(playerData.lectureId)
                    ? 'Completed'
                    : 'Mark Complete'}
                </button>
              </div>
            </div>
          ) : (
            <img src={courseData?.courseThumbnail} alt="course_thumbnail" />
          )}
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
}

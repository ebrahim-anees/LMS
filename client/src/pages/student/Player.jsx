import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import CourseContentCard from '../../section/CourseContentCard';
import YouTube from 'react-youtube';
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';

export default function Player() {
  const { enrolledCourses } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const course = enrolledCourses.find((course) => course._id === courseId);
    setCourseData(course);
  }, [courseId, enrolledCourses]);

  const handlePlayerData = (lecture, index, i) => {
    setPlayerData({
      ...lecture,
      chapter: index + 1,
      lecture: i + 1,
    });
  };
  return (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>

          <CourseContentCard
            courseData={courseData}
            isPlayer={true}
            handlePlayerData={handlePlayerData}
          />
          <div className="flex items-center gap-2 py-3 mt-10">
            <h3 className="text-xl font-bold">Rate this Course:</h3>
            <Rating initialRating={0} />
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
                <button className="text-blue-600">
                  {false ? 'Completed' : 'Mark Complete'}
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
  );
}

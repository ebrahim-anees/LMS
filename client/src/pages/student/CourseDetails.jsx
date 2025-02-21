import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import Rating from '../../section/Rating';
import { assets } from '../../assets';
export default function CourseDetails() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState('');
  const [openSections, setOpenSections] = useState({});
  const {
    courses,
    calcChapterTime,
    calcCourseDuration,
    calcNumOfLectures,
    calcDuration,
  } = useContext(AppContext);
  useEffect(() => {
    if (courses?.length > 0)
      setCourseData(courses.find((course) => course._id === id));
  }, [id, courses]);
  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  return courseData ? (
    <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
      <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70"></div>

      <div className="max-w-xl z-10 text-gray-500">
        <h1 className="md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800">
          {courseData.courseTitle}
        </h1>
        <p
          className="pt-4 md:text-base text-sm"
          dangerouslySetInnerHTML={{
            __html: courseData.courseDescription.slice(0, 200) + '...',
          }}
        ></p>
        <Rating course={courseData} isCourseDetails={true} />
        <p className="text-sm">
          Course by{' '}
          <span className="text-blue-600 underline">
            {courseData?.educator?.name || 'unknown'}
          </span>
        </p>
        <div className="pt-8 text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>
          <div className="pt-5">
            {courseData.courseContent.map((chapter, i) => (
              <div
                key={i}
                className="border border-gray-300 bg-white mb-2 rounded"
              >
                <div className="flex items-center justify-between px-4 py-3 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <img src={assets.down_arrow_icon} alt="arrow_icon" />
                    <p className="text-sm font-medium md:text-base">
                      {chapter.chapterTitle}
                    </p>
                  </div>
                  <p className="text-sm md:text-default">
                    {chapter.chapterContent.length} lectures -{' '}
                    {calcChapterTime(chapter)}
                  </p>
                </div>
                <div className="overflow-hidden transition-all duration-300 max-h-96">
                  <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className="flex items-start gap-2 py-1">
                        <img
                          src={assets.play_icon}
                          alt="play_icon"
                          className="w-4 h-4 mt-1"
                        />
                        <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                          <p>{lecture.lectureTitle}</p>
                          <div className="flex gap-2">
                            {lecture.isPreviewFree && (
                              <p className="text-blue-500 cursor-pointer">
                                Preview
                              </p>
                            )}
                            <p>{calcDuration(lecture.lectureDuration)}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div></div>
    </div>
  ) : (
    <Loading />
  );
}

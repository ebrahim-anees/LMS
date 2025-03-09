import { useState } from 'react';
import { assets } from '../assets';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

export default function CourseContentCard({
  courseData,
  handlePlayerData,
  isPlayer = false,
  progressData,
  playerData,
}) {
  const { calcChapterTime, calcDuration } = useContext(AppContext);
  const [openSections, setOpenSections] = useState({});
  const navigate = useNavigate();
  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  console.log(isPlayer);
  const lecturesClass = (index) =>
    clsx(
      'overflow-hidden transition-all duration-300',
      openSections[index] ? 'max-h-96' : 'max-h-0'
    );
  const arrowClass = (index) =>
    clsx(
      'transition-all duration-300',
      openSections[index] ? '' : '-rotate-90'
    );
  const lectureState = (lecture) => {
    return isPlayer ? lecture.lectureUrl : lecture.isPreviewFree;
  };
  return (
    courseData && (
      <div className="pt-5">
        {courseData.courseContent.map((chapter, index) => (
          <div
            key={index}
            className="border border-gray-300 bg-white mb-2 rounded"
          >
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
              onClick={() => toggleSection(index)}
            >
              <div className="flex items-center gap-2">
                <img
                  src={assets.down_arrow_icon}
                  alt="arrow_icon"
                  className={arrowClass(index)}
                />
                <p className="text-sm font-medium md:text-base">
                  {chapter.chapterTitle}
                </p>
              </div>
              <p className="text-sm md:text-default">
                {chapter.chapterContent.length} lectures -{' '}
                {calcChapterTime(chapter)}
              </p>
            </div>
            <div className={lecturesClass(index)}>
              <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                {chapter.chapterContent.map((lecture, i) => (
                  <li key={i} className="flex items-start gap-2 py-1">
                    <img
                      src={
                        !isPlayer
                          ? assets.play_icon
                          : progressData?.lectureCompleted.includes(
                              lecture?.lectureId
                            )
                          ? assets.blue_tick_icon
                          : assets.play_icon
                      }
                      alt="play_icon"
                      className="w-4 h-4 mt-1"
                    />
                    <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                      <p>{lecture.lectureTitle}</p>
                      <div className="flex gap-2">
                        {lectureState(lecture) && (
                          <p
                            className="text-blue-500 cursor-pointer"
                            onClick={() => {
                              if (isPlayer) {
                                handlePlayerData(lecture, index, i);
                              } else {
                                handlePlayerData(
                                  lecture.lectureUrl.split('/').pop()
                                );
                              }
                            }}
                          >
                            {isPlayer ? 'Watch' : 'Preview'}
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
    )
  );
}

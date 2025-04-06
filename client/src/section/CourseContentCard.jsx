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
}) {
  const { calcChapterTime, calcDuration, theme } = useContext(AppContext);
  const [openSections, setOpenSections] = useState({});
  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };
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
            className={`border-[1px] bg-gradient-to-r ${
              theme === 'light'
                ? 'text-dark-dGray border-light-purple/20 from-light-white via-light-purple/5 to-light-purple/10 hover:shadow-[0_4px_15px_rgba(79,70,229,0.15)]'
                : 'text-dark-gray border-dark-blue/30 bg-gradient-to-r from-[rgba(59,130,246,0.02)] via-[rgba(59,130,246,0.08)] to-[rgba(59,130,246,0.12)] hover:shadow-[0_4px_15px_rgba(59,130,246,0.2)]'
            } mb-5 rounded-lg transition-all duration-300`}
          >
            <div
              className={`flex items-center justify-between px-4 py-3 cursor-pointer select-none`}
              onClick={() => toggleSection(index)}
            >
              <div className="flex items-center gap-2">
                <img
                  src={
                    theme === 'light'
                      ? assets.light_down_arrow_icon
                      : assets.dark_down_arrow_icon
                  }
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
            <div
              className={`${lecturesClass(index)} ${
                theme === 'light'
                  ? 'bg-light-purple/5 rounded-b-lg shadow-inner'
                  : 'bg-dark-blue/5 rounded-b-lg shadow-inner'
              }`}
            >
              <ul
                className={`list-disc md:pl-10 pl-4 pr-4 py-2 border-t ${
                  theme === 'light'
                    ? 'border-light-purple/20'
                    : 'border-dark-blue/20'
                }`}
              >
                {chapter.chapterContent.map((lecture, i) => (
                  <li key={i} className="flex items-start gap-2 py-1">
                    <img
                      src={
                        !isPlayer
                          ? theme === 'light'
                            ? assets.light_play_icon
                            : assets.dark_play_icon
                          : progressData?.lectureCompleted.includes(
                              lecture?.lectureId
                            )
                          ? theme === 'light'
                            ? assets.light_blue_tick_icon
                            : assets.dark_blue_tick_icon
                          : theme === 'light'
                          ? assets.light_play_icon
                          : assets.dark_play_icon
                      }
                      alt="play_icon"
                      className="w-4 h-4 mt-1"
                    />
                    <div
                      className={`flex items-center justify-between w-full ${
                        theme === 'light'
                          ? 'text-light-dGray'
                          : 'text-dark-gray'
                      } text-xs md:text-default`}
                    >
                      <p>{lecture.lectureTitle}</p>
                      <div className="flex gap-2">
                        {lectureState(lecture) && (
                          <p
                            className={`cursor-pointer ${
                              theme === 'light'
                                ? 'text-light-purple'
                                : 'text-dark-blue'
                            }`}
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

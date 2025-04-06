import { useContext } from 'react';
import { assets } from '../../../../assets';
import { AppContext } from '../../../../context/AppContext';

export default function Popup({
  lectureDetails,
  setLectureDetails,
  setShowPopup,
  addLecture,
  chapters,
  setChapters,
  currentChapterId,
}) {
  const { theme } = useContext(AppContext);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div
        className={`border rounded-lg p-4 relative w-full max-w-80  ${
          theme === 'light'
            ? 'border-light-purple/50 text-light-black bg-light-white'
            : 'border-dark-gold/50 text-dark-white bg-dark-black'
        }`}
      >
        <h2
          className={`text-lg font-semibold mb-4 ${
            theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
          }`}
        >
          Add Lecture
        </h2>
        <div className="mb-2">
          <p>Lecture Title</p>
          <div
            className={`bg-gradient-to-r w-full px-2 py-1 rounded border mt-1 block
          ${
            theme === 'light'
              ? 'text-light-purple gradient-light'
              : 'text-dark-gold gradient-dark'
          }
          `}
          >
            <input
              type="text"
              className="w-[100%] bg-transparent outline-none"
              placeholder="Lecture Title"
              value={lectureDetails.lectureTitle}
              onChange={(e) =>
                setLectureDetails({
                  ...lectureDetails,
                  lectureTitle: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="mb-2">
          <p>Duration (minutes)</p>
          <div
            className={`bg-gradient-to-r w-full px-2 py-1 rounded border mt-1 block
          ${
            theme === 'light'
              ? 'text-light-purple gradient-light'
              : 'text-dark-gold gradient-dark'
          }
          `}
          >
            <input
              type="number"
              className="w-[100%] bg-transparent outline-none"
              placeholder="Lecture Duration"
              value={lectureDetails.lectureDuration}
              onChange={(e) =>
                setLectureDetails({
                  ...lectureDetails,
                  lectureDuration: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="mb-2">
          <p>Lecture URL</p>
          <div
            className={`bg-gradient-to-r w-full px-2 py-1 rounded border mt-1 block
          ${
            theme === 'light'
              ? 'text-light-purple gradient-light'
              : 'text-dark-gold gradient-dark'
          }
          `}
          >
            <input
              type="text"
              className="w-[100%] bg-transparent outline-none"
              placeholder="Lecture URL"
              value={lectureDetails.lectureUrl}
              onChange={(e) =>
                setLectureDetails({
                  ...lectureDetails,
                  lectureUrl: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex gap-2 my-4">
          <p>Is Preview Free?</p>
          <input
            type="checkbox"
            className="scale-125 mt-1 cursor-pointer"
            checked={lectureDetails.isPreviewFree}
            onChange={(e) =>
              setLectureDetails({
                ...lectureDetails,
                isPreviewFree: e.target.checked,
              })
            }
          />
        </div>
        <button
          type="button"
          className={`w-full px-4 py-2 rounded ${
            theme === 'light'
              ? 'bg-gradient-to-r from-light-purple/35 via-light-purple to-light-purple/35 hover:from-light-purple hover:to-light-purple text-light-white'
              : 'bg-gradient-to-r from-dark-gold/35 via-dark-gold to-dark-gold/35 hover:from-dark-gold hover:to-dark-gold text-dark-black'
          }`}
          onClick={() =>
            addLecture(
              chapters,
              setChapters,
              currentChapterId,
              lectureDetails,
              setLectureDetails,
              setShowPopup
            )
          }
        >
          Add
        </button>
        <img
          src={
            theme === 'light' ? assets.light_cross_icon : assets.dark_cross_icon
          }
          alt="close_icon"
          className="absolute top-4 right-4 w-4 cursor-pointer"
          onClick={() => setShowPopup(false)}
        />
      </div>
    </div>
  );
}

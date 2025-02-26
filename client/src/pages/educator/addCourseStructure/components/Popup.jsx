import { assets } from '../../../../assets';

export default function Popup({
  lectureDetails,
  setLectureDetails,
  setShowPopup,
  addLecture,
  chapters,
  setChapters,
  currentChapterId,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white text-gray-700 p-4 rounded relative w-full max-w-80">
        <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>
        <div className="mb-2">
          <p>Lecture Title</p>
          <input
            type="text"
            className="w-full px-2 py-1 rounded border mt-1 block"
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
        <div className="mb-2">
          <p>Duration (minutes)</p>
          <input
            type="number"
            className="w-full px-2 py-1 rounded border mt-1 block"
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
        <div className="mb-2">
          <p>Lecture URL</p>
          <input
            type="text"
            className="w-full px-2 py-1 rounded border mt-1 block"
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
        <div className="flex gap-2 my-4">
          <p>Is Preview Free?</p>
          <input
            type="checkbox"
            className="scale-125 mt-1"
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
          className="w-full bg-blue-400 text-white px-4 py-2 rounded"
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
          src={assets.cross_icon}
          alt="close_icon"
          className="absolute top-4 right-4 w-4 cursor-pointer"
          onClick={() => setShowPopup(false)}
        />
      </div>
    </div>
  );
}

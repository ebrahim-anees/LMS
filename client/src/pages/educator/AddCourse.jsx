import { useState, useEffect, useRef, useContext } from 'react';
import Quill from 'quill';
import { assets } from '../../assets';
import clsx from 'clsx';
import {
  handleChapter,
  handleLecture,
  addLecture,
} from './addCourseStructure/functions';
import Popup from './addCourseStructure/components/Popup';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function AddCourse() {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const { serverUrl, getToken, theme } = useContext(AppContext);

  const [courseTitle, setCourseTitle] = useState(''),
    [coursePrice, setCoursePrice] = useState(0),
    [discount, setDiscount] = useState(0),
    [image, setImage] = useState(null),
    [chapters, setChapters] = useState([]),
    [showPopup, setShowPopup] = useState(false),
    [currentChapterId, setCurrentChapterId] = useState(null),
    [lectureDetails, setLectureDetails] = useState({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!image) {
        toast.error('Thumbnail not selected');
      }

      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
      };

      const formData = new FormData();
      formData.append('courseData', JSON.stringify(courseData));
      formData.append('image', image);

      const token = await getToken();
      const { data } = await axios.post(
        `${serverUrl}/educator/add-course`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        setCourseTitle('');
        setCoursePrice(0);
        setDiscount(0);
        setImage(null);
        setChapters([]);
        quillRef.current.root.innerHTML = '';
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);
  // useEffect(() => {
  //   if (editorRef.current) {
  //     editorRef.current.classList.remove(
  //       'text-light-purple',
  //       'gradient-light',
  //       'text-dark-gold',
  //       'gradient-dark'
  //     );

  //     if (theme === 'light') {
  //       editorRef.current.classList.add('text-light-purple', 'gradient-light');
  //     } else {
  //       editorRef.current.classList.add('text-dark-gold', 'gradient-dark');
  //     }
  //   }
  // }, [theme, editorRef]);
  const dropdownClass = (chapter) =>
    clsx('mr-2 cursor-pointer transition-all', {
      '-rotate-90': chapter.collapsed,
    });
  const labelColor = clsx(
    theme === 'light' ? 'text-light-purple' : 'text-dark-gold',
    'font-medium'
  );
  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <form
        className="flex flex-col gap-4 max-w-md w-full text-gray-500"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col gap-2">
          <p className={labelColor}>Course Title</p>
          <div
            className={`border bg-gradient-to-r rounded-md md:py-2.5 py-2 px-3
            ${
              theme === 'light'
                ? 'text-light-purple gradient-light'
                : 'text-dark-gold gradient-dark'
            }
            `}
          >
            <input
              type="text"
              onChange={(e) => setCourseTitle(e.target.value)}
              value={courseTitle}
              placeholder="Type here"
              className={`outline-none w-[100%] bg-transparent`}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className={labelColor}>Course Description</p>
          <div
            className={`flex flex-col quill-wrapper ${
              theme === 'light' ? 'quill-light' : 'quill-dark'
            }`}
          >
            <div ref={editorRef}></div>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col gap-2">
            <p className={labelColor}>Course Price</p>
            <div
              className={`border bg-gradient-to-r rounded-md md:py-2.5 py-2 px-3 w-28
          ${
            theme === 'light'
              ? 'text-light-purple gradient-light'
              : 'text-dark-gold gradient-dark'
          }
          `}
            >
              <input
                type="number"
                onChange={(e) => setCoursePrice(e.target.value)}
                value={coursePrice}
                placeholder={coursePrice}
                className={`w-[100%] bg-transparent outline-none`}
                required
                min={0}
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-col items-center gap-3">
            <p className={labelColor}>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className="flex items-center gap-3">
              <img
                src={assets.file_upload_icon}
                alt="file-upload-icon"
                className={`p-3 rounded cursor-pointer duration-500 ${
                  theme === 'light'
                    ? 'bg-light-purple/85 hover:bg-light-purple active:bg-light-purple/80 active:shadow-light-active'
                    : 'bg-dark-gold/85 hover:bg-dark-gold active:bg-dark-gold/80 active:shadow-dark-active'
                }`}
              />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              <img
                src={image ? URL.createObjectURL(image) : '_'}
                alt=""
                className="max-h-10"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className={labelColor}>Discount %</p>
          <div
            className={`border bg-gradient-to-r rounded-md md:py-2.5 py-2 w-28 px-3
          ${
            theme === 'light'
              ? 'text-light-purple gradient-light'
              : 'text-dark-gold gradient-dark'
          }
          `}
          >
            <input
              type="number"
              placeholder={discount}
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
              min={0}
              max={100}
              className={`w-[100%] bg-transparent outline-none`}
              required
            />
          </div>
        </div>
        <div>
          {chapters.map((chapter, chIndex) => (
            <div
              key={chIndex}
              className={`bg-gradient-to-t border rounded-lg mb-4  ${
                theme === 'light'
                  ? 'border-light-purple/20 from-light-sky-07 to-light-sky-40 text-light-black'
                  : 'border-dark-blue/30 from-dark-gold-001 to-dark-gold-35 text-dark-white'
              }`}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                  <img
                    src={
                      theme === 'light'
                        ? assets.light_dropdown_icon
                        : assets.dark_dropdown_icon
                    }
                    alt="dropdown_icon"
                    width={14}
                    className={`${dropdownClass(chapter)} ${
                      theme === 'light'
                        ? 'stroke-light-purple'
                        : 'stroke-dark-gold'
                    }`}
                    onClick={() =>
                      handleChapter(
                        'toggle',
                        chapters,
                        setChapters,
                        chapter.chapterId
                      )
                    }
                  />
                  <span className="font-semibold">
                    {chIndex + 1} {chapter.chapterTitle}
                  </span>
                </div>
                <span>{chapter.chapterContent.length} lectures</span>
                <img
                  src={
                    theme === 'light'
                      ? assets.light_cross_icon
                      : assets.dark_cross_icon
                  }
                  alt="delete_icon"
                  className="cursor-pointer"
                  onClick={() =>
                    handleChapter(
                      'remove',
                      chapters,
                      setChapters,
                      chapter.chapterId
                    )
                  }
                />
              </div>
              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lecture, lecIndex) => (
                    <div
                      key={lecIndex}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {lecIndex + 1} {lecture.lectureTitle} -{' '}
                        {lecture.lectureDetails} mins -{' '}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          className={`${
                            theme === 'light'
                              ? 'text-light-purple'
                              : 'text-dark-blue'
                          }`}
                        >
                          Link
                        </a>{' '}
                        - {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                      </span>
                      <img
                        src={
                          theme === 'light'
                            ? assets.light_cross_icon
                            : assets.dark_cross_icon
                        }
                        alt="delete_icon"
                        className="cursor-pointer"
                        onClick={() =>
                          handleLecture(
                            'remove',
                            chapters,
                            setChapters,
                            setCurrentChapterId,
                            setShowPopup,
                            chapter.chapterId,
                            lecIndex
                          )
                        }
                      />
                    </div>
                  ))}
                  <div
                    className={`inline-flex p-2 mt-2 rounded cursor-pointer
                      ${theme === 'light' ? 'btn-light' : 'btn-dark'}
                      `}
                    onClick={() =>
                      handleLecture(
                        'add',
                        chapters,
                        setChapters,
                        setCurrentChapterId,
                        setShowPopup,
                        chapter.chapterId
                      )
                    }
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            className={`flex justify-center items-center p-2 rounded-lg cursor-pointer transition-all duration-500 ${
              theme === 'light'
                ? 'bg-gradient-to-r from-light-purple/35 via-light-purple to-light-purple/35 hover:from-light-purple hover:to-light-purple text-light-white'
                : 'bg-gradient-to-r from-dark-gold/35 via-dark-gold to-dark-gold/35 hover:from-dark-gold hover:to-dark-gold text-dark-black'
            }`}
            onClick={() => handleChapter('add', chapters, setChapters)}
          >
            + Add Chapter
          </div>
          {showPopup && (
            <Popup
              lectureDetails={lectureDetails}
              setLectureDetails={setLectureDetails}
              setShowPopup={setShowPopup}
              addLecture={addLecture}
              chapters={chapters}
              setChapters={setChapters}
              currentChapterId={currentChapterId}
            />
          )}
        </div>
        <button
          type="submit"
          className={`w-max py-2.5 px-8 rounded my-4
            ${theme === 'light' ? 'btn-light' : 'btn-dark'}
            `}
        >
          Add
        </button>
      </form>
    </div>
  );
}

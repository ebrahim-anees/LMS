import uniqid from 'uniqid';
const handleChapter = (action, chapters, setChapters, chapterId) => {
  if (action === 'add') {
    const title = prompt('Enter Chapter Name:');
    if (title) {
      const newChapter = {
        chapterId: uniqid(),
        chapterTitle: title,
        chapterContent: [],
        collapsed: false,
        chapterOrder:
          chapters.length > 0
            ? chapters[chapters.length - 1].chapterOrder + 1
            : 1,
      };
      setChapters([...chapters, newChapter]);
    }
  } else if (action === 'remove') {
    const updatedChapters = chapters.filter(
      (chapter) => chapter.chapterId !== chapterId
    );
    setChapters(updatedChapters);
  } else if (action === 'toggle') {
    const updatedChapters = chapters.map((chapter) =>
      chapter.chapterId === chapterId
        ? { ...chapter, collapsed: !chapter.collapsed }
        : chapter
    );
    setChapters(updatedChapters);
  }
};
const handleLecture = (
  action,
  chapters,
  setChapters,
  setCurrentChapterId,
  setShowPopup,
  chapterId,
  lectureIndex
) => {
  if (action === 'add') {
    setCurrentChapterId(chapterId);
    setShowPopup(true);
  } else if (action === 'remove') {
    const updatedChapters = chapters.map((chapter) => {
      if (chapter.chapterId === chapterId) {
        return {
          ...chapter,
          chapterContent: chapter.chapterContent.filter(
            (_, index) => index !== lectureIndex
          ),
        };
      }
      return chapter;
    });
    setChapters(updatedChapters);
  }
};

const addLecture = (
  chapters,
  setChapters,
  currentChapterId,
  lectureDetails,
  setLectureDetails,
  setShowPopup
) => {
  const addedLecture = chapters.map((chapter) => {
    if (chapter.chapterId === currentChapterId) {
      const newLecture = {
        ...lectureDetails,
        lectureOrder:
          chapter.chapterContent.length > 0
            ? chapter.chapterContent[chapter.chapterContent.length - 1]
                .lectureOrder + 1
            : 1,
        lectureId: uniqid(),
      };
      chapter.chapterContent.push(newLecture);
    }
    return chapter;
  });
  setChapters(addedLecture);
  setShowPopup(false);
  setLectureDetails({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });
};

export { handleChapter, handleLecture, addLecture };

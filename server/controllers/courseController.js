import Course from '../models/Course.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate({
        path: 'educator',
      });
    res.json({ success: true, courses });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate({ path: 'educator' });
    course.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.isPreviewFree) lecture.lectureUrl = '';
      });
    });
    res.json({
      success: true,
      courseData: course,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

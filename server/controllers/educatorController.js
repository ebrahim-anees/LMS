import { clerkClient } from '@clerk/express';
import Course from '../models/Course.js';
import { v2 as cloudinary } from 'cloudinary';
import Purchase from '../models/Purchase.js';
import User from '../models/User.js';

export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'educator',
      },
    });
    res.json({
      success: true,
      message: 'You can publish a course now',
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    console.log('courseData: ', courseData);
    const imageFile = req.file;
    console.log('imageFile: ', imageFile);
    const educatorId = req.auth.userId;
    console.log('educatorId: ', educatorId);
    if (!imageFile) {
      return res.json({
        success: false,
        message: 'Thumbnail not attached',
      });
    }
    const parsedCourseData = await JSON.parse(courseData);
    parsedCourseData.educator = educatorId;
    const newCourse = await Course.create(parsedCourseData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();

    res.json({
      success: true,
      message: 'course added',
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    res.json({
      success: true,
      courses,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;
    const courseIds = courses.map((course) => course._id);
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: 'completed',
    });
    const totalEarnings = purchases.reduce((sum, purchase) => {
      return sum + purchase.amount;
    }, 0);
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        {
          _id: {
            $in: course.enrolledStudents,
          },
        },
        'name imageUrl'
      );
      students.forEach((student) =>
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        })
      );
    }
    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        enrolledStudentsData,
        totalCourses,
      },
    });
  } catch (err) {
    return {
      success: false,
      message: 'Error fetching educator data',
    };
  }
};

export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const courseIds = courses.map((course) => course._id);
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: 'completed',
    })
      .populate('userId', 'name imageUrl')
      .populate('courseId', 'courseTitle');
    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }));
    res.json({
      success: true,
      enrolledStudents,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

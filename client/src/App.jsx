import React from 'react';
import { Routes, Route as URL, useMatch } from 'react-router-dom';
import Home from './pages/student/Home';
import CoursesList from './pages/student/CoursesList';
import CourseDetails from './pages/student/CourseDetails';
import MyEnrollments from './pages/student/MyEnrollments';
import Player from './pages/student/Player';
import Loading from './components/student/Loading.jsx';
import Educator from './pages/educator/Educator';
import Dashboard from './pages/educator/Dashboard';
import AddCourse from './pages/educator/AddCourse';
import StudentsEnrolled from './pages/educator/StudentsEnrolled';
import Navbar from './components/student/Navbar.jsx';
export default function App() {
  const isEducatorRoute = useMatch('/educator/*');
  return (
    <div className="text-default min-h-screen bg-white">
      {!isEducatorRoute ? <Navbar /> : null}
      <Routes>
        <URL path="/" element={<Home />} />
        <URL path="course-list" element={<CoursesList />}>
          <URL path=":input" />
        </URL>
        <URL path="course/:id" element={<CourseDetails />} />
        <URL path="my-enrollments" element={<MyEnrollments />} />
        <URL path="player/:courseId" element={<Player />} />
        <URL path="loading/:path" element={<Loading />} />
        <URL path="educator" element={<Educator />}>
          <URL index element={<Dashboard />} />
          <URL path="add-course" element={<AddCourse />} />
          <URL path="student-enrolled" element={<StudentsEnrolled />} />
        </URL>
      </Routes>
    </div>
  );
}

import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../section/Loading';
import { assets, dummyStudentEnrolled } from '../../assets';
import clsx from 'clsx';

export default function StudentsEnrolled() {
  const [enrolledStudents, setEnrolledStudents] = useState(null);
  useEffect(() => {
    setEnrolledStudents(dummyStudentEnrolled);
  }, [dummyStudentEnrolled]);
  const theadClass = (i) =>
    clsx('px-4 py-3 font-semibold', {
      'hidden sm:table-cell': i === 3,
      'w-[50px]': i === 0,
    });
  return enrolledStudents ? (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
        <table className="table-fixed md:table-auto w-full overflow-hidden pb-4">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
            <tr>
              {['#', 'Student Name', 'Course Title', 'Date'].map((head, i) => (
                <th key={i} className={theadClass(i)}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm text-gray-500">
            {enrolledStudents.map((item, i) => (
              <tr key={i} className="border-b border-gray-500/20">
                <td className="px-4 py-3 text-left hidden sm:table-cell">
                  {i + 1}
                </td>
                <td className="md:px-4 py-3 flex items-center space-x-3">
                  <img
                    src={item.student.imageUrl}
                    alt="student_image"
                    className="w-9 h-9 rounded-full"
                  />
                  <span className="truncate">{item.student.name}</span>
                </td>
                <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

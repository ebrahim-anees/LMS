import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../section/Loading';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function StudentsEnrolled() {
  const { serverUrl, getToken, isEducator, theme } = useContext(AppContext);
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        `${serverUrl}/educator/enrolled-students`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents();
    }
  }, [isEducator]);
  const theadClass = (i) =>
    clsx('px-4 py-3 font-semibold', {
      'hidden sm:table-cell': i === 3,
      'w-[50px]': i === 0,
    });
  return enrolledStudents ? (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div
        className={`flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md border shadow-md ${
          theme === 'light'
            ? 'border-light-purple bg-gradient-to-t from-light-sky-07 to-light-sky-40'
            : 'border-dark-dGray bg-gradient-to-t from-dark-gold-001 to-dark-gold-35'
        }`}
      >
        <table className="table-fixed md:table-auto w-full overflow-hidden pb-4">
          <thead
            className={`border-b text-sm text-left bg-gray-500/10 ${
              theme === 'light'
                ? 'text-light-black border-light-sky-20'
                : 'text-dark-white border-dark-gold-35'
            }`}
          >
            <tr>
              <th
                className={`px-4 py-3 font-semibold ${
                  theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
                }`}
              >
                #
              </th>
              {['Student Name', 'Course Title', 'Date'].map((head, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 font-semibold ${
                    theme === 'light' ? 'text-light-black' : 'text-dark-white'
                  }`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={`text-sm ${
              theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
            }`}
          >
            {enrolledStudents.map((item, i) => (
              <tr
                key={i}
                className={`border-b ${
                  theme === 'light'
                    ? 'border-light-sky-07'
                    : 'border-dark-gold-15'
                }`}
              >
                <td
                  className={`px-4 py-3 text-left hidden sm:table-cell font-bold ${
                    theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
                  }`}
                >
                  {i + 1}
                </td>
                <td className="md:px-4 py-3 flex items-center space-x-3">
                  {console.log(item.student.imageUrl)}
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

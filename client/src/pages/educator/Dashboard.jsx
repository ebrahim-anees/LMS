import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../section/Loading.jsx';
import DashboardMiniCard from './../../section/DashboardMiniCard.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const { currency, serverUrl, isEducator, getToken, theme } =
    useContext(AppContext);

  const fetchDashboardData = async (retry = false) => {
    try {
      let token = await getToken();
      console.log(token);
      if (!token && retry) {
        token = await getToken(true);
      }
      const { data } = await axios.get(`${serverUrl}/educator/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data?.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      if (!retry && err.response?.status === 401) {
        return fetchDashboardData(true);
      }
      toast.error(err.response?.data?.message || err.message);
      console.log('2');
    }
  };
  useEffect(() => {
    if (isEducator) {
      fetchDashboardData();
    }
  }, [isEducator, getToken]);

  return dashboardData ? (
    <div
      className={`min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0 ${
        theme === 'light'
          ? 'bg-light-white text-light-black'
          : 'bg-dark-black text-dark-white'
      }`}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-5 items-center">
          <DashboardMiniCard
            icon="patients_icon"
            firstText={dashboardData.enrolledStudentsData.length}
            secondText="Total Enrollments"
          />
          <DashboardMiniCard
            icon="appointments_icon"
            firstText={dashboardData.totalCourses}
            secondText="Total Courses"
          />
          <DashboardMiniCard
            icon="earning_icon"
            firstText={`${currency} ${dashboardData.totalEarnings}`}
            secondText="Total Earning"
          />
        </div>

        <h2
          className={`pb-4 text-xl font-semibold !mt-8 ${
            theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
          }`}
        >
          Latest Enrollments
        </h2>

        <div
          className={`flex flex-col items-center max-w-4xl w-full !mt-0 overflow-hidden rounded-md border shadow-md ${
            theme === 'light'
              ? 'border-light-purple bg-gradient-to-t from-light-sky-07 to-light-sky-40'
              : 'border-dark-dGray bg-gradient-to-t from-dark-gold-001 to-dark-gold-35'
          }`}
        >
          <table className="table-fixed md:table-auto w-full overflow-hidden">
            <thead
              className={`border-b text-sm text-left bg-gray-500/10 ${
                theme === 'light'
                  ? 'text-light-black border-light-sky-20'
                  : 'text-dark-white border-dark-gold-35'
              }`}
            >
              <tr>
                <th
                  className={`px-4 py-3 font-bold text-left hidden sm:table-cell w-[50px] ${
                    theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
                  }`}
                >
                  #
                </th>
                <th className="px-4 py-3 font-semibold">Student Name</th>
                <th className="px-4 py-3 font-semibold">Course Title</th>
              </tr>
            </thead>
            <tbody
              className={`text-sm ${
                theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
              }`}
            >
              {dashboardData.enrolledStudentsData.map((item, i) => (
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
                  <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                    <img
                      src={item.student.imageUrl}
                      alt="profile"
                      className="w-9 h-9 rounded-full"
                    />
                    <span className="truncate">{item.student.name}</span>
                  </td>
                  <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

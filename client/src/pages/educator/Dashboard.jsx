import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets, dummyDashboardData } from '../../assets';
import Loading from '../../section/Loading.jsx';
import DashboardMiniCard from './../../section/DashboardMiniCard.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const { currency, serverUrl, isEducator, getToken } = useContext(AppContext);

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${serverUrl}/educator/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchDashboardData();
    }
  }, [isEducator]);
  return dashboardData ? (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
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
        <h2 className="pb-4 text-lg font-medium">Latest Enrollments</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="table-fixed md:table-auto w-full overflow-hidden">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-left hidden sm:table-cell w-[50px]">
                  #
                </th>
                <th className="px-4 py-3 font-semibold">Student Name</th>
                <th className="px-4 py-3 font-semibold">Course Title</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {dashboardData.enrolledStudentsData.map((item, i) => (
                <tr key={i} className="border-b border-gray-500/20">
                  <td className="px-4 py-3 text-left hidden sm:table-cell">
                    {i + 1}
                  </td>
                  <td className="md:px-4 px-2 py-3 flex  items-center space-x-3">
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

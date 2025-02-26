import { assets } from '../assets';
export default function DashboardMiniCard({ icon, firstText, secondText }) {
  return (
    <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
      <img src={assets[icon]} alt={icon} />
      <div>
        <p className="text-2xl font-medium text-gray-600">{firstText}</p>
        <p className="text-base text-gray-500 whitespace-nowrap">{secondText}</p>
      </div>
    </div>
  );
}

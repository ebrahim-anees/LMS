import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/educator/Navbar';
import Footer from '../../components/educator/Footer';
import Sidebar from '../../components/educator/Sidebar';
export default function Educator() {
  return (
    <div className="text-default min-h-scree">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

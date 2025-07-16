import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

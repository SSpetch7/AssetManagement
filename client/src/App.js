import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Logo } from './assets/logo.png';
import { Tooltip } from '@mui/material';
import { Navbar, Sidebar } from './components';
import './App.css';
import {
  Home,
  Admin,
  Borrower,
  BorrowHistory,
  AllAsset,
  Dashboard,
  CheckAsset,
  Login,
} from './pages/index';

import { useStateContext } from './contexts/ContextProvider';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primeicons/primeicons.css';


const App = () => {
  const { activeMenu } = useStateContext();

  return (
    <div>
      <Router>
        <div className="flex relative">
          {activeMenu ? (
            <div className="fixed w-72 labtop:w-60 h-full  sidebar bg-second-bg">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0">
              <Sidebar />
            </div>
          )}
          <div
            className={`min-h-screen w-full ${
              activeMenu
                ? '  bg-main-bg labtop:ml-60 md:ml-72 '
                : 'bg-main-bg flex-2'
            }`}
          >
            <div className="fixed md:static bg-main-bg navbar w-full">
              <Navbar />
            </div>

            <div>
              <Routes>
                {/* general user */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/allAsset" element={<AllAsset />} />
                <Route path="/checkAsset" element={<CheckAsset />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                {/* admin */}
                <Route path="/borrowHistory" element={<BorrowHistory />} />
                <Route path="/borrower" element={<Borrower />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;

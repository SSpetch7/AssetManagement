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
} from './pages/index';

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { activeMenu } = useStateContext();

  return (
    <div>
      <Router>
        <div className="flex relative">
          {activeMenu ? (
            <div className="w-80 fiexd sidebar bg-main-bg ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0">
              <Sidebar />
            </div>
          )}
          <div
            className={`min-h-screen w-full ${activeMenu ? ' ' : ' flex-2'}`}
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

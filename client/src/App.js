import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Logo } from './assets/logo.png';
import { Tooltip } from '@mui/material';
import { Navbar, Sidebar } from './components';
import './App.css';
import {
  Home,
  AllAsset,
  EachRoom,
  Addnew,
  Remove,
  Edit,
  CheckAsset,
  Rearch,
  Report,
  Dashboard,
  Borrowed,
  BorrowHistory,
  Borrower,
  Admin,
  Login,
  Register,
} from './pages/index';

import { useStateContext } from './contexts/ContextProvider';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primeicons/primeicons.css';

const App = () => {
  const { activeMenu } = useStateContext();
  const { loginOn } = useStateContext();

  return (
    <div>
      <Router>
        <div className="flex relative">
          {loginOn? (
           null 
          ) : (
            <div>
              {activeMenu ? (
            <div className="fixed  w-72 labtop:w-62 h-full  sidebar bg-second-bg">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0">
              <Sidebar />
            </div>
          )}
            </div>
          )}
          <div
            className={`min-h-screen w-full ${
              loginOn
              ? ''
              :
              activeMenu
                ? 'bg-main-bg labtop:ml-62 md:ml-72 '
                : 'bg-main-bg flex-2'
            }`}
          > {loginOn? (
            <div className="min-w-screen bg-100"></div>
           ) : (
            <div className="fixed md:static bg-main-bg navbar w-full">
              <Navbar />
            </div>
           )}

            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/asset/allAsset" element={<AllAsset />} />
                <Route path="/asset/eachRoom" element={<EachRoom />} />
                <Route path="/AssetManage/add" element={<Addnew />} />
                <Route path="/AssetManage/remove" element={<Remove />} />
                <Route path="/AssetManage/edit" element={<Edit />} />
                <Route path="/checkAsset" element={<CheckAsset />} />
                <Route path="/assetSearching" element={<Rearch />} />
                <Route path="/report" element={<Report />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/borrow/borrowAsset" element={<Borrowed />} />
                <Route
                  path="/borrow/borrowHistory"
                  element={<BorrowHistory />}
                />
                <Route path="/borrow/borrower" element={<Borrower />} />
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

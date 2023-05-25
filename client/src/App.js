import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import { Logo } from './assets/logo.png';
import { Tooltip } from '@mui/material';
import { Navbar, Sidebar } from './components';
import './App.css';
import axios from 'axios';
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
import ForgotPassword from 'pages/forgotpassword';
import ResetPassword from 'pages/resetpassword';

const Layout = ({ children }) => {
  const { activeMenu } = useStateContext();
  axios.defaults.baseURL = 'http://localhost:5000';

  return (
    <div>
      <div className="flex relative">
        {activeMenu ? (
          <div className="fixed w-72 labtop:w-62 h-full sidebar bg-second-bg">
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
              ? 'bg-main-bg labtop:ml-62 md:ml-72 '
              : 'bg-main-bg flex-2'
          }`}
        >
          <div className="fixed md:static bg-main-bg navbar w-full">
            <Navbar />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/asset/allAsset"
            element={
              <Layout>
                <AllAsset />
              </Layout>
            }
          />
          <Route
            path="/asset/eachRoom"
            element={
              <Layout>
                <EachRoom />
              </Layout>
            }
          />
          <Route
            path="/AssetManage/add"
            element={
              <Layout>
                <Addnew />
              </Layout>
            }
          />
          <Route
            path="/AssetManage/remove"
            element={
              <Layout>
                <Remove />
              </Layout>
            }
          />
          <Route
            path="/AssetManage/edit"
            element={
              <Layout>
                <Edit />
              </Layout>
            }
          />
          <Route
            path="/checkAsset"
            element={
              <Layout>
                <CheckAsset />
              </Layout>
            }
          />
          <Route
            path="/assetSearching"
            element={
              <Layout>
                <Rearch />
              </Layout>
            }
          />
          <Route
            path="/report"
            element={
              <Layout>
                <Report />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/borrow/borrowAsset"
            element={
              <Layout>
                <Borrowed />
              </Layout>
            }
          />
          <Route
            path="/borrow/borrowHistory"
            element={
              <Layout>
                <BorrowHistory />
              </Layout>
            }
          />
          <Route
            path="/borrow/borrower"
            element={
              <Layout>
                <Borrower />
              </Layout>
            }
          />
          <Route
            path="/admin"
            element={
              <Layout>
                <Admin />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ element: Element, allowedRoles, redirectPath = '/login' }) => {
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState('');

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get('http://localhost:5000')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setRole(res.data.role);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!auth) {
      return <Navigate to={redirectPath} />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      return <Navigate to={redirectPath} />;
    }
  }, [auth, role, allowedRoles, redirectPath]);

  return <Element />;
};

export default PrivateRoute;
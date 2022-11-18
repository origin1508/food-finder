import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Main = React.lazy(() => import('../pages/index'));
const Login = React.lazy(() => import('../pages/login'));
const Register = React.lazy(() => import('../pages/register'));
const NotFound = React.lazy(() => import('../components/global/NotFound'));

const CustomRouter = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default CustomRouter;

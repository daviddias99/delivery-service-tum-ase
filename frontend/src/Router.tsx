import React, { FunctionComponent, ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import routes from 'routes';

import Dashboard from 'pages/Dashboard/Dashboard';

type PrivateRouteProps = {
  children: ReactElement,
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ children }) => {

  const loggedIn = true; // Later use Redux to fetch logged in status

  return loggedIn
    ? children
    : <Navigate to="/login" />;
};

const Router = () => {

  // eslint-disable-next-line no-unused-vars
  const loggedIn = true; // Later use Redux to fetch logged in status

  return (
    <BrowserRouter>
      <Routes>

        <Route path={routes.delivery.def} />

        <Route path="/" element={<Navigate to={routes.dashboard.def} />} />

        <Route path={routes.dashboard.def} element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;

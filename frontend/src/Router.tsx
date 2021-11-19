import React, { FunctionComponent, ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import routes from 'routes';

import Dashboard from 'pages/Dashboard/Dashboard';

type PrivateRouteProps = {
  path: string
  children: ReactElement,
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ children, path }) => {

  const loggedIn = true; // Later use Redux to fetch logged in status

  return loggedIn
    ? children
    : <Navigate to="/login" />;
};

const Router = () => {

  const loggedIn = true; // Later use Redux to fetch logged in status

  return (
    <BrowserRouter>
      <Routes>

        <Route path={routes.delivery.def}/>

        <Route path="/" element={<Navigate to={routes.dashboard.def} />} />

        <Route path={routes.dashboard.def} element={
          <PrivateRoute path={routes.dashboard.def}>
            <Dashboard />
          </PrivateRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;

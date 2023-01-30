import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Users from './layouts/users';
import Login from './layouts/login';
import Main from './layouts/main';
import {ToastContainer} from 'react-toastify';
import {AuthProvider} from './hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logout';
import AppLoader from './components/ui/hoc/appLoader';

const App = () => {
  return (
    <>
      <AppLoader>
        <AuthProvider>
          <NavBar />
          <Switch>
            <Route
              path='/login/:type?'
              component={Login}
            />
            <Route
              path='/logout'
              component={LogOut}
            />
            <ProtectedRoute
              path='/users/:userId?/:edit?'
              component={Users}
            />
            <Route
              path='/'
              component={Main}
              exact
            />
            <Redirect to='/' />
          </Switch>
        </AuthProvider>
      </AppLoader>
      <ToastContainer />
    </>
  );
};
export default App;

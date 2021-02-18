import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ResetPassword from '../pages/ResetPassword';
import RecoverPassword from '../pages/RecoverPassword';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import TeacherForm from '../pages/TeacherForm';
import TeacherList from '../pages/TeacherList';

import SuccessClasses from '../pages/SuccessClasses';
import PageNotFound from '../pages/PageNotFound';
import SuccessResetPassword from '../pages/SuccessResetPassword';
import SuccessSignUp from '../pages/SuccessSignUp';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />

    <Route path="/signup-success" exact component={SuccessSignUp} />
    <Route
      path="/reset-password-success"
      exact
      component={SuccessResetPassword}
    />

    <Route path="/reset-password" exact component={ResetPassword} />
    <Route path="/recover-password/:token" exact component={RecoverPassword} />

    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/profile" exact component={Profile} isPrivate />
    <Route path="/give-classes" exact component={TeacherForm} isPrivate />
    <Route path="/study" exact component={TeacherList} isPrivate />

    <Route path="/study" exact component={TeacherList} isPrivate />

    <Route
      path="/give-classes-success"
      exact
      component={SuccessClasses}
      isPrivate
    />

    <Route component={PageNotFound} />
  </Switch>
);

export default Routes;

import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FirstOnboarding from '../pages/FirstOnboarding';
import SecondOnboarding from '../pages/SecondOnboarding';
import SignIn from '../pages/SignIn';
import SignUpName from '../pages/SignUpName';
import SignUpEmail from '../pages/SignUpEmail';
import ForgotPassword from '../pages/ForgotPassword';
import RegisterSuccess from '../pages/RegisterSuccess';
import SuccessResetPassword from '../pages/SuccessResetPassword';
import { useAuth } from '../hooks/auth';

export type AuthStackParamList = {
  FirstOnboarding: undefined;
  SecondOnboarding: undefined;
  SignIn: undefined;
  SignUpName: undefined;
  SignUpEmail: { firstName: string; lastName: string };
  RegisterSuccess: undefined;
  ForgotPassword: undefined;
  SuccessResetPassword: undefined;
};

const { Navigator, Screen } = createStackNavigator<AuthStackParamList>();

const AuthRoutes: React.FC = () => {
  const { hasVisited } = useAuth();

  return (
      <Navigator screenOptions={{ headerShown: false }}>
        {!hasVisited &&
          <> 
            <Screen name="FirstOnboarding" component={FirstOnboarding} />
            <Screen name="SecondOnboarding" component={SecondOnboarding} />
          </>
        }

        <Screen name="SignIn" component={SignIn} />

        <Screen name="SignUpName" component={SignUpName} />
        <Screen name="SignUpEmail" component={SignUpEmail} />

        <Screen name="ForgotPassword" component={ForgotPassword} />
        <Screen name="SuccessResetPassword" component={SuccessResetPassword} />

        <Screen name="RegisterSuccess" component={RegisterSuccess} />
      </Navigator>
  );
}

export default AuthRoutes;

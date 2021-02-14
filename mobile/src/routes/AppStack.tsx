import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';

import OnboardingPage from '../pages/OnboardingPage';
import Login from '../pages/Login';

import AuthContext from '../hooks/auth';

const { Navigator, Screen } = createStackNavigator();

const AppStack: React.FC = () => {
  const {signed} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {signed ?
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="Landing" component={Landing} />
          <Screen name="GiveClasses" component={GiveClasses} />
          <Screen name="Study" component={StudyTabs} />
        </Navigator>
        :
        <Navigator screenOptions={{ headerShown:false}}>
            <Screen name="Onboarding" component={OnboardingPage} />                             
            <Screen name="Login" component={Login} />                            
        </Navigator>
      }
    </NavigationContainer>
  );
};

export default AppStack;

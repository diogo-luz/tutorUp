import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import Profile from '../pages/Profile';

import StudyTabs from './StudyTabs';

const { Navigator, Screen } = createStackNavigator();

const AppRoutes: React.FC = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="Landing" component={Landing} />
    <Screen name="GiveClasses" component={GiveClasses} />
    <Screen name="Profile" component={Profile} />

    <Screen name="StudyTabs" component={StudyTabs} />
  </Navigator>
);

export default AppRoutes;

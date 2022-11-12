import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../pages/Home';
import { Task } from '../pages/Task';

const Stack = createStackNavigator();

const AppNavigation: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Task"
        component={Task}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export { AppNavigation };

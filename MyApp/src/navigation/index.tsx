import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../pages/Home';
import { Task } from '../pages/Task';
import { Task as TaskModel } from '../models';

const Stack = createStackNavigator();

export type ParamList = {
  Task: TaskModel | undefined;
  Home: undefined;
};

const AppNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
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

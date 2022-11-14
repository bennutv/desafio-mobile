import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../src/assets/theme';
import { Task } from '../../src/pages/Task';
import MockedNavigator from '../mocks/mocked-navigator';

const mockAddTaskMutation = jest.fn();
const mockUpdateMutation = jest.fn();
const mockedNavigateBack = jest.fn();

jest.mock('../../src/store/features/api/task.ts', () => {
  return {
    useAddTaskMutation: () => [
      mockAddTaskMutation,
      { isError: false, error: null, isSuccess: true },
    ],
    useUpdateTaskMutation: () => [
      mockUpdateMutation,
      { isError: false, error: null, isSuccess: true },
    ],
  };
});

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      goBack: mockedNavigateBack,
    }),
  };
});

describe('Task Page', () => {
  it('should save task on click button', () => {
    render(
      <ThemeProvider theme={theme}>
        <MockedNavigator component={Task} />
      </ThemeProvider>,
    );

    const title = screen.getByTestId('title');
    fireEvent.changeText(title, 'title');

    const description = screen.getByTestId('description');
    fireEvent.changeText(description, 'description');

    const button = screen.getByTestId('add-or-update-task-button');
    fireEvent.press(button);

    const args = {
      title: 'title',
      description: 'description',
    };

    expect(mockAddTaskMutation).toHaveBeenCalledWith(args);
  });

  it('should edit task on click button', () => {
    render(
      <ThemeProvider theme={theme}>
        <MockedNavigator
          component={Task}
          params={{
            title: 'title',
            description: 'description',
            id: 1,
            done: false,
          }}
        />
      </ThemeProvider>,
    );

    const title = screen.getByTestId('title');
    fireEvent.changeText(title, 'new title');

    const description = screen.getByTestId('description');
    fireEvent.changeText(description, 'new description');

    const button = screen.getByTestId('add-or-update-task-button');
    fireEvent.press(button);

    const args = {
      title: 'new title',
      description: 'new description',
      id: 1,
      done: false,
    };

    expect(mockUpdateMutation).toHaveBeenCalledWith(args);
  });
});

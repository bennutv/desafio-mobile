import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../src/assets/theme';
import { TaskListItem } from '../../src/components/TaskListItem';

const mockUpdateMutation = jest.fn();
const mockDeleteMutation = jest.fn();
const mockedNavigate = jest.fn();

jest.mock('../../src/store/features/api/task.ts', () => {
  return {
    useDeleteTaskMutation: () => [
      mockDeleteMutation,
      { isError: false, error: null },
    ],
    useUpdateTaskMutation: () => [
      mockUpdateMutation,
      { isError: false, error: null },
    ],
  };
});

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('TaskListItem Component', () => {
  it('should mark task as completed', () => {
    render(
      <ThemeProvider theme={theme}>
        <TaskListItem
          item={{
            id: 1,
            title: 'title',
            description: 'description',
            done: false,
          }}
        />
      </ThemeProvider>,
    );

    const button = screen.getByTestId('check-button');
    fireEvent.press(button);

    expect(mockUpdateMutation).toHaveBeenCalledWith({
      description: 'description',
      done: true,
      id: 1,
      title: 'title',
    });
  });

  it('should redirect user to Task page to edit task', () => {
    render(
      <ThemeProvider theme={theme}>
        <TaskListItem
          item={{
            id: 1,
            title: 'title',
            description: 'description',
            done: false,
          }}
        />
      </ThemeProvider>,
    );

    const button = screen.getByTestId('edit-button');
    fireEvent.press(button);

    expect(mockedNavigate).toHaveBeenCalledWith('Task', {
      id: 1,
      title: 'title',
      description: 'description',
      done: false,
    });
  });

  it('should delete task', () => {
    render(
      <ThemeProvider theme={theme}>
        <TaskListItem
          item={{
            id: 1,
            title: 'title',
            description: 'description',
            done: false,
          }}
        />
      </ThemeProvider>,
    );

    const button = screen.getByTestId('delete-button');
    fireEvent.press(button);

    expect(mockDeleteMutation).toHaveBeenCalledWith({ id: 1 });
  });
});

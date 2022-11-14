import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Home } from '../../src/pages/Home';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../src/assets/theme';

const mockUpdateMutation = jest.fn();
const mockDeleteMutation = jest.fn();

jest.mock('../../src/store/features/api/task.ts', () => {
  return {
    useTasksQuery: jest.fn().mockImplementation(() => ({
      data: { tasks: [{ id: 1, title: 'title', description: 'description' }] },
      isLoading: false,
      refetch: jest.fn(),
    })),
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

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('Home Page', () => {
  it('should render task list correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>,
    );

    screen.getByText('Lista de tarefas');

    const tasks = screen.getAllByTestId('task-item');

    expect(tasks).toHaveLength(1);
  });

  it('should redirect user to Task page', () => {
    render(
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>,
    );

    screen.getByText('Lista de tarefas');

    const button = screen.getByTestId('add-button');
    fireEvent.press(button);

    expect(mockedNavigate).toHaveBeenCalledWith('Task');
  });
});

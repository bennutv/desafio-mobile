import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '../../../models';

interface TasksResponse {
  tasks: Task[];
}

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9001/' }),
  tagTypes: ['Task'],
  endpoints: builder => ({
    tasks: builder.query<TasksResponse, Object>({
      query: () => 'tasks',
      transformResponse: (resp: TasksResponse) => {
        const { tasks } = resp;
        return {
          tasks: tasks.sort(
            (taskA: Task, taskB: Task) =>
              Number(taskA.done) - Number(taskB.done),
          ),
        };
      },
      providesTags: ['Task'],
    }),

    addTask: builder.mutation({
      query: task => ({
        url: '/task/create',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),

    updateTask: builder.mutation({
      query: task => ({
        url: `/task/update/${task.id}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),

    deleteTask: builder.mutation({
      query: task => ({
        url: `/task/delete/${task.id}`,
        method: 'DELETE',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;

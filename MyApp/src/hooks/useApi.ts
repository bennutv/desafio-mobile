import axios from 'axios';
import { useEffect, useState } from 'react';
import { Task } from '../models';

const base = 'http://localhost:9001';

const useApi = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios
      .get(`${base}/tasks`)
      .then(response =>
        setTasks(
          response.data.tasks.sort(
            (taskA: Task, taskB: Task) =>
              Number(taskA.done) - Number(taskB.done),
          ),
        ),
      )
      .catch(err => setError(err))
      .finally(() => setIsFetching(false));
  }, []);

  const addTask = (title: string, description: string) => {
    return axios.post(`${base}/task/create`, { title, description });
  };

  const editTask = ({ title, description, id, done }: Task) => {
    return axios.put(`${base}/task/update/${id}`, {
      title,
      description,
      id,
      done,
    });
  };

  const deleteTask = (id: number) => {
    return axios.delete(`${base}/task/delete/${id}`, { data: { id } });
  };

  return { isFetching, error, tasks, deleteTask, addTask, editTask };
};

export { useApi };

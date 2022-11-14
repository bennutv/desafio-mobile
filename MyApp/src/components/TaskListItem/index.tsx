import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Task } from '../../models';
import { Button } from '../Button';
import { theme } from '../../assets/theme';
import {
  ButtonContainer,
  CheckButton,
  Complete,
  TaskCheckContainer,
  TaskContainer,
  TextContainer,
} from './styles';
import { Text } from '../Text';
import { ParamList } from '../../navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '../../store/features/api/task';
import Trash from '../../assets/imgs/trash.svg';
import Edit from '../../assets/imgs/edit.svg';
import Toast from 'react-native-toast-message';

const TaskListItem = ({ item: task }: { item: Task }) => {
  const navigation = useNavigation<StackNavigationProp<ParamList>>();
  const [deleteTask, { isError: isDeleteError, error: deleteError }] =
    useDeleteTaskMutation();
  const [editTask, { isError: isEditError, error: editError }] =
    useUpdateTaskMutation();

  const handleDeleteTask = (id: number) => {
    deleteTask({ id: id });
  };

  const handleCompleteTask = (taskItem: Task) => {
    editTask({ ...taskItem, done: !taskItem.done });
  };

  useEffect(() => {
    if (isEditError) {
      Toast.show({
        type: 'error',
        text1: 'Falha ao marcar a task como concluída',
        text2: JSON.stringify(editError),
      });
    }
  }, [editError, isEditError]);

  useEffect(() => {
    if (isDeleteError) {
      Toast.show({
        type: 'error',
        text1: 'Falha ao deletar a task',
        text2: JSON.stringify(deleteError),
      });
    }
  }, [deleteError, isDeleteError]);

  return (
    <TaskContainer testID="task-item">
      <TaskCheckContainer>
        <CheckButton
          onPress={() => handleCompleteTask(task)}
          testID="check-button">
          {task.done === true && <Complete testID="check-button-completed" />}
        </CheckButton>
        <TextContainer>
          <Text weight="bold" taskCompleted={task.done === true}>
            {task.title}
          </Text>
          <Text taskCompleted={task.done === true}>{task.description}</Text>
        </TextContainer>
      </TaskCheckContainer>
      <ButtonContainer>
        <Button
          testID="edit-button"
          color={theme.colors.primary.default}
          onPress={() => navigation.navigate('Task', task)}>
          <Edit width={15} height={15} fill={theme.colors.primary.default} />
        </Button>
        <Button
          testID="delete-button"
          color={theme.colors.red}
          onPress={() => handleDeleteTask(task.id)}>
          <Trash width={15} height={15} fill={theme.colors.red} />
        </Button>
      </ButtonContainer>
    </TaskContainer>
  );
};

export { TaskListItem };

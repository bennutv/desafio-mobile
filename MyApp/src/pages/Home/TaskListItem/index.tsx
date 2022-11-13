import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Task } from '../../../models';
import { Button } from '../../../components/Button';
//TODO: gambiarra?
import { theme } from '../../../assets/theme';
import Trash from '../../../assets/imgs/trash.svg';
import Edit from '../../../assets/imgs/edit.svg';
import Toast from 'react-native-toast-message';
import {
  ButtonContainer,
  CheckButton,
  Complete,
  TaskCheckContainer,
  TaskContainer,
  TextContainer,
} from './styles';
import { Text } from '../../../components/Text';
import { ParamList } from '../../../navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '../../../store/features/api/task';

const TaskListItem = ({ item: task }: { item: Task }) => {
  const navigation = useNavigation<StackNavigationProp<ParamList>>();
  const [deleteTask, { isError: isDeleteError, error: deleteError }] =
    useDeleteTaskMutation();
  const [editTask, { isError: isEditError, error: editError }] =
    useUpdateTaskMutation();

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask({ id: id });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Falha ao excluir a task',
        text2: err.message,
      });
    }
  };

  const handleCompleteTask = async (taskItem: Task) => {
    try {
      await editTask({ ...taskItem, done: !taskItem.done });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Falha ao marcar a task como concluída',
        text2: err.message,
      });
    }
  };

  useEffect(() => {
    if (isEditError) {
      Toast.show({
        type: 'error',
        text1: 'Falha ao editar a task',
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
    <TaskContainer>
      <TaskCheckContainer>
        <CheckButton onPress={() => handleCompleteTask(task)}>
          {task.done === true && <Complete />}
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
          color={theme.colors.primary.default}
          onPress={() => navigation.navigate('Task', task)}>
          <Edit width={15} height={15} fill={theme.colors.primary.default} />
        </Button>
        <Button
          color={theme.colors.red}
          onPress={() => handleDeleteTask(task.id)}>
          <Trash width={15} height={15} fill={theme.colors.red} />
        </Button>
      </ButtonContainer>
    </TaskContainer>
  );
};

export { TaskListItem };

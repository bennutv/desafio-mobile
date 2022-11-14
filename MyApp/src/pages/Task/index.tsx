import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { PageContainer } from '../../components/PageContainer';
import { Text } from '../../components/Text';
import { Input, StyledButton } from './styles';
import { ParamList } from '../../navigation';
import {
  useAddTaskMutation,
  useUpdateTaskMutation,
} from '../../store/features/api/task';
import Toast from 'react-native-toast-message';

const editTaskTitle = 'Preencha os campos abaixo para editar a sua tarefa';
const addTaskTitle = 'Preencha os campos abaixo para adicionar uma nova tarefa';

const Task = () => {
  const navigation = useNavigation();
  const [
    addNewTask,
    { isError: isAddError, error: addError, isSuccess: isAddSuccess },
  ] = useAddTaskMutation();
  const [
    editTask,
    { isError: isEditError, error: editError, isSuccess: isEditSuccess },
  ] = useUpdateTaskMutation();
  const { params } = useRoute<RouteProp<ParamList, 'Task'>>();
  const { title, description, id, done } = params || {};
  const [newTitle, setNewTitle] = useState(title || '');
  const [newDescription, setNewDescription] = useState(description || '');

  const handleCreateTask = () => {
    addNewTask({ title: newTitle, description: newDescription });
  };

  const handleEditTask = async () => {
    if (!id) {
      Toast.show({
        type: 'error',
        text1: 'Falha ao editar a task',
        text2: 'Dados inconsistentes',
      });
      return;
    }
    editTask({
      title: newTitle,
      description: newDescription,
      id,
      done: done || false,
    });
  };

  const handleSubmitTask = params ? handleEditTask : handleCreateTask;

  const hasNoTask = !newTitle || !newDescription;

  useEffect(() => {
    if (isAddSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Task criada com sucesso',
      });
      navigation.goBack();
    }
  }, [isAddSuccess, navigation]);

  useEffect(() => {
    if (isEditSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Task editada com sucesso',
      });
      navigation.goBack();
    }
  }, [isEditSuccess, navigation]);

  useEffect(() => {
    if (isAddError) {
      Toast.show({
        type: 'error',
        text1: 'Falha ao criar a task',
        text2: JSON.stringify(addError),
      });
    }
  }, [addError, isAddError]);

  useEffect(() => {
    if (isEditError) {
      Toast.show({
        type: 'error',
        text1: 'Falha ao editar a task',
        text2: JSON.stringify(editError),
      });
    }
  }, [editError, isEditError]);

  return (
    <PageContainer
      taskPage
      pageTitle={params ? 'Editar tarefa' : 'Nova tarefa'}
      pageSubtitle={params ? editTaskTitle : addTaskTitle}>
      <>
        <Input
          testID="title"
          placeholder="Título"
          value={newTitle || title}
          onChangeText={setNewTitle}
        />
        <Input
          testID="description"
          placeholder="Descrição"
          value={newDescription || description}
          onChangeText={setNewDescription}
        />
        <StyledButton
          testID="add-or-update-task-button"
          disabled={hasNoTask}
          onPress={handleSubmitTask}>
          <Text color="white" weight="bold">
            {params ? 'Salvar' : 'Adicionar tarefa'}
          </Text>
        </StyledButton>
      </>
    </PageContainer>
  );
};

export { Task };

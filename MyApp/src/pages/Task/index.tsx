import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { PageContainer } from '../../components/PageContainer';
import { Text } from '../../components/Text';
import { useApi } from '../../hooks/useApi';
import { Input, StyledButton } from './styles';
import Toast from 'react-native-toast-message';
import { ParamList } from '../../navigation';

const editTaskTitle = 'Preencha os campos abaixo para editar a sua tarefa';
const addTaskTitle = 'Preencha os campos abaixo para adicionar uma nova tarefa';

const Task = () => {
  const navigation = useNavigation();
  const { addTask, editTask } = useApi();
  const { params } = useRoute<RouteProp<ParamList, 'Task'>>();
  const { title, description, id, done } = params || {};
  const [newTitle, setNewTitle] = useState(title || '');
  const [newDescription, setNewDescription] = useState(description || '');

  const handleCreateTask = async () => {
    try {
      await addTask(newTitle, newDescription);
      Toast.show({
        type: 'success',
        text1: 'Task criada com sucesso',
      });
      navigation.goBack();
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Falha ao criar a task',
        text2: err.message,
      });
    }
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
    try {
      await editTask({
        title: newTitle,
        description: newDescription,
        id,
        done: done || false,
      });
      Toast.show({
        type: 'success',
        text1: 'Task editada com sucesso',
      });
      navigation.goBack();
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Falha ao editar a task',
        text2: err.message,
      });
    }
  };

  const handleSubmitTask = params ? handleEditTask : handleCreateTask;

  const hasNoTask = !newTitle || !newDescription;

  return (
    <PageContainer
      taskPage
      pageTitle={params ? 'Editar tarefa' : 'Nova Tarefa'}
      pageSubtitle={params ? editTaskTitle : addTaskTitle}>
      <>
        <Input
          placeholder="Título"
          value={newTitle || title}
          onChangeText={setNewTitle}
        />
        <Input
          placeholder="Descrição"
          value={newDescription || description}
          onChangeText={setNewDescription}
        />
        <StyledButton disabled={hasNoTask} onPress={handleSubmitTask}>
          <Text color="white" weight="bold">
            {params ? 'Salvar' : 'Add task'}
          </Text>
        </StyledButton>
      </>
    </PageContainer>
  );
};

export { Task };

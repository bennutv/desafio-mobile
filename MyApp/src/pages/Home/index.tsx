import React from 'react';
import { ScrollView, View } from 'react-native';
import { useApi } from '../../hooks/useApi';
import { useNavigation } from '@react-navigation/native';
import { Task } from '../../models';
import { Button } from '../../components/Button';
import { PageContainer } from '../../components/PageContainer';
//TODO: gambiarra?
import { theme } from '../../assets/theme';
import Trash from '../../assets/imgs/trash.svg';
import Edit from '../../assets/imgs/edit.svg';
import Plus from '../../assets/imgs/plus.svg';
import Toast from 'react-native-toast-message';
import {
  ButtonContainer,
  CheckButton,
  Complete,
  Divider,
  StyledButton,
  TaskCheckContainer,
  TaskContainer,
  TextContainer,
} from './styles';
import { Text } from '../../components/Text';

const Home = () => {
  const { tasks, deleteTask, editTask } = useApi();
  const navigation = useNavigation<any>();

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Falha ao excluir a task',
        text2: err.message,
      });
    }
  };

  const handleCompleteTask = (task: Task) => {
    editTask({ ...task, done: !task.done });
  };

  const renderTaskList = () =>
    tasks?.map(task => {
      return (
        <View key={task.id}>
          <TaskContainer>
            <TaskCheckContainer>
              <CheckButton onPress={() => handleCompleteTask(task)}>
                {task.done === true && <Complete />}
              </CheckButton>
              <TextContainer>
                <Text weight="bold" taskCompleted={task.done === true}>
                  {task.title}
                </Text>
                <Text taskCompleted={task.done === true}>
                  {task.description}
                </Text>
              </TextContainer>
            </TaskCheckContainer>
            <ButtonContainer>
              <Button
                color={theme.colors.primary}
                onPress={() => navigation.navigate('Task', task)}>
                <Edit width={15} height={15} fill={theme.colors.primary} />
              </Button>
              <Button
                color={theme.colors.red}
                onPress={() => handleDeleteTask(task.id)}>
                <Trash width={15} height={15} fill={theme.colors.red} />
              </Button>
            </ButtonContainer>
          </TaskContainer>
          <Divider />
        </View>
      );
    });

  return (
    <PageContainer
      pageTitle="Lista de tarefas"
      pageSubtitle="Aqui está a sua lista de tarefas!">
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderTaskList()}
      </ScrollView>
      <StyledButton onPress={() => navigation.navigate('Task')}>
        <Plus width={35} height={35} fill="white" />
      </StyledButton>
    </PageContainer>
  );
};

export { Home };

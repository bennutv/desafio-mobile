import React from 'react';
import { FlatList } from 'react-native';
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
import { ParamList } from '../../navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  useDeleteTaskMutation,
  useTasksQuery,
  useUpdateTaskMutation,
} from '../../store/features/api/task';

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<ParamList>>();
  const [deleteTask] = useDeleteTaskMutation();
  const [editTask] = useUpdateTaskMutation();
  const { data, isLoading, refetch } = useTasksQuery('Task');

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

  const handleCompleteTask = async (task: Task) => {
    try {
      await editTask({ ...task, done: !task.done });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Falha ao marcar a task como concluída',
        text2: err.message,
      });
    }
  };

  const renderSingleTask = ({ item: task }: { item: Task }) => (
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

  return (
    <PageContainer
      pageTitle="Lista de tarefas"
      pageSubtitle="Aqui está a sua lista de tarefas!">
      <>
        <FlatList
          data={data ? data.tasks : []}
          renderItem={renderSingleTask}
          keyExtractor={task => String(task.id)}
          refreshing={isLoading}
          onRefresh={refetch}
          ItemSeparatorComponent={() => <Divider />}
        />
        <StyledButton onPress={() => navigation.navigate('Task')}>
          <Plus width={35} height={35} fill="white" />
        </StyledButton>
      </>
    </PageContainer>
  );
};

export { Home };

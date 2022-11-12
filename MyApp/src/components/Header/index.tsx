import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, StyledText } from './style';
import { theme } from '../../assets/theme';
import ArrowLeft from '../../assets/imgs/arrow-left.svg';

const Header = () => {
  const navigate = useNavigation();
  return (
    <Container onPress={() => navigate.goBack()}>
      <ArrowLeft width={20} height={20} fill={theme.colors.primary.default} />
      <StyledText>Voltar para lista de tarefas</StyledText>
    </Container>
  );
};

export { Header };

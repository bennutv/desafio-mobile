import styled from 'styled-components/native';
import { Text } from '../Text';

export const Container = styled.View`
  flex: 1;
  padding: 60px 24px 80px;
`;

export const Title = styled(Text).attrs(() => {
  return {
    size: 30,
  };
})``;

export const Subtitle = styled(Text).attrs(({ theme }) => {
  return {
    size: 16,
    color: theme.colors.gray['04'],
  };
})`
  margin: 5px 0 30px;
`;

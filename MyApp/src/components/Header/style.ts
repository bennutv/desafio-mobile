import styled from 'styled-components/native';
import { Text } from '../Text';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

export const StyledText = styled(Text).attrs(({ theme }) => {
  return {
    color: theme.colors.gray['04'],
  };
})`
  margin-left: 10px;
`;

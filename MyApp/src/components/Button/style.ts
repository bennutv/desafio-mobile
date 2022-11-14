import styled from 'styled-components/native';

interface ContainerProps {
  color?: string;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  border: 1px solid
    ${({ color, theme }) => color || theme.colors.primary.default};
  padding: 10px;
  border-radius: 30px;
  margin-left: 10px;
`;

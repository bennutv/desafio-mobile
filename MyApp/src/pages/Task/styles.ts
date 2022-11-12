import styled from 'styled-components/native';

interface ButtonProps {
  disabled?: boolean;
}

export const Input = styled.TextInput`
  border: 1px solid ${({ theme }) => theme.colors.primary.default};
  padding: 12px 20px;
  border-radius: 30px;
  margin-bottom: 16px;
`;

export const StyledButton = styled.TouchableOpacity<ButtonProps>`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray['04'] : theme.colors.primary.default};
  align-self: flex-end;
  padding: 10px 30px;
  border-radius: 30px;
`;

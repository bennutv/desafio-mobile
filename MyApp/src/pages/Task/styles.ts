import styled from 'styled-components/native';
import { Button } from '../../components/Button';

export const Input = styled.TextInput`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 12px 20px;
  border-radius: 30px;
  margin-bottom: 16px;
`;

export const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  align-self: flex-end;
  padding: 10px 30px;
`;

import styled from 'styled-components/native';
import { Button } from '../../components/Button';

export const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary.default};
  box-shadow: 1px 1px 10px ${({ theme }) => theme.colors.primary.default};
  position: absolute;
  bottom: 60px;
  right: 50%;
`;

export const Divider = styled.View`
  border: 0.4px solid ${({ theme }) => theme.colors.gray['05']};
  margin: 20px 0;
`;

import styled from 'styled-components/native';

export const TaskContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TaskCheckContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CheckButton = styled.TouchableOpacity`
  border: 1px solid ${({ theme }) => theme.colors.black};
  width: 25px;
  height: 25px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

export const Complete = styled.View`
  background-color: ${({ theme }) => theme.colors.black};
  padding: 8px;
  border-radius: 30px;
`;

export const TextContainer = styled.View`
  max-width: 200px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
`;

export const Divider = styled.View`
  border: 0.4px solid ${({ theme }) => theme.colors.gray['05']};
  margin: 20px 0;
`;

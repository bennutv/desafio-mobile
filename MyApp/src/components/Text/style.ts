import styled from 'styled-components/native';

interface TextProps {
  color?: string;
  weight?: string;
  size?: number;
  taskCompleted?: boolean;
}

export const StyledText = styled.Text<TextProps>`
  color: ${({ color, theme }) => color || theme.colors.black};
  font-size: ${({ size }) => `${size}px` || '15px'};
  font-weight: ${({ weight }) => weight || 'normal'};
  text-decoration: ${({ taskCompleted }) => taskCompleted && 'line-through'};
`;

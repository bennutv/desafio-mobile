import React from 'react';

import { StyledText } from './style';

interface TextProps {
  color?: string;
  weight?: string;
  size?: number;
  taskCompleted?: boolean;
  props?: any;
  children: any;
}

const Text = ({
  children,
  color,
  weight,
  size = 16,
  taskCompleted = false,
  ...props
}: TextProps) => {
  return (
    <StyledText
      color={color}
      size={size}
      weight={weight}
      taskCompleted={taskCompleted}
      {...props}>
      {children}
    </StyledText>
  );
};

export { Text };

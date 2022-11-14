import React, { ReactElement } from 'react';
import { Container } from './style';

interface ButtonProps {
  children: ReactElement;
  color?: string;
  onPress: () => void;
  testID?: string;
}

const Button = ({ children, color, onPress, ...props }: ButtonProps) => {
  return (
    <Container color={color} onPress={onPress} {...props}>
      {children}
    </Container>
  );
};

export { Button };

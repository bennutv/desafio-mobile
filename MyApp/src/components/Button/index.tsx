import React from 'react';
import { Container } from './style';

interface ButtonProps {
  children: any;
  color?: string;
  onPress: () => void;
  props?: any;
}

const Button = ({ children, color, onPress, ...props }: ButtonProps) => {
  return (
    <Container color={color} onPress={onPress} {...props}>
      {children}
    </Container>
  );
};

export { Button };

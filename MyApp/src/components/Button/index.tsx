import React from 'react';

import { Container } from './style';

const Button = ({ children, color, onPress, ...props }: any) => {
  return (
    <Container color={color} onPress={onPress} {...props}>
      {children}
    </Container>
  );
};

export { Button };

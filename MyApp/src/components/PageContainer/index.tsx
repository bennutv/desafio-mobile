import React from 'react';
import { Header } from '../Header';

import { Container, Subtitle, Title } from './style';

const PageContainer = ({
  children,
  pageTitle,
  pageSubtitle,
  taskPage,
}: any) => {
  return (
    <Container>
      {taskPage && <Header />}
      <Title>{pageTitle}</Title>
      <Subtitle>{pageSubtitle}</Subtitle>
      {children}
    </Container>
  );
};

export { PageContainer };

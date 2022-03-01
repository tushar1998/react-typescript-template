import React from 'react';
import { Container, Header, Image, Link } from 'styles/App.style';
import logo from 'assets/png/logo512.png';
import GlobalStyle from 'styles/globalStyles';

export default function App() {
  return (
    <div>
      <GlobalStyle />
      <Container>
        <Header>
          <h2>React TypeScript Starter Template</h2>
          <Image src={logo} alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Link href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </Link>
        </Header>
      </Container>
    </div>
  );
}

import React, { FC, useState } from 'react';
import Logo from 'assets/svgs/logo.svg';
import logo from 'assets/png/logo512.png';
import { Container } from './Counter.style';

export interface CounterProps {
  height?: number;
}

const Counter: FC<CounterProps> = ({ ...rest }) => {
  const [count, setCount] = useState(0);
  return (
    <Container {...rest} data-testid="component">
      <p data-testid="count">Count : {count}</p>
      <button type="button" onClick={() => setCount(count + 1)} data-testid="button">
        Click Me!
      </button>
      <Logo />
      <img src={logo} alt="Logo" srcSet="" />
    </Container>
  );
};

export default Counter;

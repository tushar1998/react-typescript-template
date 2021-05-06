import { FC } from 'react';
import GlobalStyle from './styles/globalStyles';
import Counter from './components/Counter';

const App: FC = () => (
  <div>
    <GlobalStyle />
    <h1>React TypeScript Starter Template </h1>
    <Counter />
  </div>
);

export default App;

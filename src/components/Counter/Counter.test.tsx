import Counter from 'components/Counter';
import React from 'react';
import { render, cleanup, screen, fireEvent } from 'utils/test-utils';

afterEach(() => cleanup());

describe('Testing the component', () => {
  it('Counter', () => {
    render(<Counter />);
    expect(screen.getByTestId('count')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('button'));
    expect(screen.getByTestId('count')).toHaveTextContent('Count : 1');
  });
});

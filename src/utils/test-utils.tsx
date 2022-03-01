import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';

function AllTheProviders({ children }: { children: ReactElement }) {
  return <div>{children}</div>;
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };

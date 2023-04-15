import { RenderOptions, RenderResult, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
declare const google: typeof globalThis.google;

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  transform?: Record<string, string>;
};

interface CustomRender {
  (ui: React.ReactElement, options?: CustomRenderOptions): RenderResult;
}

const renderWithContext: CustomRender = (ui, options) =>
  render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>,
    options
  );

export * from '@testing-library/react';
export { renderWithContext as render };

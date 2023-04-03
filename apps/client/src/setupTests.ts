// This file is used to set up any necessary configurations for the tests, such as importing the jest-dom library to enhance the expect function.
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
// import { server } from './mocks/server';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveCustomAttribute(attr: string, value?: string): R;
      // Add additional custom matchers here as needed
      toHaveTextContent(expected: string | RegExp): R;
    }
  }
}

// Setup mock service worker
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// This file is used to set up any necessary configurations for the tests, such as importing the jest-dom library to enhance the expect function.
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { server } from './mocks/server';

// src/setupTests.js
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

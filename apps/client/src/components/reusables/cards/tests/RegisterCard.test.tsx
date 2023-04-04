import { render, screen } from '../../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { RegisterCard } from '../RegisterCard';
import { mockGoogle } from './mockGoogle';

// Mock the Google API
global.google = mockGoogle;
jest.mock('./mockGoogle', () => ({
  accounts: {
    id: {
      initialize: jest.fn(),
      renderButton: jest.fn(),
    },
  },
}));
// jest.mock('./mockGoogle', () => ({
//   __esModule: true,
//   default: {
//     accounts: {
//       id: {
//         initialize: jest.fn(),
//         prompt: jest.fn(),
//         getAuthResponse: jest.fn(),
//         renderButton: jest.fn(),
//         isSignedIn: {
//           get: jest.fn(),
//           listen: jest.fn(),
//         },
//         signIn: jest.fn(),
//         signOut: jest.fn(),
//         disableAutoSelect: jest.fn(),
//         storeCredential: jest.fn(),
//         cancel: jest.fn(),
//         revoke: jest.fn(),
//       },
//       oauth2: {
//         initCodeClient: jest.fn(),
//         initTokenClient: jest.fn(),
//         hasGrantedAllScopes: jest.fn(),
//         hasGrantedAnyScope: jest.fn(),
//         revoke: jest.fn(),
//       },
//     },
//   },
// }));

describe('RegisterCard', () => {
  test('should initialize Google API and render button', () => {
    render(<RegisterCard />);
    expect(mockGoogle.accounts.id.initialize).toHaveBeenCalledWith({
      client_id:
        '60536065681-el72it8okrce4mkj2ldg7la7aaqdvcgh.apps.googleusercontent.com',
      callback: expect.any(Function),
    });
    expect(mockGoogle.accounts.id.renderButton).toHaveBeenCalled();
  });

  test('initial conditions', () => {
    render(<RegisterCard />);
    // test heading
    const testHeading = screen.getByTestId('register-card-heading');
    expect(testHeading).toHaveTextContent('Register');
    // test button
    const testButton = screen.getByRole('button', {
      name: /Create Account/i,
    });
    expect(testButton).not.toBeDisabled();
  });
});

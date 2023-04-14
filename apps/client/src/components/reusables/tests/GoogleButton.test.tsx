import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
// import GoogleButton from '../GoogleButton';
// import { mockGoogle } from './mockGoogle';

// // Mock the Google API
// global.google = mockGoogle;

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

// describe('MyComponent', () => {
//   test('should initialize Google API and render button', () => {
//     render(<GoogleButton />);
//     expect(mockGoogle.accounts.id.initialize).toHaveBeenCalledWith({
//       client_id: 'your_client_id',
//       callback: expect.any(Function),
//     });
//     expect(mockGoogle.accounts.id.renderButton).toHaveBeenCalled();
//   });
// });

it('testing', () => {});

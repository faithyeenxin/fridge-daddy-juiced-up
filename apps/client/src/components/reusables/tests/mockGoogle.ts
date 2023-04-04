export const mockGoogle = {
  accounts: {
    id: {
      initialize: jest.fn(),
      prompt: jest.fn(),
      getAuthResponse: jest.fn(),
      renderButton: jest.fn(),
      isSignedIn: {
        get: jest.fn(),
        listen: jest.fn(),
      },
      signIn: jest.fn(),
      signOut: jest.fn(),
      disableAutoSelect: jest.fn(),
      storeCredential: jest.fn(),
      cancel: jest.fn(),
      revoke: jest.fn(),
    },
    oauth2: {
      initCodeClient: jest.fn(),
      initTokenClient: jest.fn(),
      hasGrantedAllScopes: jest.fn(),
      hasGrantedAnyScope: jest.fn(),
      revoke: jest.fn(),
    },
  },
};

global.google = mockGoogle;

import {
  render,
  screen,
  waitFor,
} from '../../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { RegisterCard } from '../RegisterCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoginCard from '../LoginCard';

// const axiosPostSpy = jest.spyOn(axios, 'post');
const mockNavigate = jest.fn();
// const mockAxios = axios as jest.Mocked<typeof axios>;

// jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// I will ignore the google login button as I do not know how to test it yet!
jest.mock('../../GoogleButton.tsx', () => {
  return () => <div data-testid='mock-google-button' />;
});

describe('should have initial conditions', () => {
  it('should have correct heading and button', () => {
    render(<LoginCard />);
    const loginHeading = screen.getByTestId('login-card-heading');
    expect(loginHeading).toHaveTextContent('Sign In to FridgeDaddy!');
    // test button
    const submitButton = screen.getByRole('button', {
      name: /Let's Go!/i,
    });
    expect(submitButton).not.toBeDisabled();
  });
});

describe('trial account and contact dev section functionality', () => {
  const user = userEvent.setup();

  it('should have trial account container with working anchor tag that populates trial data into inputs', async () => {
    render(<LoginCard />);
    const trialAccountContainer = screen.getByTestId('trial-account-container');
    expect(trialAccountContainer).toHaveTextContent(
      'Try us out using our Trial Account'
    );

    const trialAccountAnchorTag = screen.getByTestId('trial-anchor-tag');
    await user.click(trialAccountAnchorTag);
    const emailFeildItem = screen.getByTestId('login-card-field-email');
    expect(emailFeildItem).toHaveValue('testUser@hotmail.com');
    const passwordFeildItem = screen.getByTestId('login-card-field-password');
    expect(passwordFeildItem).toHaveValue('Password123!');
  });

  it('should have contact developer container with redirect', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<LoginCard />);
    const contactDeveloperContainer = screen.getByTestId(
      'contact-developer-container'
    );
    expect(contactDeveloperContainer).toHaveTextContent(
      'Having issues logging in? Contact our developers here!'
    );
    const contactDeveloperAnchorTag = screen.getByTestId(
      'contact-dev-anchor-tag'
    ) as HTMLAnchorElement;
    await user.click(contactDeveloperAnchorTag);
    expect(contactDeveloperAnchorTag.href).toMatch(/^mailto:/);

    // Check that the correct email address is pre-populated
    expect(contactDeveloperAnchorTag.href).toMatch(/faith\.ye@hotmail\.com/);

    // Check that the subject and body are pre-populated
    const subject = encodeURIComponent(
      'Hi there! I am having issues regarding FridgeDaddy...'
    );
    expect(contactDeveloperAnchorTag.href).toMatch(
      new RegExp(`subject=${subject}`)
    );
    errorSpy.mockRestore();
  });
});

describe('login card functionality', () => {
  it('should show error when no email and password on submit', async () => {
    const user = userEvent.setup();
    render(<LoginCard />);

    const emailFeildItem = screen.getByTestId('login-card-field-email');
    await user.clear(emailFeildItem);

    const passwordFeildItem = screen.getByTestId('login-card-field-password');
    await user.clear(passwordFeildItem);

    const createAccountButton = screen.getByTestId('login-account-button');
    await user.click(createAccountButton);

    await waitFor(() => {
      expect(
        screen.getByTestId('login-card-field-error-email')
      ).toBeInTheDocument();
      expect(
        screen.getByTestId('login-card-field-error-password')
      ).toBeInTheDocument();
    });

    expect(
      screen.getByTestId('login-card-field-error-email')
    ).toHaveTextContent('Email is required');
    expect(
      screen.getByTestId('login-card-field-error-password')
    ).toHaveTextContent('Password is required');
  });

  it('should not show error on submission with correct data', async () => {
    render(<LoginCard />);

    fillUpAndSubmitForm({
      email: 'validUser@hotmail.com',
      password: 'Password123!',
    });

    await waitFor(() => {
      expect(
        screen.queryByText('Invalid email address')
      ).not.toBeInTheDocument();
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
      expect(
        screen.queryByText('Password is required')
      ).not.toBeInTheDocument();
    });
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/home'));
  });

  it('should throw error with invalid email', async () => {
    const user = userEvent.setup();
    render(<LoginCard />);

    const emailFeildItem = screen.getByTestId('login-card-field-email');
    await user.clear(emailFeildItem);
    await user.type(emailFeildItem, 'invalid-email@hotmail');
    await user.tab();

    await waitFor(() => {
      expect(screen.queryByText('Invalid email address')).toBeInTheDocument();
    });
  });

  it('should throw error with invalid password', async () => {
    const user = userEvent.setup();
    render(<LoginCard />);

    const passwordFeildItem = screen.getByTestId('login-card-field-password');
    await user.clear(passwordFeildItem);
    await user.type(passwordFeildItem, 'password123!');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        )
      ).toBeInTheDocument();
    });
  });
});

interface IFormData {
  email: string;
  password: string;
}

const fillUpAndSubmitForm = async ({ email, password }: IFormData) => {
  const user = userEvent.setup();
  const emailFeildItem = screen.getByTestId('login-card-field-email');
  await user.clear(emailFeildItem);
  await user.type(emailFeildItem, email);

  const passwordFeildItem = screen.getByTestId('login-card-field-password');
  await user.clear(passwordFeildItem);
  await user.type(passwordFeildItem, password);

  const createAccountButton = screen.getByTestId('login-account-button');
  await user.click(createAccountButton);
};

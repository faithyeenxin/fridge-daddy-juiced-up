import { render, screen } from '../../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { RegisterCard } from '../RegisterCard';

// test('initial conditions', () => {
//   render(<RegisterCard />);
//   // test heading
//   const testHeading = screen.getByTestId('register-card-heading');
//   expect(testHeading).toHaveTextContent('Register');
//   // test button
//   const testButton = screen.getByRole('button', {
//     name: /Create Account/i,
//   });
//   expect(testButton).not.toBeDisabled();
// });

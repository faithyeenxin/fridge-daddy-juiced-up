import { render, screen } from '../../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Testing from '../../../../pages/Testing';
test('initial conditions', () => {
  render(<Testing />);
  // test heading
  const testHeading = screen.getByTestId('testing-page-heading');
  expect(testHeading).toHaveTextContent('This is my test page.');
  // test button
  const testButton = screen.getByRole('button', {
    name: /Random Test Button/i,
  });
  expect(testButton).not.toBeDisabled();
});

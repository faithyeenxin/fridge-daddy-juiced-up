import { render, screen } from '../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Testing from '../Testing';
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

test('test button functionality', async () => {
  // mock the alert function
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  render(<Testing />);

  const user = userEvent.setup();
  const testButton = screen.getByRole('button', {
    name: /Random Test Button/i,
  });

  // simulate a click on the button that should trigger the alert
  await user.click(testButton);

  // check if the alert has been called with the expected message
  expect(alertMock).toHaveBeenCalledWith('test button has been clicked');

  // clean up the mock
  alertMock.mockRestore();
});

/*
--> MORE ON MOCKING

Mocking is a technique used in testing to replace a real object or function with a test double that mimics the behavior of the original object or function. 
This allows developers to isolate the code they are testing from any external dependencies that it may rely on, such as network requests, databases, or external services.

In the case of mocking the alert function using jest.spyOn and mockImplementation, 
we are essentially replacing the real alert function with a test double that does not actually display an alert dialog, 
but instead logs the alert message to the console or does nothing. 
This allows us to test that the alert function is being called correctly in our code without actually displaying an alert dialog during the test.
*/

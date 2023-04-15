import { render, screen } from '../../../test-utils/testing-library-utils';
import JoinUsSection from '../JoinUsSection';

jest.mock('../../reusables/GoogleButton', () => {
  return () => <div data-testid='mock-google-button' />;
});

describe('initial conditions', () => {
  it('should have text contents', () => {
    render(<JoinUsSection />);
    const contentContainer = screen.getAllByTestId('content-container-items');
    const contentContainerArray = contentContainer.map(
      (item) => item.textContent
    );
    expect(contentContainerArray).toEqual([
      "It's terrible isn't it?",
      "Let's all join FridgeDaddy in the fight against food wastage!",
    ]);
  });
});

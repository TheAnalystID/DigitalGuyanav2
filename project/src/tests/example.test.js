import { render, screen } from '@testing-library/dom';

describe('Example Test', () => {
  test('renders content correctly', () => {
    document.body.innerHTML = `
      <div>
        <h1>Hello World</h1>
      </div>
    `;
    
    const heading = screen.getByText('Hello World');
    expect(heading).toBeInTheDocument();
  });
}); 
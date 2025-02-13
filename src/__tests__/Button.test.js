import React from 'react';
import Button from '../components/Button';
import { render, screen, within, waitFor, fireEvent } from '@testing-library/react';

describe('<Button /> component', () => {
  beforeEach(async () => {
    render(<Button event={{ description: 'Test event description.' }} />);
    await waitFor(() => screen.getByText('show details')); // Wait for the "Show Details" button to appear
  });

  test('renders Button', () => {
    const button = screen.queryByTestId('Details');
    expect(button).toBeInTheDocument();
  });

  test('button toggles event details visibility and changes text', async () => {
    const eventDescription = 'Test event description.';

    // Initially, the event description should not be visible
    expect(screen.queryByText(eventDescription)).toBeNull();

    // Button should display "Show Details"
    const button = await screen.findByText('show details'); // Use findByText for more flexibility
    expect(button).toBeInTheDocument();

    // Click the button to show the details
    fireEvent.click(button);

    // After the click, the event description should appear
    expect(screen.getByText(eventDescription)).toBeInTheDocument();

    // The button text should now be "Hide Details"
    expect(screen.getByText('hide details')).toBeInTheDocument();

    // Click the button to hide the details again
    fireEvent.click(screen.getByText('hide details'));

    // After clicking, the event description should be hidden again
    expect(screen.queryByText(eventDescription)).toBeNull();

    // The button text should revert back to "Show Details"
    expect(screen.getByText('show details')).toBeInTheDocument();
  });
});
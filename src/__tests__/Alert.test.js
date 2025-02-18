import { render, screen } from '@testing-library/react';
import { InfoAlert } from '../components/Alert.jsx';
import { ErrorAlert } from '../components/Alert';
import Alert from '../components/Alert';
import React from 'react';
test('renders InfoAlert with the correct styles', () => {
  render(<InfoAlert text="This is an info alert" />);
  
  const alertMessage = screen.getByText(/This is an info alert/i);
  
  // Check if the text is rendered
  expect(alertMessage).toBeInTheDocument();
  
  // Check if the styles are applied correctly (based on color and background)
  expect(alertMessage).toHaveStyle('color: rgb(0, 0, 255)'); // blue
  expect(alertMessage).toHaveStyle('background-color: rgb(220, 220, 255)'); // light blue
});

test('renders ErrorAlert with the correct styles', () => {
    render(<ErrorAlert text="This is an error alert" />);
    
    const alertMessage = screen.getByText(/This is an error alert/i);
    
    // Check if the text is rendered
    expect(alertMessage).toBeInTheDocument();
    
    // Check if the styles are applied correctly (based on color and background)
    expect(alertMessage).toHaveStyle('color: rgb(255, 0, 0)'); // red
    expect(alertMessage).toHaveStyle('background-color: rgb(255, 220, 220)'); // light red
});

test('InfoAlert has correct styles', () => {
    render(<InfoAlert text="This is an info alert" />);
    
    const alertMessage = screen.getByText(/This is an info alert/i);
    
    expect(alertMessage).toHaveStyle('color: rgb(0, 0, 255)');
    expect(alertMessage).toHaveStyle('background-color: rgb(220, 220, 255)');
  });

test('ErrorAlert has correct styles', () => {
    render(<ErrorAlert text="This is an error alert" />);
    
    const alertMessage = screen.getByText(/This is an error alert/i);
    
    expect(alertMessage).toHaveStyle('color: rgb(255, 0, 0)');
    expect(alertMessage).toHaveStyle('background-color: rgb(255, 220, 220)');
  });
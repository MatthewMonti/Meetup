import { render, screen } from '@testing-library/react';
import { CityAlert } from '../components/Alert.jsx';
import { NumberAlert } from '../components/Alert';
import {EventAlert} from '../components/Alert';
import React from 'react';

test('renders CityAlert with the correct styles', () => {
  render(<CityAlert text="This is an info alert" />);
  
  const alertMessage = screen.getByText(/This is an info alert/i);
  
  // Check if the text is rendered
  expect(alertMessage).toBeInTheDocument();
  
  // Check if the styles are applied correctly (based on color and background)
  expect(alertMessage).toHaveStyle('color: rgb(30, 0, 249)'); // blue
  expect(alertMessage).toHaveStyle('background-color: rgb(216, 214, 253)'); // light blue
});

test('renders NumberAlert with the correct styles', () => {
    render(<NumberAlert text="This is an error alert" />);
    
    const alertMessage = screen.getByText(/This is an error alert/i);
    
    // Check if the text is rendered
    expect(alertMessage).toBeInTheDocument();
    
    // Check if the styles are applied correctly (based on color and background)
    expect(alertMessage).toHaveStyle('color: rgb(255, 0, 0)'); // red
    expect(alertMessage).toHaveStyle('background-color: rgb(255, 220, 220)'); // light red
});

test('renders EventAlert with the correct styles', () => {
  render(<EventAlert text="This is an error alert" />);
  
  const alertMessage = screen.getByText(/This is an error alert/i);
  
  // Check if the text is rendered
  expect(alertMessage).toBeInTheDocument();
  
  // Check if the styles are applied correctly (based on color and background)
  expect(alertMessage).toHaveStyle('color: rgb(255, 112, 29)'); // red
  expect(alertMessage).toHaveStyle('background-color: rgb(255, 228, 145)'); // light red
});

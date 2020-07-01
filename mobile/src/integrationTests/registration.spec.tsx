import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../components/App';

import '@testing-library/jest-native/extend-expect';

describe('registration', () => {
  it('allows a player to register for a quiz with the provided id', () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    fireEvent.change(getByPlaceholderText('Name'), 'Ed');
    fireEvent.change(getByPlaceholderText('Quiz ID'), 'A_RANDOM_ID');
    fireEvent.press(getByText('Join quiz'));

    expect(getByText('Please wait at the bar for the quiz to begin')).toBeTruthy();
  });
});

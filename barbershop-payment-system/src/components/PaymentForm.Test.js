import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PaymentForm from './PaymentForm';

test('renders payment form with card element and pay button', () => {
  const { getByLabelText, getByRole } = render(<PaymentForm />);
  
  // Assert that the card element and pay button are rendered
  const cardElement = getByLabelText('Card number');
  expect(cardElement).toBeInTheDocument();
  
  const payButton = getByRole('button', { name: 'Pay' });
  expect(payButton).toBeInTheDocument();
});

test('submits payment information when pay button is clicked', async () => {
  const { getByLabelText, getByRole } = render(<PaymentForm amount={10} />);
  
  // Fill in the card element
  const cardElement = getByLabelText('Card number');
  fireEvent.change(cardElement, { target: { value: '4242424242424242' } });
  
  // Click the pay button
  const payButton = getByRole('button', { name: 'Pay' });
  fireEvent.click(payButton);
  
  // Wait for the success message to appear
  const successMessage = await waitFor(() => getByText('You just paid:'));
  expect(successMessage).toBeInTheDocument();
});
